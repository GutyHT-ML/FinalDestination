'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {
  async logIn ({ request, response, auth }) {
    const requestData = request.only(User.loginData)
    const user = await User.findByOrFail('email', requestData.email)
    const accessToken = await auth.withRefreshToken().attempt(user.email, requestData.password, true)
    const authData = {
      user, accessToken
    }
    return response.ok({
      msg: 'Ok',
      data: authData
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
}

module.exports = AuthController
