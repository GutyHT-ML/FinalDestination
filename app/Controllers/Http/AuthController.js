'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Mail = use('Mail')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Env = use('Env')
const Hash = use('Hash')
const Ws = use('Ws')

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {
  async checkRefresh({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    if (refreshToken == null || refreshToken === '') {
      return response.badRequest({
        msg: 'Sesion expirada',
        data: null
      })
    }
    const token = await auth.newRefreshToken().generateForRefreshToken(refreshToken)
    return response.ok({
      msg: 'Ok',
      data: token
    })
  }

  async webLogIn ({ request, response, auth }) {
    const requestData = request.only(User.loginData)
    const user = await User.findByOrFail('email', requestData.email)
    if (user.role_id === Role.Virgin) {
      return this.virginLogin(requestData, auth, response, user)
    }
    return this.cuckLogin(requestData, auth, response, user)
  }

  async appLogIn ({ request, response, auth }) {
    const requestData = request.only(User.loginData)
    const user = await User.findByOrFail('email', requestData.email)
    if (user.role_id === Role.Chad) {
      const accessToken = await auth.withRefreshToken().attempt(user.email, requestData.password, true)
      const authData = {
        user, accessToken
      }
      return response.ok({
        msg: 'Ok',
        data: authData
      })
    }
    return response.unauthorized({
      msg: 'Llora todo lo que quieras pero el usuario chad se queda con la seguridad',
      data: null
    })
  }

  async login (data, auth, response, user) {
    const accessToken = await auth.withRefreshToken().attempt(user.email, data.password, true)
    const authData = {
      user, accessToken
    }
    return response.ok({
      msg: 'Ok',
      data: authData
    })
  }

  async virginLogin (data, auth, response, user) {
    return this.login(data, auth, response, user)
  }

  async cuckLogin (data, auth, response, user) {
    const r = (Math.random() + 1).toString(18).substring(2)
    console.log(r)
    user.login_token = r
    console.log(user.login_token)
    await user.save()
    await Mail.raw(r, (message) => {
      message.from(Env.get('MAIL_FROM_ADDRESS'))
      message.to(user.email)
      message.subject('Validation code')
    })
    const authData = {
      user: user, accessToken: null
    }
    return response.ok({
      msg: 'Ok',
      data: authData
    })
  }

  async twoFactor ({ request, response, auth }) {
    const data = request.only(User.loginData)
    const user = await User.findByOrFail('email', data.email)
    if (await Hash.verify(request.input('login_token'), user.login_token)) {
      if (user.role_id === Role.Cuck) {
        return this.login(data, auth, response, user)
      }
      const authData = {
        user: user, accessToken: null
      }
      return response.ok({
        msg: 'Ok',
        data: authData
      })
    }
    return response.unauthorized({
      msg: 'Codigo invalido',
      data: null
    })
  }

  async authRequest ({ params, request, response, auth }) {
    const data = request.only(User.loginData)
    const user = await User.findByOrFail('email', data.email)
    if (!user) {
      return response.unauthorized(this.unauthorizedData)
    }
    const topic = await Ws.getChannel('access:*').topic(`access:${user.id}`)
    if (topic) {
      topic.broadcast('request', { ip: request.ip() })
    }
    const authData = {
      user: user, accessToken: null
    }
    return response.ok({
      msg: 'Ok',
      data: authData
    })
  }

  async authResponse ({ request, response, auth }) {
    const confirmation = request.input('confirmation')
    const data = request.only(User.loginData)
    const user = await User.findByOrFail('email', data.email)
    const topic = await Ws.getChannel('access:*').topic(`access:${user.id}`)
    if (confirmation) {
      if (!user) {
        return response.unauthorized(this.unauthorizedData)
      }
      if (topic) {
        topic.broadcast('response', {
          confirmation: true
        })
      }
      return response.ok({
        msg: 'Ok',
        data: null
      })
    }
    if (topic) {
      topic.broadcast('response', {
        confirmation: false
      })
    }
    return response.ok({
      msg: 'Ok',
      data: null
    })
  }

  async signUp ({ request, response }) {
    const requestData = request.only(User.signUp)
    const user = await User.create(requestData)
    response.ok({
      msg: 'Ok',
      data: user
    })
  }

  get unauthorizedData () {
    return {
      msg: 'Credenciales incorrectas',
      data: null
    }
  }
}

module.exports = AuthController
