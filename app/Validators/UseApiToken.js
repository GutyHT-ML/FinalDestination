'use strict'

const BaseValidator = use('App/Validators/BaseValidator')
const Role = use('App/Models/Role')

class UseApiToken extends BaseValidator{


  async get rules () {
    const user = await this.ctx.request.auth.getUser()
    if (user.role_id !== Role.Chad) {
      return {
        api_token: 'required|string'
      }
    }
    return {}
  }
}

module.exports = UseApiToken
