import Route from '@ioc:Adonis/Core/Route'

Route.get('login', async ({ view }) => {
	return view.render('login')
}).as('login')

Route.any('api/rp-webhook', async ({ response }) => {
	return response.send({ status: 200 })
})

Route.post('login', 'AuthController.login').as('postLogin')

Route.group(() => {
	Route.get('/', async ({ view }) => {
		return view.render('welcome')
	}).as('welcome')

	Route.post('/logout', 'AuthController.logout').as('logout')

	// Integration routes
	Route.group(() => {
		Route.get('razorpay/all-payments', 'RazorPayController.getAllPayments').as(
			'razorpay.getAllPayments'
		)
		Route.post('razorpay/all-payments', 'RazorPayController.getStoreTransactions').as(
			'razorpay.getStoreTransactions'
		)
		Route.get('razorpay/create-link', 'RazorPayController.createPayment').as(
			'razorpay.createPayment'
		)
		Route.post('razorpay/store-link', 'RazorPayController.storePayment').as(
			'razorpay.storePayment'
		)
	})
		.prefix('integrations')
		.as('integrations')
		.namespace('App/Controllers/Http/Integration')
}).middleware(['auth'])

Route.resource('users', 'UsersController')
