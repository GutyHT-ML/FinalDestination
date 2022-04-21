'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
// eslint-disable-next-line no-undef
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('roles', 'RoleController.index')
Route.get('roles/:id', 'RoleController.show')

Route.resource('api-tokens', 'ApiTokenController')
  .middleware(['auth:jwt'])
  .apiOnly()
  .except(['update'])

Route.post('login', 'AuthController.logIn')

Route.post('sign-up', 'AuthController.signUp')
