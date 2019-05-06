// referenced tutorial: https://amitd.co/blog/node-cache-example
let nodeCache = require('node-cache');
let cache = null;

exports.start = function(done) {
    if (cache) return done();

    cache = new nodeCache();
}

exports.instance = function() {
    return cache;
}
