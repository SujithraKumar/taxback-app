'use strict';
/* Services */
angular
	.module('MainApp')
	.factory('MainService', ['$http', '$q', MainService]);

function MainService($http, $q) {

	var path = "";
	var factory = {};
	var deferred = $q.defer();

	factory.getTransactions = function () {
		path = "https://jointhecrew.in/api/txns/priya@gmail.com";
		var deferred = $q.defer();
		return $http.get(path).then(function (response) {
			deferred.resolve(response);
			return deferred.promise;
		}, function (response) {
			deferred.reject(response);
			return deferred.promise;
		});
	};

	factory.CreateNewTransaction = function (object) {
		path = 'https://jointhecrew.in/api/txns/'+ object.user;
		var deferred = $q.defer();
		return $http.get(path).then(function (response) {
			deferred.resolve(response);
			return deferred.promise;
		}, function (response) {
			deferred.reject(response);
			return deferred.promise;
		});
	};

	factory.UpdateTransaction = function (object) {
		path = 'https://jointhecrew.in/api/txns/' + object.user + '/' +object.id;
		var deferred = $q.defer();
		return $http.get(path).then(function (response) {
			deferred.resolve(response);
			return deferred.promise;
		}, function (response) {
			deferred.reject(response);
			return deferred.promise;
		});
	};

	factory.DeleteTransaction = function (object) {
		path = 'https://jointhecrew.in/api/txns/'+ object.user + '/' +object.id
		var deferred = $q.defer();
		return $http.get(path).then(function (response) {
			deferred.resolve(response);
			return deferred.promise;
		}, function (response) {
			deferred.reject(response);
			return deferred.promise;
		});
	};

	return factory;

};