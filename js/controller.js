//	Define Controller Module 
//	....which contains controllers
angular.module('RouteControllers', [])
	.controller('HomeController', function($scope) {
		$scope.title = "Welcome To Angular Todo!"
	})
	.controller('RegisterController', function($scope,$location, UserAPIFactory) {
		
		$scope.registrationUser = {};
		var URL = "https://morning-castle-91468.herokuapp.com/";


		//	Sends a POST to an API with username and password
		//	Receives a JWT in response
		//	JWT can then be used to authenticate requests
		$scope.login = function(){
			UserAPIFactory.callAPI(URL+"accounts/api-token-auth/",$scope.data)
			.then(function(results){
				//	save the JWT (JSON Web Token) to scope as an object
				$scope.token = results.data.token;
				console.log('token is:');
				console.log($scope.token);
			}).catch(function(err){
				console.log(err.data);
			});
		};


		//	Function retrieves the submitted USERNAME and PASSWORD
		//	sends them to an API
		//	and registers the user
		$scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                //	Send username and password to the API to REGISTER them
                UserAPIFactory.callAPI(URL+"/accounts/register/",$scope.registrationUser)
                .then(function(results){
                	$scope.data = results.data;
                	alert("you have successfully registered to Angular ToDo");

                	//	After registration LOG the use IN
                	$scope.login();	
                }).catch(function(err){
                	alert("Oops! Something went wrong!");
                	console.log(err);
                });

            } //end if
    	};
    });