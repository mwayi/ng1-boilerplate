(function(window, angular){

	// General configurations
	app.config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('HttpInterceptor');
	}]);

})(app)

  