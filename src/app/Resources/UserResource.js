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

})(app)