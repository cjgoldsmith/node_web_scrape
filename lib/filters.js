'use strict';

exports.filters = {
    nojs: function(node) {
        if(node && node.prev && node.prev.attribs && node.prev.attribs.type !== "text/javascript") {
            return node;
        } else {
            return undefined;
        }
    },
    nocomments: function(node) {
        if(node && node.type !== "comment"){
            return node;
        } else {
            return undefined;
        }
    },
    noempty: function(node) {
        if(node && node.data && node.data.replace(/\s+/g, '')) {
            return node;
        } else {
            return undefined;
        }
    }
};
