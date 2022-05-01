import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Phone from './Phone'
import Sale from './Sale'

export default class Client extends BaseModel {
  @hasMany(()=>Address)
  public addresses: HasMany<typeof Address>
  
  @hasMany(()=>Phone)
  public phones: HasMany<typeof Phone>
  
  @hasMany(()=>Sale)
  public sales: HasMany<typeof Sale>

  @column()
  public user_id: number
  
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name: string
  
  @column()
  public cpf: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
