'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class Login extends BaseValidator{
  get rules () {
    return {
      email: 'required|email',
      password: 'required|string'
    }
  }
}

module.exports = Login
