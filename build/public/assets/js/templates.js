angular.module('app').run(['$templateCache', function($templateCache) {
 	$templateCache.put('HomePage',"<div class=\"container-fluid\">\n    <div class=\"row\">\n       <div class=\"col-lg-12\">\n          <h3>Displaying {{users.length}} users</h3>\n          <div class=\"row\">\n             <div class=\"col-md-4\" red-border-directive ng-repeat=\"user in users track by $index\">\n                <div class=\"card\">\n                      <div class=\"card-header\">\n                          <h4 class=\"card-header-title\">{{user.username}}</h4>\n                      </div>\n                      <div class=\"card-block\">\n                          <p class=\"card-title\">E: <a href=\"mailto:{{user.email}}\">{{user.email}}</a></p> \n                      </div>\n                </div>\n             </div>\n          </div>\n       </div> \n    </div>\n </div>");

 	$templateCache.put('NotFoundPage',"<div class=\"jumbotron\">\n\t404\n</div>");

 	$templateCache.put('RedBorderDirective',"No template used within directive. This is for illustration purposes.");
}]);