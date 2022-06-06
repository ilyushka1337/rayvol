// Base
const path              = require('path');
const fs                = require('fs');
const gulp              = require('gulp');

// General
const sourcemaps        = require('gulp-sourcemaps');

// Scripts
const webpack           = require('webpack')
const webpackStream     = require('webpack-stream');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// Styles
const sass              = require('gulp-sass');
const autoprefixer      = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');

// Images
const tinypng 			= require('gulp-tinypng-compress');
const svgSprite 		= require('gulp-svg-sprites');
const replace 			= require('gulp-replace');
const cheerio 			= require('gulp-cheerio');

//HTML
const extender = require('@naourass/gulp-html-engine')

// Server
const server = require('gulp-server-livereload');

//FTP
const ftp = require( 'vinyl-ftp' );
const gutil = require( 'gulp-util' );

// Paths
const paths = {
    build:  path.join(__dirname, '.'),
    node:   path.join(__dirname, 'node_modules'),
    prod_build: path.join(__dirname, './prod_build'),
    src: {
        self:       path.join(__dirname, 'src'),
        js:         'src/js/',
        sass:       'src/scss/',
        images:     'src/images/',
        html:       'src/html/',
    },
    static: {
        self:       path.join(__dirname, 'static'),
        js:         'static/js/',
        css:        'static/css/',
        images:     'static/images/',
        html:       './'
    }
}

const {webpackProdPath, dev} = JSON.parse( fs.readFileSync( './dev-config.json' ) )
const ftpConfig = JSON.parse( fs.readFileSync( './ftp-config.json' ) )
const webpackConfig = {
    mode: "development",
    entry: {
        main: path.join(paths.src.self, "js", "script.js")
    },
    output: {
        path: __dirname + "/static/js/",
        publicPath: dev == 'local' ? "./" : webpackProdPath,
		filename: "static/js/[name].bundle.js",
		chunkFilename: 'static/js/[name].chunk.[contenthash].js',
        library: "[name]"
	},
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        modules: [
            paths.node,
            paths.src.self,
        ]
    },
    plugins:[
        new CleanWebpackPlugin()
    ]
}

const deploy = () => {
    const conn = ftp.create( {
        host: ftpConfig.host,
        port: ftpConfig.port,
        user: ftpConfig.user,
        password: ftpConfig.password,
        // log: gutil.log
    } );

    const globs = [
        path.join(paths.static.self, '/**')
    ]
 
    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( ftpConfig.remoteDist ) )
        .pipe( conn.dest( ftpConfig.remoteDist ) );
}
gulp.task('deploy', deploy)

gulp.task('html', function () {
    gulp.src(path.join(paths.src.html, '*.html'))
        .pipe(extender({annotations:false, verbose:false}))
        .pipe(gulp.dest(paths.static.html))
})

gulp.task('js', function() {
    gulp.src(path.join(paths.src.self, "js", "index.js"))
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest(paths.build));
});

gulp.task('js-build', function() {
    gulp.src(path.join(paths.src.self, "js", "index.js"))
		.pipe(webpackStream({
            ...webpackConfig,
            mode: 'production'
        }))
		.pipe(gulp.dest(paths.build));
});
  
gulp.task('sass', function () {
    gulp.src(path.join(paths.src.sass, "*.+(scss|sass|css)"))
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({cascade: false}))
    .pipe(sourcemaps.write("./", { sourceRoot: "/source/scss" }))
    .pipe(gulp.dest(paths.static.css))
});

gulp.task('sass-build', function () {
    gulp.src(path.join(paths.src.sass, "*.+(scss|sass|css)"))
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({cascade: false}))
    .pipe(cleanCss({
        level: {
            1: {
                specialComments: "none"
            },
            2: {
                mergeMedia: true,
                removeDuplicateRules: true,
                removeEmpty: true
            }
        }
    }))
    .pipe(gulp.dest(paths.static.css))
});

gulp.task('tinypng', function () {
	gulp.src(paths.src.images + '/*.{png,jpg,jpeg,gif}')
	.pipe(tinypng({
		key: 'odthLyLlVCQlfl9KLbpWcDBGEAqaBK8T',
		sigFile: paths.static.images + '/.tinypng-sigs'
	}))
	.pipe(gulp.dest(paths.static.images))
});

gulp.task('svg', function () {
	gulp
		.src(paths.src.images + '/*.svg')
		.pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
			parserOptions: { xmlMode: true }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(
            svgSprite({
                mode: "symbols",
                preview: false,
                selector: "%f",
                svg: {
                symbols: 'sprite.svg' 
            },
            transformData: function (data, config) {
                for(var i in data.svg) {
                    var result = data.svg[i].data.match(/path id="([a-z]+)"/ig );
                    if (null !== result) {
                        for(var j in result) {
                            var regexp = /\"([a-z]+)\"/i;
                            var matches = regexp.exec(result[j]);
                            matches[0] = matches[0].replace(/\"/g, '');

                            var k = 0;

                            var regexp = new RegExp('(path id\=\"|xlink\:href\=\"#)('+matches[0]+'){1}', 'g');
                            data.svg[i].data = data.svg[i].data.replace(regexp, function(str, p1, p2, offset, s)
                                {
                                    return p1 + "" + i + "" + j + "" + p2;
                                });
                        }
                    }
                }
                return data;
            },
        }
        ))
        .pipe(replace('NaN ', '-'))
        .pipe(gulp.dest(paths.static.images))
});

gulp.task('static-svg', function () {
	gulp
		.src(paths.src.images + '/static/*.svg')
        .pipe(replace('&gt;', '>'))
        .pipe(
            svgSprite({
                mode: "symbols",
                preview: false,
                selector: "%f",
                svg: {
                symbols: 'static-sprite.svg' 
            },
            transformData: function (data, config) {
                for(var i in data.svg) {
                    var result = data.svg[i].data.match(/path id="([a-z]+)"/ig );
                    if (null !== result) {
                        for(var j in result) {
                            var regexp = /\"([a-z]+)\"/i;
                            var matches = regexp.exec(result[j]);
                            matches[0] = matches[0].replace(/\"/g, '');

                            var k = 0;

                            var regexp = new RegExp('(path id\=\"|xlink\:href\=\"#)('+matches[0]+'){1}', 'g');
                            data.svg[i].data = data.svg[i].data.replace(regexp, function(str, p1, p2, offset, s)
                                {
                                    return p1 + "" + i + "" + j + "" + p2;
                                });
                        }
                    }
                }
                return data;
            },
        }
        ))
        .pipe(replace('NaN ', '-'))
        .pipe(gulp.dest(paths.static.images))
});

gulp.task('watch', function () {
    if (dev == 'remote')
        gulp.watch(path.join(__dirname, 'static/**/*'), ['deploy'])

	gulp.watch(path.join(paths.src.js,      "**/*.+(js|ts)"), ["js"]);
	gulp.watch(path.join(paths.src.sass,    "**/*.+(scss|sass)"), ["sass"]);
	
	gulp.watch([paths.src.images + '/*.{png,jpg,jpeg}'], ['tinypng']);
	gulp.watch([paths.src.images + '/*.svg'], ['svg']);
	gulp.watch([paths.src.images + '/static/*.svg'], ['static-svg']);
    gulp.watch(path.join(paths.src.html, '**/*.html'), ['html']);
});


gulp.task('default', ['watch', 'js']);
gulp.task('build', ['js-build', 'sass-build']);