import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 120).notNullable()
      table.string('author', 120).notNullable()
      table.text('description')
      table.date('publication_date')
      table.integer('quantity').notNullable()
      table.decimal('price', 6, 2).notNullable()
      table.string('publishing_company', 100)
      table.string('language', 32)

      table.boolean('deleted').defaultTo('false');

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
