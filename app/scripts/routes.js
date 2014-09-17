var module=angular.module('media.routes',[]);
module.config(['$routeProvider','PlaylistServiceProvider', function ($routeProvider,PlaylistServiceProvider) {
    console.log($routeProvider,PlaylistServiceProvider);
    angular.forEach(getRoutes(PlaylistServiceProvider), function (routeObj) {
        $routeProvider.when(routeObj.route, routeObj.config);
    });
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
function getRoutes () {
    var routes = [
        {
            route: '/login',
            config: {
                controller: 'LoginCtrl',
                templateUrl: 'views/login.html',
                title: 'Home',
                resolve: {
                    promise: appDataPromise
                }
            }
        },
        {
            route: '/home',
            config: {
                controller: 'PlaylistCtrl',
                templateUrl: 'views/playlist.html',
                title: 'Home',
                resolve: {
                    promise: appDataPromise
                }
            }
        },
        {
            route: '/home/:id',
            config: {
                controller: 'genreCtrl',
                templateUrl: 'views/genre.html',
                title: 'Home'
            }
        }
    ]
    return routes;
}
var appDataPromise = function (PlaylistService) {
    return PlaylistService.getPlayLists();
};