var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , open = require('gulp-open');
 
gulp.task('start-server', function () {
  nodemon({ script: './app/js/server/main.js'
	  , args: ['local']
          , ext: 'html js' })
    .on('restart', function () {
      console.log('restarted!')
    })
    .on('start', function () {
      gulp.src('')
		.pipe(open({uri: 'http://localhost:3000'}));
    })
})

gulp.task('default', ['start-server']);
