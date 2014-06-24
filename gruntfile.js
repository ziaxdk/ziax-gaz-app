module.exports = function(grunt) {
  var shelljs = require('shelljs'),
      
      path = require('path'),
      mExpress = require('./lib/grunt/express.js')(grunt),
      mConcurrent = require('./lib/grunt/concurrent.js')(grunt),
      mWatch = require('./lib/grunt/watch.js')(grunt),
      mWeinre = require('./lib/grunt/weinre.js')(grunt),
      mCopy = require('./lib/grunt/copy.js')(grunt),
      mClean = require('./lib/grunt/clean.js')(grunt),
      mHttp = require('./lib/grunt/http.js')(grunt),
      mNgConstant = require('./lib/grunt/ngconstant.js')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: mClean,
    copy: mCopy,
    weinre: mWeinre,
    concurrent: mConcurrent,
    express: mExpress,
    watch: mWatch,
    http: mHttp,
    ngconstant: mNgConstant

  });

  grunt.registerTask('default', [ ]);
  grunt.registerTask('dev', [ 'ngconstant:dev', 'express:dev', 'weinre:dev', 'watch' ]);
  grunt.registerTask('build', [ 'clean:build', 'copy:build'  ]);
  grunt.registerTask('prod', [ 'express:prod', 'weinre:dev', 'watch' ]);
  grunt.registerTask('deploy', [ 'build', 'ngconstant:prod', 'gitcommit', 'http:pulllatest' ]);

  grunt.registerTask('gitcommit', function () {
    shelljs.cd('build');
    shelljs.exec('git add -A .');
    shelljs.exec('git commit -m "grunt build"');
    shelljs.exec('git push origin master');
  });

};