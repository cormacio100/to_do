// 	define custom directive for navigation
angular.module('GlobalDirective',[])
	.directive('navLinks',function(){
		return {
			restrict: 'EA',
			templateUrl: 'templates/directives/nav-links.html'
		};
	})
	.directive('todoTable',function(){
		return {
			restrict: 'EA',
			templateUrl: 'templates/directives/todo-table.html'
		};
	});


