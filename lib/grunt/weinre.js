module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-weinre');
  return {
    dev: {
    options: {
        httpPort: 8082,
        boundHost: '-all-'
      }
    }
  };
};