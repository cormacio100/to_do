//	Define main App module
//	Use Dependency Injection to include an array of 
//	supporting modules
	//	The RouteControllers module contains the controllers
	//	defined for each specific route
angular.module('TodoApp',['ngRoute','RouteControllers','UserFactory','angular-storage']);

angular.module('TodoApp').config(function($locationProvider,$routeProvider){
	
	//	locationProvider detects href
	//	Enable href routing without hashes
	$locationProvider.html5Mode(true); 	

	$routeProvider.when('/',{
		templateUrl: 'templates/home.html',
		controller: 'HomeController'
	})
	.when('/accounts/register',{
		templateUrl: 'templates/register.html',
		controller: 'RegisterController'
	});
});