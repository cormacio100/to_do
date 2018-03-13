//	Define Factory Module

angular.module('UserFactory',[])
	.factory('UserAPIFactory',function($http){
		// factory returns an ANON object
  		// object contains a method called registerUser with 2 arguments
  		//	url - a string that will contain the URL that we’ll be calling for our API.
  		//	data - user object that contains the username and password that we’ll be registering with.
  		return {
  			callAPI: function(url, data){
  				return $http.post(url, data);
  			}
  		};
  		
	}) 