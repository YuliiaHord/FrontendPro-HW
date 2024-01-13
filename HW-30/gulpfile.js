const {parallel, series, src, dest, watch} = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("sass");
const gulpSass = require("gulp-sass");
const scss = gulpSass(sass);
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const ssi = require("gulp-ssi");
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const APP_PATH = "./app/";
const BUILD_PATH = "./dist/";
const SCRIPT_PATH = `${APP_PATH}scripts/`;
const STYLES_PATH = `${APP_PATH}styles/`;
const IMAGES_PATH = `${APP_PATH}images/src/`

function cleanDist() {
    return src(`${BUILD_PATH}**/*`, {force: true}).pipe(clean());
}

function html() {
    return src(`${APP_PATH}*.html`)
        .pipe(ssi())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest(`${BUILD_PATH}`));
}

function images() {
    return src(`${APP_PATH}images/*`)
        .pipe(newer(`${BUILD_PATH}img`))
        .pipe(imagemin())
        .pipe(dest(`${BUILD_PATH}img`));
}

function styles() {
    return src(`${STYLES_PATH}*.scss`)
        .pipe(scss({outputStyle: "compressed"}))
        .pipe(rename({extname: ".min.css"}))
        .pipe(dest(`${BUILD_PATH}css`));
}

function scripts() {
    return src([`${SCRIPT_PATH}utils/*.js`, `${SCRIPT_PATH}*.js`])
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            }),
        )
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(rename({extname: ".min.js"}))
        .pipe(dest(`${BUILD_PATH}js`));
}

function watcher() {
    watch(`${SCRIPT_PATH}*.js`, scripts).on("change", reload);
    watch(`${SCRIPT_PATH}utils/*.js`, scripts).on("change", reload);
    watch(`${STYLES_PATH}*.scss`, styles).on("change", reload);
    watch(`${APP_PATH}*.html`, html).on("change", reload);
    watch(`${IMAGES_PATH}*`, images).on("change", reload);
}

function browserSyncStart() {
    browserSync.init({
        server: {
            baseDir: BUILD_PATH,
        }
    });
}

exports.build = series(cleanDist, html, styles, images, scripts);
exports.default = series(html, styles, images, scripts, parallel(watcher, browserSyncStart));