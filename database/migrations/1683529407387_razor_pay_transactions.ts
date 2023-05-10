import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'razor_pay_transactions'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id').primary()
			table.double('amount', 10, 2).notNullable()
			table.string('name').notNullable()
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users')
				.onDelete('CASCADE')
			table.string('paymentFor').notNullable()
			table.string('transactionId').notNullable()
			table.string('status').notNullable()
			table.string('shortUrl').notNullable()
			table.string('email').nullable()
			table.bigint('phone').nullable()
			table.timestamp('expireTime', { useTz: true }).notNullable()
			table.boolean('viaEmail').defaultTo(0)
			table.boolean('viaPhone').defaultTo(0)
			table.uuid('referenceId').notNullable()
			table.text('notes').nullable()
			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
