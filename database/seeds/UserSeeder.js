'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    await Factory.model('App/Models/User').create({
      username: 'Wutychad',
      email: 'ght159hdztorreslol@gmail.com',
      password: '123',
      role_id: 1
    })
    await Factory.model('App/Models/User').create({
      username: 'Cuckysen',
      email: '19170146@uttcampus.edu.mx',
      password: '123',
      role_id: 2
    })
    await Factory.model('App/Models/User').create({
      username: 'Chadolfo',
      email: 'guty.dev.test@gmail.com',
      password: '123',
      role_id: 1
    })
    await Factory.model('App/Models/User').create({
      username: 'Alexvirgin',
      email: 'alexferlozanom@gmail.com',
      password: '123',
      role_id: 3
    })
    await Factory.model('App/Models/User').create({
      username: 'Alexcuck',
      email: '19170025@uttcampus.edu.mx',
      password: '123',
      role_id: 2
    })
  }
}

module.exports = UserSeeder
