import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('number').notNullable()
      table.string('street', 64).notNullable()
      table.string('city', 72).notNullable()
      table.string('country', 64)
      table.integer('cep')

      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE');

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
