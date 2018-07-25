angular.module('MainApp', ['ngRoute'])

	.config(function ($routeProvider, $locationProvider) {


		$routeProvider
			.when('/orders', {
				templateUrl:'app/components/orders/orders.html'

			})


	})