
/*namespace()*/
var Playlist = Class.extend({

    PLAYLIST_DATA_URL:'data/modules.json',
    $http:'',
    $q:'',
    playLists: '',
    modules:'',

    getPlayLists: function () {
        var deferred=this.$q.defer(),self=this;
        self.playLists=[];
       this.$http.get(this.PLAYLIST_DATA_URL).then(function(resp){
           self.modules=resp.data.modules;
         for(var key in resp.data.modules){
             self.playLists.push(resp.data.modules[key]);
         }
           deferred.resolve(resp.data);
       },function(){
           deferred.reject();
       });
        return deferred.promise;
    }
});



/**
 * Notes model provider since the application can
 * only handle one presentation at the same time.
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */
(function (){

    var PlaylistProvider = Class.extend({

        instance: new Playlist(),
        promise:function(){
          return this.instance.getPlayLists();
        },

        /**
         * Initialize and configure UserModel
         * @return UserModel
         */
        $get:['$http','$q',function($http,$q){
            this.instance.$http = $http;
            this.instance.$q=$q;
            this.instance.playLists=[];
            return this.instance;
        }]
    });

    angular.module('media.playlist',[])
        .provider('PlaylistService',PlaylistProvider);
}());