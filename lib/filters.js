'use strict';

exports.filters = {
    nojs: function(node) {
        if (node && node.prev && node.prev.attribs) {
            if (node.prev.attribs.type !== "text/javascript") {
                return node;
            } else {
                return undefined;
            }
        } else {
            return node;
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
