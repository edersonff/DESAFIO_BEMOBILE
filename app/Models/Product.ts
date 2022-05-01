import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column({})
  public title: string
  
  @column()
  public author: string
  
  @column()
  public description: string
  
  @column()
  public publication_date: Date
  
  @column()
  public quantity: number
  
  @column()
  public price: number
  
  @column()
  public publishing_company: string
  
  @column()
  public deleted: boolean
  
  @column()
  public language: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
