'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Meme = use('App/Models/Meme')

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
    const memes = await Meme.all()
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
  async update ({ params, request, response }) {
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

  /**
   * Delete a meme with id.
   * DELETE memes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const meme = await Meme.findOrFail(params.id)
    meme.active = !meme.active
    await meme.save()
    return response.ok({
      msg: 'Ok',
      data: meme
    })
  }
}

module.exports = MemeController
