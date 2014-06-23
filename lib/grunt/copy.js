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
          src: [
            'www/bower_components/ionic/release/css/ionic.css',
            'www/bower_components/ionic/release/js/ionic.bundle.js',
            'www/bower_components/ionic/release/fonts/*',
            'www/bower_components/lodash/dist/lodash.js',

            'www/css/style.css'
          ],
          dest: 'build'
        }
      ]
    }
  };
};
