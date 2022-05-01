import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Sale extends BaseModel {

  @manyToMany(()=>Product,{
    pivotTable: 'product_sales'
  })
  public products: ManyToMany<typeof Product>

  @column({ isPrimary: true })
  public id: number
  
  @column()
  public total_price: number

  @column()
  public clientId: number

  @column()
  public finished: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

Sale.$getRelation('products')