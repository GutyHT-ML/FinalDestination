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

Route.resource('roles', 'RoleController')
  .middleware(['auth:jwt'])
  .apiOnly()
  .except(['store', 'update'])

Route.resource('api-tokens', 'ApiTokenController')
  .validator(new Map([
    [['api-tokens.store'], ['StoreApiToken']]
  ]))
  .middleware(['auth:jwt'])
  .apiOnly()
  .except(['update'])

Route.post('login', 'AuthController.webLogIn')
  .validator('Login')
  .middleware(['guest'])

Route.post('login', 'AuthController.appLogIn')
  .prefix('app')
  .validator('Login')
  .middleware(['guest'])

Route.post('sign-up', 'AuthController.signUp')
  .validator('Signup')
  .middleware(['guest'])

Route.post('check-refresh', 'AuthController.checkRefresh')

Route.post('two-factor', 'AuthController.twoFactor')
  .validator('Login')
  .middleware(['guest'])

Route.post('three-factor', 'AuthController.authRequest')
  .validator('Login')
  .middleware(['guest'])

Route.post('auth-confirmation', 'AuthController.authResponse')
  .middleware(['auth:jwt'])

Route.resource('memes', 'MemeController')
  .validator(new Map([
    [['memes.store', 'memes.update'], ['StoreMeme']]
  ]))
  .middleware(new Map([
    [['*'], ['auth:jwt']],
    [['update', 'destroy'], ['apiToken']]
  ]))
  .apiOnly()
