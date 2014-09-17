var LocalStorage = Class.extend({

    PREFIX:'media:',


    setItem: function (key,item) {
        localStorage.setItem(this.PREFIX+key, JSON.stringify(item));
    },
    getItem: function (key) {
      return JSON.parse(localStorage.getItem(this.PREFIX+key));
    },
    clearAll:function(){
        localStorage.clear();
    }
});

(function (){

    var localStorageProvider = Class.extend({
        instance:new LocalStorage(),
        /**
         * Initialize and configure UserModel
         * @return UserModel
         */
        $get:['$http','$q',function($http,$q){
            return this.instance;
        }]
    });

    angular.module('media.localstorage',[])
        .provider('LocalStorageService',localStorageProvider);
}());