module.exports = function(grunt) {
  var path = require('path'),
      mExpress = require('./lib/grunt/express.js')(grunt);


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    weinre: {
      dev: {
      options: {
          httpPort: 8082,
          boundHost: '-all-'
        }
      }
    },

    concurrent: {
      dev: {
        // tasks: ['weinre', 'nodemon', 'node-inspector', 'watch'],
        tasks: [ 'weinre:dev' ],
        options: {
          logConcurrentOutput: false
        }
      }
    },

    express: mExpress,

    watch: {
      express: {
        files:  [ 'server.js', 'server/**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-weinre');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', [ ]);
  grunt.registerTask('dev', [ 'express:dev', 'weinre:dev', 'watch' ]);
};