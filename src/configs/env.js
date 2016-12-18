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


