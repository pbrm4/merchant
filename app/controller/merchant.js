angular.module('MyApp')
  .controller('MerchantCtrl', function($scope, $rootScope, $location, $window, $auth) {
	  
  $scope.name = 'World';
  $scope.accno = "1515151515151515";
  $scope.name = "Captain salesboy";
  $scope.bankcode = "1212121222112"
  $scope.merchantno = "14565666";
  $scope.drop = ["Primary","Discount","Chargeback","Take One"];

  $http.get('/api/merchantdata')
			.success(function(data) {
				$scope.merchant = data;			// store to above variables. 
			})
			.error(function(data) {
				console.log('Error: ' + data);
		})
		
		
  $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/account');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    }

  
});


app.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])
