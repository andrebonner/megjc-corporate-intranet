(function(){
  var gulp = require('gulp'),
      jshint = require('gulp-jshint'),
      inject = require('gulp-inject'),
      configs = {
        src_dirs: ['./src/app/**/**/*.module.js', './src/app/**/**/*.controller.js'],
        default_tasks : ['jshint','watch', 'inject-files'],
        watch_tasks: ['jshint', 'inject-files'],
        inject_target: './index.html',
        root_dir: './'
      };
      /**
       * Default gulp task
       * @param  {[type]} 'default' [description]
       * @param  {[type]} ['jshint' [description]
       * @param  {[type]} 'watch']  [description]
       * @return {[type]}           [description]
       */
      gulp.task('default', configs.default_tasks);
      /**
       * Checks JavaScript files for errors
       * @param  {[type]} 'jshint'  [description]
       * @param  {[type]} function( [description]
       * @return {[type]}           [description]
       */
      gulp.task('jshint', function(){
        return gulp.src(configs.src_dirs)
                .pipe(jshint())
                .pipe(jshint.reporter('default'));
      });
      /**
       * Inject JavaScript files into index page
       * @param  {[type]} 'inject-files' [description]
       * @param  {[type]} function(      [description]
       * @return {[type]}                [description]
       */
      gulp.task('inject-files', function(){
        var target = gulp.src(configs.inject_target),
            sources = gulp.src(configs.src_dirs, {read: false});
        return target
                .pipe(inject(sources))
                .pipe(gulp.dest(configs.root_dir));
      });
      /**
       * Functions called once changes in JS files detected.
       * @param  {[type]} 'watch'   [description]
       * @param  {[type]} function( [description]
       * @return {[type]}           [description]
       */
      gulp.task('watch', function(){
           gulp.watch(configs.src_dirs, configs.watch_tasks);
      });
})();
