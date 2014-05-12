module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  return {
    express: {
      files:  [ 'server.js', 'server/**/*.js' ],
      tasks:  [ 'express:dev' ],
      options: {
        nospawn: true //Without this option specified express won't be reloaded
      }
    }
  };
};