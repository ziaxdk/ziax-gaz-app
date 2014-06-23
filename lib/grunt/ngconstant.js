module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ng-constant');
  var dev = require('../../_config.json').dev;
      prod = require('../../_config.json').prod;

  return {
    dev: {
      options: {
        name: 'ziaxgazapp.constants',
        dest: 'www/js/constants.js'
      },
      constants: {
        FINALS: {
          host: dev.host
        }
      }
    },
    prod: {
      options: {
        name: 'ziaxgazapp.constants',
        dest: 'build/www/js/constants.js'
      },
      constants: {
        FINALS: {
          host: prod.host
        }
      }
    }
  };
};