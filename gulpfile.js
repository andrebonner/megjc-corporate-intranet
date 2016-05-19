(function(){
    var gulp = require('gulp'),
        inject = require('gulp-inject'),
        plumber = require('gulp-plumber'),
        jshint = require('gulp-jshint'),
        notify = require('gulp-notify'),
        watch = require('gulp-watch'),
        es = require('event-stream'),
        //concat = require('gulp-concat'),
        //rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        runSequence = require('run-sequence'),
        filesort = require('gulp-angular-filesort'),
        paths = {
            sources:{
              all:['./src/**/*.css', './src/app/modules/**/*.module.js', './src/app/modules/**/*.controller.js'],
              js: ['./src/app/modules/**/*.module.js', './src/app/modules/**/*.controller.js'],
              css: ['./src/**/*.css']
            },
            watch_folders: ['./src/**/**/*'],
            public: ['./public/app/**/**/*.module.js', './public/app/**/**/*.controller.js'],
            inject_target: './index.html',
            dest: { public: './public', root: './', temp: './temp' }
        },
        onError = function(err){
          console.log(err);
        };
    /**
     * Run default tasks
     * @param  {[type]} 'default'       Default gulp task
     * @param  {[type]} 'watch-folder' Callback function
     * @param  {[type]} 'jshint'       Callback function
     */
    gulp.task('default', ['watch-folder', 'jshint']);
    /**
     * Inject angularjs files into index page
     * @param  {[type]} 'inject-files' Gulp task identifier
     * @param  {[type]} callback func  Anon callback function
     * @return {[type]}                [description]
     */
    gulp.task('inject-files', function(){
        var target = gulp.src(paths.inject_target),
            sources = gulp.src(paths.public, {read: false});
        return target
                .pipe(inject(sources))
                .pipe(gulp.dest(paths.dest.root));
      });
      /**
       * Minify and concatenate javascript files
       * @param  {[type]} 'minify-js' [description]
       * @param  {[type]} function(   [description]
       * @return {[type]}             [description]
       */
      gulp.task('minify-js', function(){
          return gulp.src(paths.public)
                    .pipe(concat('app.js'))
                    .pipe(gulp.dest('./public/dist'))
                    .pipe(rename('app.min.js'))
                    .pipe(uglify())
                    .pipe(gulp.dest('./public/dist'));
      });
      /**
       * JavaScript file linting
       * @param  {[type]} 'jshint'  Gulp task identifier
       * @param  {[type]} callback func  Anon callback function
       * @return {[type]}           [description]
       */
      gulp.task('jshint', function() {
        	return gulp.src(paths.sources.js)
                    	.pipe(plumber({
                    		errorHandler: onError
                    	}))
                  	.pipe(jshint())
                  	.pipe(jshint.reporter('default'));
        });
    /**
     * Watches source folder for file changes.
     * @param  {[type]} 'watch-folder' Gulp task identifier
     * @param  {[type]} callback func  Anon callback function
     * @return {[type]}                [description]
     */
    gulp.task('watch-folder', function(){
        return gulp.src(paths.watch_folders, { base: './src'})
                   .pipe(watch(paths.watch_folders, {base: './src'}))
                   .pipe(gulp.dest(paths.dest.public));
    });
    /**
     * Watching folders and execute gulp tasks
     * @param  {[type]} 'watch'   [description]
     * @param  {[type]} cb funct  Anon cb function
     * @return {[type]}           [description]
     */
    gulp.watch('watch', function(){
        gulp.watch(paths.sources.js, ['watch-folder', 'jshint']);
    });
})();
