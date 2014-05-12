module.exports = function(grunt) {
  var path = require('path'),
      mExpress = require('./lib/grunt/express.js')(grunt),
      mConcurrent = require('./lib/grunt/concurrent.js')(grunt),
      mWatch = require('./lib/grunt/watch.js')(grunt),
      mWeinre = require('./lib/grunt/weinre.js')(grunt);


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    weinre: mWeinre,
    concurrent: mConcurrent,
    express: mExpress,
    watch: mWatch
  });
  
  grunt.registerTask('default', [ ]);
  grunt.registerTask('dev', [ 'express:dev', 'weinre:dev', 'watch' ]);
};