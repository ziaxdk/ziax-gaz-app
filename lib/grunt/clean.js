module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  return {
    build: [ "build/www/**" ]
  };
};