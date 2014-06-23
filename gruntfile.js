module.exports = function(grunt) {
  var shelljs = require('shelljs'),
      
      path = require('path'),
      mExpress = require('./lib/grunt/express.js')(grunt),
      mConcurrent = require('./lib/grunt/concurrent.js')(grunt),
      mWatch = require('./lib/grunt/watch.js')(grunt),
      mWeinre = require('./lib/grunt/weinre.js')(grunt),
      mCopy = require('./lib/grunt/copy.js')(grunt),
      mClean = require('./lib/grunt/clean.js')(grunt),
      mHttp = require('./lib/grunt/http.js')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: mClean,
    copy: mCopy,
    weinre: mWeinre,
    concurrent: mConcurrent,
    express: mExpress,
    watch: mWatch,
    http: mHttp

  });

  grunt.registerTask('default', [ ]);
  grunt.registerTask('dev', [ 'express:dev', 'weinre:dev', 'watch' ]);
  grunt.registerTask('build', [ 'clean:build', 'copy:build'  ]);
  grunt.registerTask('prod', [ 'express:prod', 'weinre:dev', 'watch' ]);
  grunt.registerTask('deploy', [ 'build', 'gitcommit', 'http:buildphonegap' ]);

  // $ curl -u andrew.lunny@nitobi.com -X POST -d '' https://build.phonegap.com/api/v1/apps/12/build
  grunt.registerTask('gitcommit', function () {
    // buildno = shelljs.exec('git rev-parse --short HEAD', { silent: true }).output.replace('\n', '');
    // grunt.log.writeln('build is', buildno);
    // grunt.config('buildno', buildno);
    shelljs.cd('build');
    shelljs.exec('git add -A .');
    shelljs.exec('git commit -m "wip"');
    shelljs.exec('git push origin master');
  });

};