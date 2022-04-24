'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const { rule } = require('@adonisjs/validator/src/Validator')
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Role = use('App/Models/Role')
const { validate } = use('Validator')

class RequiresApiToken {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, request, auth }, next) {
    // call next to advance the request
    const user = await auth.getUser()
    if (user.role_id === Role.Chad) {
      await next()
    }
    const rules = {
      api_key: 'required|string'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return response.badRequest({
        msg: 'Error',
        data: validation.messages()
      })
    }
    await next()
  }
}

module.exports = RequiresApiToken
