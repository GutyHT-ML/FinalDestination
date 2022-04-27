'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// eslint-disable-next-line no-undef
const ApiToken = use('App/Models/ApiToken')
const Role = use('App/Models/Role')

/**
 * Resourceful controller for interacting with apitokens
 */
class ApiTokenController {
  /**
   * Show a list of all apitokens.
   * GET apitokens
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const user = await auth.getUser()
    if (user.role_id === Role.Chad) {
      return response.badRequest({
        msg: 'Usuario no autorizado',
        data: null
      })
    }
    const tokens = await ApiToken.all()
    return response.json({
      msg: 'Ok',
      data: tokens
    })
  }

  /**
   * Create/save a new apitoken.
   * POST apitokens
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const isVpn = request.input('is_vpn', false)
    if (isVpn) {
      const user = await auth.getUser()
      if (user.role_id === Role.Chad) {
        const key = Date.now().toString(this.getRandomInt(2, 9))
        const r = (Math.random() + 1).toString(18).substring(2)
        const expiry = request.input('expiry_date')
        const description = request.input('description')
        const token = await user.apiTokens().create({
          key: r + key,
          description: description,
          expiry_date: expiry
        })
        return response.created({
          msg: 'Ok',
          data: token
        })
      }
      return response.badRequest({
        msg: 'Usuario no autorizado',
        data: null
      })
    }
    return response.unauthorized({
      msg: 'Usuario no autorizado',
      data: null
    })
  }

  getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  /**
   * Display a single apitoken.
   * GET apitokens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view, auth }) {
    const user = await auth.getUser()
    if (user.role_id === Role.Chad) {
      return response.badRequest({
        msg: 'Usuario no autorizado',
        data: null
      })
    }
    const token = await ApiToken.findOrFail(params.id)
    return response.json({
      msg: 'Ok',
      data: token
    })
  }

  /**
   * Delete a apitoken with id.
   * DELETE apitokens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const user = await auth.getUser()
    if (user.role_id === Role.Chad) {
      return response.badRequest({
        msg: 'Usuario no autorizado',
        data: null
      })
    }
    const token = await ApiToken.findOrFail(params.id)
    token.active = !token.active
    await token.save()
    return response.json({
      msg: 'Ok',
      data: token
    })
  }
}

module.exports = ApiTokenController
