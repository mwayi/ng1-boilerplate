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

})(app)