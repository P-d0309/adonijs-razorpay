import RazorPayDataInterface from 'App/Interface/RazorPay/RazorPayDataInterface'
import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PaymentLinks } from 'razorpay/dist/types/paymentLink'

export default class RazorPayMapper {
	public static RazorPayTransactionMapper({
		auth,
		request,
	}: HttpContextContract): RazorPayDataInterface {
		return {
			name: request.input('name'),
			amount: Number(request.input('amount')),
			paymentFor: request.input('paymentFor'),
			email: request.input('email'),
			phone: request.input('phone'),
			viaEmail: request.input('mode') === 'viaEmail' ? true : false,
			viaPhone: request.input('mode') === 'viaPhone' ? true : false,
			notes: request.input('notes'),
			referenceId: uuidv4(),
			expireTime: DateTime.now().plus({ days: 2 }),
			user_id: auth.user?.id,
			transactionId: '',
			status: '',
			shortUrl: '',
		}
	}

	public static getPaymentLinkData(
		data: RazorPayDataInterface
	): PaymentLinks.RazorpayPaymentLinkCreateRequestBody {
		return {
			amount: Number(data.amount) * 100,
			currency: 'INR',
			accept_partial: false,
			expire_by: data.expireTime.toUnixInteger(),
			reference_id: data.referenceId,
			description: data.paymentFor,
			customer: {
				name: data.name,
				contact: data.phone ? `+91${data.phone}` : undefined,
				email: data.email ?? null,
			},
			notify: {
				sms: data.viaPhone,
				email: data.viaEmail,
			},
			reminder_enable: true,
			notes: {
				notesData: data.notes,
			},
		}
	}
}
