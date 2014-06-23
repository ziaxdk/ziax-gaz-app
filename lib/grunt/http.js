module.exports = function(grunt) {
  var pg = require('../../_config.json').buildpg;

  grunt.loadNpmTasks('grunt-http');

  return {
    'buildphonegap': {
      options: {
        url: 'https://build.phonegap.com/api/v1/apps/' + pg.id + ' /build?auth_token=' + pg.auth_token,
        method: 'POST'
      }
    }
  };
};