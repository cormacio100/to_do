//	Define Factory Module
angular.module('UserFactory',[])
	//	create a factory inside the module
	.factory('UserAPIFactory',function($http){
	    /**
		 *  factory registers a user and returns a token object
  		 *  object contains a method called registerUser with 2 arguments
  		 *	url - a string that will contain the URL that we’ll be calling for our API.
  		 *	data - user object that contains the username and password that we’ll be registering with.
  		 */
  		return {
  			callAPI: function(url, data){
  				return $http.post(url, data);
  			}
  		};
	});

//	Define Facotry module
angular.module('TodoFactory',[])
	//	create a factory inside the module
	.factory('TodoAPIFactory',function($http){

		/**
		 *	Factory returns an ANON object
		 *  that contains a method called getTodos tht takes 3 argumentss
		 *  url - a string containing the URL that we’ll be calling for our API.
		 *  data - username o
		 *  token - JWT 
		 */
		return {
			getTodos: function(url,data,token){
				/**
				 *  Create the HEADER for the request as a STRING
				 *	It will contain the token
				 *	Server will read it as a key/value pair hence the :
				 *	JWT is also included in the string to tell the server
				 *	what kind of authorization to use (E.G. JWT) 
				 *	The token is appended to the end of the string
				 *  There must be a space between JWT and token
				 */
				var header = "Authorization: JWT "+ token;

				/**
				 *	"get" is used as the request method as we are 
				 *	retrieving data from the server.
				 *	Query params may also be used
				 */
				return $http.get(
					url,
					{params:{"username":data}}, // ANON object
					header
				);
			}
		};	 
	});