window.namespace = function(namespaces){
    'use strict';
    var names = namespaces.split('.');
    var last  = window;
    var name  = null;
    var i     = null;

    for(i in names){
        name = names[i];

        if(last[name]===undefined){
            last[name] = {};
        }

        last = last[name];
    }
    return last;
}