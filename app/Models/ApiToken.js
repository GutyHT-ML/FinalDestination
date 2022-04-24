'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

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

  static boot () {
    super.boot()

    // this.addHook('afterSave', async (instance) => {
    //   instance.key = await Hash.make(instance.key)
    // })

    this.addHook('beforeSave', async (instance) => {
      instance.active = instance.used_by == null
    })

    this.addHook('afterFind', async (instance) => {
      if (!instance.active || instance.used_by !== null) {
        instance.$hidden = ['key']
      }
    })

    this.addHook('afterFetch', async (instances) => {
      instances.forEach(i => {
        i.$hidden = ['key']
      })
    })
  }
}

module.exports = ApiToken
