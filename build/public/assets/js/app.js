var app = angular.module('app', ['ngRoute']);

(function(){

	app.directive('redBorderDirective', function($templateCache, $compile, env) {
		
		return {
			scope: false,
			transclude: false,
			restrict: 'A',

			/**
			 * Link on compile.
			 *
			 * @param {Object} scope
			 * @param {Object} element
			 * @param {Object} attrs
			 * @return void
			 */
			link: function(scope, el, attrs) {
		
				$el = $(el);
				$el.css({border: '1px solid red'});

			}
		}
	});

})(app);
(function(app){
	
})();
(function(window, angular) {
	/**
	 * Create a new Http constructor.
	 */
	var Http = function() {};

	var token = null;

	/**
	 * Decorate request.
	 *
	 * @param  {Object} configuration object.
	 * @return {Object}
	 */
	Http.request = function(config) {

		if(typeof config.params !== 'undefined') {
			config.params.token = token;
		}

      	return config;
	}

	app.factory('HttpInterceptor', function(env) {
		token = env.get('api_token');

		return Http;
	});

})(app);
// NA
// Ideally models would act as our broker between data
// and DOM level interactions. This would prevent us having to 
// interface directly to resources.;
(function(window, angular){
	/**
	 * Create a new HomePage constructor.
	 */
	var HomePage = [
		'$scope', 'UserResource',
		function($scope, UserResource) {

		var self = this;
		this.$scope = $scope;
		this.$scope.credential = 10000005;

		var filter = {};

		// Ideally we would only be interfacing with the resource object
		// via a model, to spare us having to do DOM level interactions 
		// such as "are you sure you want to delete" inside the controller.
		// Anytime unique logic takes place inside a controller, there
		// is a high chance it may want to get used again.
		UserResource.getAll(filter).then(function(users) {
			self.$scope.users = users;
		});
	}];

	app.controller('HomePage', HomePage);

})(app)

;
(function(window, angular) {
	/**
	 * Create a new NotFoundPage constructor.
	 */
	var NotFoundPage = function() {};

	app.controller('NotFoundPage', NotFoundPage);

})(app);
(function(window, angular) {

	// Ordinarily, one would register ngResource so that we 
	// can capitalise on the in-built conviniece methods.

	/**
	 * Create a new BaseResource constructor.
	 */
	var BaseResource = function($http, env) {
		var self = this;

		this.$http = $http;

		this.api_url = env.get('api_v1');
	};

	/**
	 * Get an endpoint.
	 *
	 * @param  {String} endpoint.
	 * @param  {Object} configuration object.
	 * @return {Promise}
	 */
	BaseResource.prototype.get = function(endpoint, config) {
		return this.$http.get(this.api_url + '/' + endpoint, config).then(function(response){
			// Very basic transformation 
			return response.status == 200? response.data: false;
		});
	}

	app.factory('BaseResource', function($http, env) {
		return new BaseResource($http, env);
	});

})(app);
(function(window, angular) {

	// This class allows us to fake a request 
	// to a local endpoint. 

	/**
	 * Create a new BaseResource constructor.
	 */
	var FakeResource = function($http, env) {
		var self = this;
 
		this.$http = $http;
	};

	/**
	 * Get an endpoint.
	 *
	 * @param  {String} endpoint.
	 * @param  {Object} configuration object.
	 * @return {Promise}
	 */
	FakeResource.prototype.get = function(endpoint, config) {
		return this.$http.get('/fixtures/' + endpoint + '.json', config).then(function(response){
			// Very basic transformation 
			return response.status == 200? response.data: false;
		});
	}

	app.factory('FakeResource', function($http, env) {
		return new FakeResource($http, env);
	});

})(app);
(function(window, angular) {
 
	/**
	 * Create a new Resource constructor.
	 */
	var Resource = function(FakeResource) {
		var self = this;
		this.resource = FakeResource;
	};

	/**
	 * Get all users.
	 *
	 * @param  {Object}  filter object.
	 * @return {Promise}
	 */
	Resource.prototype.getAll = function(filter) {
		return this.resource.get('users');
	}

	app.service('UserResource', Resource);

})(app);
(function(window, angular){

	// General configurations
	app.config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('HttpInterceptor');
	}]);

})(app)

  ;
(function(window, angular){

	// This value should be set by our build process.
	var env = 'staging'; // %replace_environment%

	var environments = {
		staging: {
			api_v1: 'https://staging.smrtr.com/v1'
		},
		defaults: {
			// Ordinarily we would first request the token from the server
			// via an auth endpoint. Once the request has been authorised 
			// we would recieve a token that we would store client side.
			// The hardcoded api token here represents that process
			api_token: 'abc',
			api_v1: 'https://smrtr.com/v1',
		}
	}

	// Although we break naming convention here
	// We are atttempting to provide the developer with a 
	// convinent way of accessing environment based variables.

	var Env = function(){
		return this;
	};

	/**
	 * Get environment variable.
	 *
	 * @param  {String} key.
	 * @param  {String} environment.
	 * @return {mixed}
	 */
	Env.prototype.get = function(key, environment) {
		environment = environment || env;

		if(typeof environments[environment] === 'object') {

			if(typeof environments[environment][key] !== 'undefined') {
				return environments[environment][key];
			}
		}

		return environments['defaults'][key];
	}


	app.service('env', Env);

})(app)


;
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


