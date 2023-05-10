import RazorPayDataInterface from 'App/Interface/RazorPay/RazorPayDataInterface'
import RazorPayTransaction from 'App/Models/RazorPayTransaction'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RazorPayService {
	public static async create(data: RazorPayDataInterface) {
		return await RazorPayTransaction.create(data)
	}

	public static async getRecordsByPagination(ctx: HttpContextContract, limit: number) {
		const page = ctx.request.input('page', 1)

		return await RazorPayTransaction.query().preload('user').paginate(page, limit)
	}
}
