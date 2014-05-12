module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-express-server');
  return {
    options: {
      port: 8080
    },
    dev: {
      options: {
        script: 'server.js'
      }
    }/*,
    prod: {
      options: {
        script: 'build/server.js'
      }
    }*/
  };
};
