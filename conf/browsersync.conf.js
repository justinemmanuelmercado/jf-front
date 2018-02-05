const conf = require('./gulp.conf');

module.exports = function () {
  return {
    ghostMode: false,
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ]
    },
    open: false
  };
};
