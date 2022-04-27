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
      const exp = Date.parse(instance.expiry_date)
      if (exp <= Date.now() || instance.used_by != null) {
        instance.active = false
      } else {
        instance.active = true
      }
    })

    this.addHook('afterFind', async (instance) => {
      const exp = Date.parse(instance.expiry_date)
      if (exp <= Date.now() || instance.used_by != null) {
        instance.active = false
      } else {
        instance.active = true
      }
      if (!instance.active || instance.used_by != null) {
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
