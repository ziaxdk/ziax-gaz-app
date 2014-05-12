module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-concurrent');
  return {
    dev: {
      // tasks: ['weinre', 'nodemon', 'node-inspector', 'watch'],
      tasks: [ 'weinre:dev' ],
      options: {
        logConcurrentOutput: false
      }
    }
  };
};