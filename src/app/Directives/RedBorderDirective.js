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

})(app)