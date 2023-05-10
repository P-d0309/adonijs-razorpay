import View from '@ioc:Adonis/Core/View'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RazorPayHelper from 'App/Helpers/Razorpay.helper'
import RazorPayService from 'App/Services/RazorPayService'
import RazorPayMapper from 'App/Mappers/RazorPayMapper'

export default class RazorPayController {
	public async getAllPayments(ctx: HttpContextContract) {
		const limit: number = 10

		const transactions = await RazorPayService.getRecordsByPagination(ctx, limit)
		transactions.baseUrl('/integrations/razorpay/all-payments')
		return View.render('integrations/razorpay/get_all_payments', {
			auth: ctx.auth,
			transactions,
		})
	}

	public async createPayment({ auth, session }: HttpContextContract) {
		return View.render('integrations/razorpay/create_payment_link', { auth, session })
	}

	public async storePayment(ctx: HttpContextContract) {
		const rzInstance = RazorPayHelper.getInstance()
		let data = RazorPayMapper.RazorPayTransactionMapper(ctx)

		const rpDataObject = RazorPayMapper.getPaymentLinkData(data)

		const rpResponse = await rzInstance.paymentLink.create(rpDataObject)

		if (rpResponse.status) {
			data.transactionId = rpResponse.id
			data.status = rpResponse.status
			data.shortUrl = rpResponse.short_url

			await RazorPayService.create(data)
		}

		return ctx.response.redirect().toRoute('integrations.razorpay.getAllPayments')
	}

	public async getStoreTransactions(ctx: HttpContextContract) {
		return ctx.response.json({ status: 200 })
	}
}
