#!/usr/bin/env node
'use strict';

const request = require('request');
const walkers = require('walkers');
const htmlparser = require('htmlparser2');
const _ = require('lodash');
const filters_lib = require('../lib/filters.js');
var program = require('commander');

program
    .version('0.0.1')
    .option('-w, --word [string]', 'Count Word Instance')
    .option('-u, --url [string]', 'URL to crawl')
    .parse(process.argv);

console.log(program.url);

var crawlFilters = {

    filters: [],
    register: function(filter) {
        this.filters.push(filter);
    },
    filter: function(node) {
        _.each(this.filters, function(value) {
            node = value(node);
        });
        return node;
    }
};

crawlFilters.register(filters_lib.filters.nojs);
crawlFilters.register(filters_lib.filters.nocomments);
crawlFilters.register(filters_lib.filters.noempty);

var count = 0;
request({url: program.url}, function(error, response, body) {

    if(!error && response.statusCode == 200) {

        var handler = new htmlparser.DomHandler(function(error, dom) {
            if(error) console.log(error);
            else {
                walkers.walk(dom, true, function(node) {
                    node = crawlFilters.filter(node);
                    if(node){
                        var tokens = node.data.replace(/\s+/g, ' ').split(' ');
                        count += _.filter(tokens, function(t) { return t.toLowerCase() === program.word.toLowerCase()}).length;
                    }
                });
            }
        });
        var parser = new htmlparser.Parser(handler);
        parser.write(body);
        parser.done();
        console.log(`Instances of the word ${program.word} at ${program.url}: ${count}`);
    }
});