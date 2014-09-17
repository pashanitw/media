var BaseCtrl = Class.extend({
    $scope: null,
    init: function (scope) {
        this.$scope = scope;
        this.defineListeners(this.$scope);
        this.defineScope();
    },

    defineListeners: function () {
        this.$scope.$on("destroy", this.destroy.bind(this));
    },
    defineScope: function () {

    },
    destroy: function () {

    }
});


BaseCtrl.$inject = ['$scope'];