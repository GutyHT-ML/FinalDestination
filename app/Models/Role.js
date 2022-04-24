'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {
  static get table () {
    return 'roles'
  }

  static get Chad () {
    return 1
  }

  static get Cuck () {
    return 2
  }

  static get Virgin () {
    return 3
  }

  users () {
    return this.hasMany('App/Models/User')
  }
}

module.exports = Role
