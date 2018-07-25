	angular
		.module('MainApp')
		.controller('MainController', ['$scope', '$rootScope','$location', 'MainService', MainController]);

function MainController($scope, $rootScope, $location, MainService) {

	// ****variable declaration*****

	$scope.Transactions=[];
	$scope.currencies=['EUR','INR','GBP','USD'];
	$scope.newUser={};
	$location.path('/orders');
	$scope.loading=false;

	// Function Declaration

	$scope.getTransactions = function () {
		$scope.loading=true;
		MainService.getTransactions().then(function (result) {
			if (result.data) {
				$scope.Transactions = result.data;
				$scope.loading=false;
			}

		}, function (error) {
		
		});

	}


		
	$scope.addNewTransaction= function(newUser){
		for (i = 0; i < $scope.Transactions.length; i++) {
			if ($scope.Transactions[i].id == newUser.id) {
				$scope.Transactions[i] = newUser;
				newUser.date = $scope.convertDate(newUser.txn_date);
				document.getElementById("txnDate").value =newUser.txn_date;

				MainService.UpdateTransaction(newUser).then(function (result) {
						if (result.data) {
						
					}

				}, function (error) {
				
				});
				return;
			}
		}
		newUser.id=Math.floor((Math.random() * 100) + 1);
		$scope.Transactions.push(newUser);
		newUser.txn_date = $scope.convertDate(newUser.txn_date);
		document.getElementById("txnDate").value =newUser.txn_date;
		MainService.CreateNewTransaction(newUser).then(function (result) {
					if (result.data) {
						
					}

				}, function (error) {
				
				});
		$scope.edit= false;

	}

	$scope.convertDate= function(str){
		var today = new Date(str);
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		 if(dd<10){
		        dd='0'+dd
		    } 
		    if(mm<10){
		        mm='0'+mm
		    } 

		today = yyyy+'-'+mm+'-'+dd;
		return today;
	}

	$scope.setCurrency = function(currency){
		$scope.newUser.currency=currency;
	}

	$scope.CancelItemConfirmation = function (item) {
		$('#confirmationModal').modal('show');
		$scope.CancelledItem=item;
	}
	
	$scope.cancelOrder = function () {
		$('#confirmationModal').modal('hide');
		for (i = 0; i < $scope.Transactions.length; i++) {
			if ($scope.Transactions[i].id == $scope.CancelledItem.id) {
				$scope.Transactions.splice(i,1);
				MainService.DeleteTransaction($scope.Transactions[i]).then(function (result) {
					if (result.data) {
						
					}

				}, function (error) {
				
				});
				break;
			}
		}


	}

	$scope.selectedItem ={};
	$scope.edit=false;
	$scope.editDetails = function (object) {
		$scope.edit=true;
		$scope.newUser = object;
		document.getElementById("txnDate").value =$scope.newUser.txn_date;
	}

	$scope.createNewTransaction = function(){
		$scope.edit=false;
		$scope.newUser={};
		document.getElementById("txnDate").value="";
	}

	$scope.getTransactions();

};