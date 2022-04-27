'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Meme = use('App/Models/Meme')
const Role = use('App/Models/Role')
const ApiToken = use('App/Models/ApiToken')
const Hash = use('Hash')
const Database = use('Database')

/**
 * Resourceful controller for interacting with memes
 */
class MemeController {
  /**
   * Show a list of all memes.
   * GET memes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const memes = await Meme.query()
      .where('active', true)
      .fetch()
    return response.ok({
      msg: 'Ok',
      data: memes
    })
  }

  /**
   * Create/save a new meme.
   * POST memes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(Meme.store)
    const meme = await Meme.create(data)
    return response.created({
      msg: 'Ok',
      data: meme
    })
  }

  /**
   * Display a single meme.
   * GET memes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const meme = await Meme.findOrFail(params.id)
    return response.ok({
      msg: 'Ok',
      data: meme
    })
  }

  /**
   * Update meme details.
   * PUT or PATCH memes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const user = await auth.getUser()
    console.log(user.role_id)
    if (user.role_id === Role.Chad) {
      const data = request.only(Meme.update)
      const meme = await Meme.findOrFail(params.id)
      meme.name = data.name
      meme.url = data.url
      await meme.save()
      return response.ok({
        msg: 'Ok',
        data: meme
      })
    }
    const key = request.input('api_key')
    const token = await ApiToken.findBy('key', key)
    if (!token) {
      return response.badRequest({
        msg: 'Token invalido',
        data: null
      })
    }
    if (token.active === false) {
      return response.badRequest({
        msg: 'Token invalido',
        data: null
      })
    }
    if (token.key === key) {
      const data = request.only(Meme.update)
      const meme = await Meme.findOrFail(params.id)
      meme.name = data.name
      meme.url = data.url
      await meme.save()
      token.used_by = user.id
      token.active = false
      await token.save()
      return response.ok({
        msg: 'Ok',
        data: meme
      })
    }
    return response.badRequest({
      msg: 'Token invalido',
      data: null
    })
  }

  /**
   * Delete a meme with id.
   * DELETE memes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const user = await auth.getUser()
    console.log(user.role_id)
    if (user.role_id === Role.Chad) {
      const meme = await Meme.findOrFail(params.id)
      meme.active = !meme.active
      await meme.save()
      return response.ok({
        msg: 'Ok',
        data: meme
      })
    }
    const key = request.input('api_key')
    const token = await ApiToken.findBy('key', key)
    if (!token) {
      return response.badRequest({
        msg: 'Token invalido',
        data: null
      })
    }
    if (token.active === false) {
      return response.badRequest({
        msg: 'Token invalido',
        data: null
      })
    }
    if (token.key === key) {
      const meme = await Meme.findOrFail(params.id)
      meme.active = !meme.active
      await meme.save()
      token.used_by = user.id
      token.active = false
      await token.save()
      return response.ok({
        msg: 'Ok',
        data: meme
      })
    }
    return response.badRequest({
      msg: 'Token invalido',
      data: null
    })
  }
}

module.exports = MemeController
