module.exports = function(grunt) {
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
