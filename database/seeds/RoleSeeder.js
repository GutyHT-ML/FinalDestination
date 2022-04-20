'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class RoleSeeder {
  async run () {
    await Factory.model('App/Models/Role').create({
      name: 'Chad'
    })
    await Factory.model('App/Models/Role').create({
      name: 'Cuck'
    })
    await Factory.model('App/Models/Role').create({
      name: 'Virgin'
    })
  }
}

module.exports = RoleSeeder
