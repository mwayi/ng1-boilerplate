(function(window, angular){

	// Having a single route config file 
	// is quite useful especially when there are few routes. 
	// However, I am also for highly modularised code 
	// where the route lives with the controller and it's
	// relevant views in context.

	app.config(['$routeProvider', function($routeProvider) {

		// As a convention, anything suffixed with Page, is
		// inherently a controller with a route and view.
		// This prevents your standard controllers being mixed
		// with endpoints.
		$routeProvider.when('/', {
			templateUrl:'HomePage', 
			controller:'HomePage',  
			title:'Home'
		});

		$routeProvider.when('/404', {
			templateUrl:'NotFoundPage', 
			controller:'NotFoundPage', 
			title:'404'
		});

		$routeProvider.otherwise({redirectTo:'/404'});
		
	}]);

})(app)


