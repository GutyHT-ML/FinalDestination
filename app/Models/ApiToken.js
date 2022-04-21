'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ApiToken extends Model {
  static get table () {
    return 'api_tokens'
  }

  issuer () {
    return this.belongsTo('App/Models/User', 'issued_by', 'id')
  }

  user () {
    return this.belongsTo('App/Models/User', 'used_by', 'id')
  }
}

module.exports = ApiToken
