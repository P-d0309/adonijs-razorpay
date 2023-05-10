import Razorpay from 'razorpay'
import Env from '@ioc:Adonis/Core/Env'

export default class RazorPayHelper {
	public static getInstance() {
		var instance = new Razorpay({
			key_id: Env.get('RAZORPAY_PUBLIC_KEY'),
			key_secret: Env.get('RAZORPAY_SECRET_KEY'),
		})

		return instance
	}
}
