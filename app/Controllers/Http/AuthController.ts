import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
	public async login({ auth, request, response, session }: HttpContextContract) {
		await request.validate(LoginValidator)

		const email = request.input('email')
		const password = request.input('password')

		try {
			await auth.use('web').attempt(email, password)

			return response.redirect().toRoute('welcome')
		} catch (error) {
			session.flash({
				authError: 'Credentials does not match our records',
				email: request.input('email'),
			})
			return response.redirect().back()
		}
	}

	public async logout({ auth, response }: HttpContextContract) {
		await auth.use('web').logout()
		response.redirect().toRoute('login')
	}
}
