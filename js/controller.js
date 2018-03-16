//	Define Controller Module 
//	....which contains controllers
angular.module('RouteControllers', [])
	.controller('HomeController', function($scope) {
		$scope.title = "Welcome To Angular Todo!"
	})
	.controller('RegisterController', function($scope, $location,UserAPIFactory,store) {
		
		$scope.registrationUser = {};
		//var URL = "https://morning-castle-91468.herokuapp.com/";
		var authStorage = {
			name: "StorageTest"
		}

		//	Sends a POST to API with username and password
		//	Receive a JWT in response
		//	which can then be used to authenticate
		$scope.login = function(){
			UserAPIFactory.callAPI(URL+"accounts/api-token-auth/",$scope.data)
			.then(function(results){
				//	save the JWT (JSON Web Token) to scope as an object
				$scope.token = results.data.token;
				//	set JWT in local storage as a Key: Value pair so 
				//	that it can be used by separte controllers
				//	Also, store the username
				//	Both stored as Strings
				store.set('username', $scope.registrationUser.username);
                store.set('authToken', $scope.token);
				console.log('token is:');
				console.log($scope.token);
				$location.path('/');
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
    })
    .controller('LogoutController',function($scope,$location,store){
    	// 	remove the object from the store and fowrad the user
    	$scope.actions = ['No','Yes'];

    	//	Remove JWT and username from local storage
    	$scope.submitLogoutForm = function(){
    		if(($scope.logoutForm.$valid))
    		if('Yes'==$scope.action){
    			store.remove('username');
    			store.remove('authToken');
    			alert('user has been logged out');
    			$location.path('/');
    		}else{
    			alert('User has not been logged out');
    		}
    	};
    })
    .controller('TodoController', function($scope, $location, TodoAPIFactory, store) {
        //var URL = "https://morning-castle-91468.herokuapp.com/";
 
        $scope.authToken = store.get('authToken');
        $scope.username = store.get('username');
 
 		$scope.statuses = ['Todo','Doing','Done'];
        $scope.todos = [];
 
 		// RETRIEVE ALL Todo items from API for the user
        TodoAPIFactory.getTodos(URL + "todo/", $scope.username, $scope.authToken).then(function(results) {
            $scope.todos = results.data || [];
            console.log($scope.todos);
        }).catch(function(err) {
            console.log(err);
        });
 
        //	EDIT Todo item
        //	ID is passed in 
        $scope.editTodo = function(id){
        	//	redirect user to URL with ID of the specific item appended
        	$location.path('/todo/edit/'+id);
        }

        //	DELETE Todo item
        $scope.deleteTodo = function(id){
        	//	invoke the deleteTodo method on the Factory
        	TodoAPIFactory.deleteTodo(URL+"todo/"+id,$scope.username,$scope.authToken).then(function(results){
        		console.log('Item with ID:'+id+' deleted');
        		console.log(results);
        	});
        }

        //	WORKAROUND FOR POST API NOT WORKING
        var id = 1;

 		//	when the Todo form is submitted
        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
            	//	Add the username to the username object
            	//  so that the server knows which user's todo items
            	//	to return 
            	$scope.todo.id = id;
            	id++;
                $scope.todo.username = $scope.username;
                $scope.todos.push(angular.copy($scope.todo));

                //	send Todo item to API to save on server
                TodoAPIFactory.createTodo(URL + "todo/", $scope.todo, $scope.authToken).then(function(results) {
                   console.log('Todo Item created');
                   console.log(results);
                }).catch(function(err) {
                    console.log(err)
                });

                //	Reset Modal Form elements and close Window
                $('#title').val('');
                $('#description').val('');
                $('#status').val('Todo');
                $('#todo-modal').modal('toggle');
            }
        }
    })
    .controller('EditTodoController',function($scope,$location,$routeParams,TodoAPIFactory,store){
    	//	id is contained in the $routeParams object
    	var id = $routeParams.id;

    	//	Populate the EDIT form with TODO item
    	TodoAPIFactory.getTodos(URL+'todo/'+id,$scope.username, store.get('authToken')).then(function(results){
    		$scope.todo = results.data;
    	}).catch(function(err){
    		console.log(err);
    	});

    	//	when the user clicks to Save on the Edit Todo page
    	$scope.submitForm = function(){
    		if($scope.todoForm.$valid){
    			$scope.todo.username = $scope.username;

    			TodoAPIFactory.editTodo(URL+"todo/"+id,$scope.todo,store.get('authToken')).then(function(results){
    				$location.path('/todo');
    			}).catch(function(err){
    				console.log(err);
    			})
    		}
    	};

    });