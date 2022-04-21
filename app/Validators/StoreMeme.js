'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class StoreMeme extends BaseValidator {
  get rules () {
    return {
      name: 'required|string',
      url: 'required|url'
    }
  }
}

module.exports = StoreMeme
