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

