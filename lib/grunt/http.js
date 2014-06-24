module.exports = function(grunt) {
  var pg = require('../../_config.json').buildpg;

  grunt.loadNpmTasks('grunt-http');

  return {
    // Currently not used
    'buildphonegap': {
      options: {
        url: 'https://build.phonegap.com/api/v1/apps/' + pg.id + '/build?auth_token=' + pg.auth_token,
        method: 'POST'
      }
    },
    'pulllatest': {
      options: {
        url: 'https://build.phonegap.com/api/v1/apps/' + pg.id + '?auth_token=' + pg.auth_token,
        method: 'PUT',
        // body: 'data={"pull":"true"}'
        form: {
          data: '{"pull":"true"}'
        }
      }
    }
  };
};
 // $ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"pull":"true"}' https://build.phonegap.com/api/v1/apps/8