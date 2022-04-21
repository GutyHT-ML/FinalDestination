'use strict'

const { formatters } = use('Validator')

class BaseValidator {
  get formatter () {
    return formatters.JsonApi
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = BaseValidator
