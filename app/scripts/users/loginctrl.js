/**
 * Created by shaikp on 9/18/2014.
 */
var module=angular.module('media.users');
module.controller('LoginCtrl', [
    '$scope',
    'PlaylistService',
    '$location',
    'UserService',
    '$rootScope',
    'LocalStorageService',
    LoginController
]);
function LoginController($scope,PlaylistService,$location,UserService,$rootScope,LocalStorageService) {
$scope.user={
    username:'',
    password:''
}
    $scope.showError=false;
    $scope.$error='';
    $scope.login=function(){
        UserService.login($scope.user).then(function(){

            LocalStorageService.setItem('userDetails',$scope.user);
            $rootScope.isLoggedin=true;
            $rootScope.userDetails=$scope.user;
            $location.path("/home");
            $scope.showError=false;
            $scope.$error='';

        },function(){
            $scope.showError=true;
            $scope.$error='User Does not Exist';
        })
    }
}
