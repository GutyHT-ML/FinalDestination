'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
// eslint-disable-next-line no-undef
const Schema = use('Schema')

class ApiTokenSchema extends Schema {
  up () {
    this.create('api_tokens', (table) => {
      table.increments()
      table.string('key').unique()
      table.string('description')
      table.integer('used_by').references('id').inTable('users')
      table.integer('issued_by').references('id').inTable('users').nullable()
      table.date('expiry_date')
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('api_tokens')
  }
}

module.exports = ApiTokenSchema
