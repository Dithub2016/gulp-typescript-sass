const
    gulp = require('gulp'),
    ts = require('gulp-typescript');

const
    sass = require('gulp-sass'),
    //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css');

const
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
 
gulp.task('sass', function () {
    return gulp.src('src/main.sass')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream: true}));
});

gulp.task('tsTojs', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('serve', ['sass', 'tsTojs'], function () {

    // 从这个项目的根目录启动服务器
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/**/*.scss", ['sass']);
    gulp.watch("src/**/*.ts", ['tsTojs']);
    gulp.watch("*.html").on("change", reload);
    gulp.watch("src/**/*.js").on("change", reload);
});
