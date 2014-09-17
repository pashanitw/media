'use strict';

var app=angular.module('media', [
    'ngRoute',
    'media.playlist',
    'media.localstorage',
    'media.routes',
    "media.users"
]);
app.run(['$rootScope', '$location', 'LocalStorageService',
    function ($rootScope, $location, LocalStorageService) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
                $rootScope.userDetails = LocalStorageService.getItem('userDetails');
                $rootScope.isLoggedIn = true;
                $rootScope.next = next;
               if(!$rootScope.userDetails) {
                   $rootScope.isLoggedIn = false;
                   if (next.templateUrl === "views/login.html") {
                       // already going to #login, no redirect needed
                   } else {
                       $location.path("/login");
                   }
               }

            });
        $rootScope.logout=function(){
            $rootScope.isLoggedIn = false;
            LocalStorageService.clearAll();
            $location.path("/login");
        }
 }]);
