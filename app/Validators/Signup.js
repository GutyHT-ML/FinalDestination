'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class Signup extends BaseValidator{
  get rules () {
    return {
      username: 'required|string|unique:users,username',
      email: 'required|email|confirmed|unique:users,email',
      password: 'required|string|confirmed|min:6'
    }
  }
}

module.exports = Signup
