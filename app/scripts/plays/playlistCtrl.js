var module = angular.module('media.playlist');
module.controller('PlaylistCtrl', [
    '$scope',
    'PlaylistService',
    '$routeParams',
    '$http',
    playListController
]);
function playListController($scope,PlaylistService,$routeParams,$http) {

    $scope.genres=[];
    $scope.$on('$viewContentLoaded', function () {
        $scope.lists=[];
        $scope.lists=PlaylistService.playLists;
        console.log($scope.lists);
    })
    $scope.$watch(function(){
        return $routeParams.id
    },function(newval){
        if(newval){
            $scope.getVideos(PlaylistService.modules[newval].url);
        }

    });
    $scope.getVideos=function(url){
        PlaylistService.$http.get(url).then(function(resp){
            angular.forEach(resp.data.files,function(item){
                $scope.genres.push(item);
            })
            console.log($scope.genres);
        })
    }

}
module.controller('genreCtrl', [
    '$scope',
    'PlaylistService',
    '$routeParams',
    playListController
]);
function genreController($scope,PlaylistService,$routeParams) {
    $scope.genres=[];
    console.log(id);
    $scope.$on('$viewContentLoaded', function () {
        var id=$routeParams.id;
        console.log(id);
    })
}