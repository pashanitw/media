
/*namespace()*/
var UserService = Class.extend({

    USER_DATA_URL:'data/users.json',
    $http:'',
    $q:'',
    users: '',

    login: function (user) {
        var deferred = this.$q.defer();
        var self=this;
        if (!this.users) {
            this.$http.get(this.USER_DATA_URL).then(function (resp) {
                self.users = resp.data.users;
                self.resolveLogin(deferred, user);
            })
        } else {
            this.resolveLogin(deferred, user);
        }
        return deferred.promise;
    },
    resolveLogin: function (promise, user) {
        var userOb;
        var auth=false;
        for(var i= 0,len=this.users.length; i<len; i++){
            userOb=this.users[i];
            if(user.username==userOb.user_name){
                if(user.password==userOb.password){
                    auth=true;
                    break;
                }
                break;
            }
        }
        auth ? promise.resolve(user) : promise.reject("USER DOES NOT EXIST")
    }
});

(function (){

    var UserServiceProvider = Class.extend({

        instance: new UserService(),

        /**
         * Initialize and configure UserModel
         * @return UserModel
         */
        $get:['$http','$q',function($http,$q){
            this.instance.$http = $http;
            this.instance.$q=$q;
            return this.instance;
        }]
    })

    angular.module('media.users',[])
        .provider('UserService',UserServiceProvider);
}());