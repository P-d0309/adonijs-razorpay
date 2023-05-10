import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class RazorPayTransaction extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public amount: Number

	@column({ columnName: 'paymentFor' })
	public paymentFor: String

	@column()
	public name: String

	@column()
	public email: String

	@column()
	public phone: Number

	@column()
	public user_id: Number

	@column.dateTime({ autoCreate: false, columnName: 'expireTime' })
	public expireTime: DateTime

	@column({ columnName: 'viaEmail' })
	public viaEmail: Boolean

	@column({ columnName: 'viaPhone' })
	public viaPhone: Boolean

	@column({ columnName: 'referenceId' })
	public referenceId: String

	@column({ columnName: 'transactionId' })
	public transactionId: String

	@column({ columnName: 'status' })
	public status: String

	@column({ columnName: 'shortUrl' })
	public shortUrl: String

	@column({ columnName: 'notes' })
	public notes: String

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	// Computed Properties
	public get createdAtComputed() {
		return this.createdAt.toFormat('yyyy LLL dd')
	}

	public get updatedAtComputed() {
		return this.updatedAt.toFormat('yyyy LLL dd')
	}
	// Relationships
	@belongsTo(() => User, {
		localKey: 'id',
		foreignKey: 'user_id',
	})
	public user: BelongsTo<typeof User>
}
