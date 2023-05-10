import { DateTime } from 'luxon'

interface RazorPayDataInterface {
	email: string
	name: string
	amount: Number
	paymentFor: string
	phone: Number
	viaEmail: boolean
	viaPhone: boolean
	notes: string
	transactionId: string
	status: string
	shortUrl: string
	expireTime: DateTime
	referenceId: string
	user_id: number | undefined
}

export default RazorPayDataInterface
