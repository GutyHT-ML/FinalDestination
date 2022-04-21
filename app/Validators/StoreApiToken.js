'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class StoreApiToken extends BaseValidator {
  get rules () {
    return {
      expiry_date: `required|date|dateFormat:YYYY-MM-DD|after:${new Date()}`,
      description: 'required|string'
    }
  }
}

module.exports = StoreApiToken
