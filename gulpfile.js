"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var connect = require("gulp-connect");
var runSequence = require("run-sequence");
var mocha = require("gulp-mocha");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var pkg = require("./package.json");
var config = pkg.projectConfig;
var webpackConfig = require("./webpack.config.js");

//
// HELPER TASKS
//

gulp.task("clean", function(done) {
    require("del")([
        config.dirs.dist
    ], done);
});

gulp.task("copy", [
    "copy:src",
    "copy:normalize"
]);

gulp.task("copy:src", function() {
    return gulp.src(config.dirs.src + "/**.html")
               .pipe(gulp.dest(config.dirs.dist));
});

gulp.task("copy:normalize", function() {
    return gulp.src("node_modules/normalize.css/normalize.css")
               .pipe(gulp.dest(config.dirs.vendor + "/css"));
});

gulp.task("test", function() {
    return gulp.src("test/**.js", {read: false})
        // gulp-mocha needs filepaths so you can"t have any plugins before it
        .pipe(mocha());
});

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(require("./webpack.config.js"), function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var webpackDevConfig = Object.create(webpackConfig);
    webpackDevConfig.debug = true;

    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, webpackConfig.devServer).listen(5000, "0.0.0.0", function(err) {
        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:5000/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task("connect", function() {
    connect.server({
        root: config.dirs.dist,
        port: 5000
    });
});

//
// MAIN TASKS
//

gulp.task("build", function(done) {
    runSequence(
        "clean",
        "copy",
        "webpack",
        "test",
    done);
});

gulp.task("default", function(done) {
    runSequence(
        "build",
        "webpack-dev-server",
    done);
});
