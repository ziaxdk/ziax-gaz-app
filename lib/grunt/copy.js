module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  return {
    build: {
      files: [
        {
          expand: true,
          src: ['www/*'],
          dest: 'build',
          filter: 'isFile'
        },
        {
          expand: true,
          src: [ 'www/img/**/*', 'www/js/**/*', 'www/res/**/*', 'www/tmpl/**/*' ],
          dest: 'build'
        },
        {
          expand: true,
          src: [ 'www/bower_components/ionic/release/**/*', 'www/bower_components/lodash/**/*' ],
          dest: 'build'
        }
      ]
    }
  };
};
