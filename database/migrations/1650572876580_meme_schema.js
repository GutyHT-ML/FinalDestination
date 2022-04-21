'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MemeSchema extends Schema {
  up () {
    this.create('memes', (table) => {
      table.increments()
      table.string('name')
      table.string('url')
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('memes')
  }
}

module.exports = MemeSchema
