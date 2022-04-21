'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meme extends Model {
  static get table () {
    return 'memes'
  }

  static get store () {
    return [
      'name',
      'url'
    ]
  }

  static get update () {
    return this.store
  }
}

module.exports = Meme
