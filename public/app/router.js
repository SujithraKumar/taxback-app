angular.module('MainApp', ['ngRoute'])

	.config(function ($routeProvider, $locationProvider) {


		$routeProvider
			.when('/transactions', {
				templateUrl:'app/components/orders/orders.html'

			})


	})