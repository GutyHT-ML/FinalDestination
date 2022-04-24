'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static get table () {
    return 'users'
  }

  static get hidden () {
    return [
      'password'
    ]
  }

  static get loginData () {
    return [
      'email',
      'password'
    ]
  }

  static get chadSignUp () {
    return [
      'email',
      'password',
      'role_id',
      'username'
    ]
  }

  static get signUp () {
    return [
      'email',
      'password',
      'username'
    ]
  }

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
      if (userInstance.login_token != null && userInstance.login_token !== '') {
        if (userInstance.dirty.login_token) {
          userInstance.login_token = await Hash.make(userInstance.login_token)
        }
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  role () {
    return this.belongsTo('App/Models/Role', 'role_id', 'id')
  }

  apiTokens () {
    return this.hasMany('App/Models/ApiToken', 'id', 'issued_by')
  }

  usedApiTokens () {
    return this.hasMany('App/Models/ApiToken', 'id', 'used_by')
  }
}

module.exports = User
