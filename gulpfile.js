// importar las funciones necesarias de gulp
const {src, dest, watch, parallel} = require("gulp");

// dependencias para css
const sass = require("gulp-sass")(require("sass")) // compilar sass
const plumber = require("gulp-plumber"); // evita que la compilacion se detenga por errores
const postcss = require("gulp-postcss"); // trabaja con cssnano y autofrefixer
const autoprefixer = require("autoprefixer"); // agrega los prefijos a css para dar mayor soporte
const cssnano = require("cssnano"); // minifica el archivo css para que pese menos

// dependencias para imagenes
const cache = require('gulp-cache'); // almacena las imagenes en la cache
const webp = require('gulp-webp'); // convierte imagenes a webp
const imagemin = require('gulp-imagemin'); // minifica el tamaño de las imagenes
const avif = require('gulp-avif'); // convierte imagenes a avif

// dependencias para js
const terser = require('gulp-terser-js');

// convertir imagenes a webp
function versionWebp(done) {
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}

// aligerar imagenes
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

// convertir imagenes a avif
function imagenesAvif(done) {
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}

// compilar sass
function css(done) {
    const plugins = [
        autoprefixer(),
        cssnano()
    ]

    src('src/scss/**/*.scss') // ubicamos el archivo de scss a compilar
       .pipe(plumber()) // evitamos que se cierre la compilacion por errores
       .pipe(sass()) // compilamos sass
       .pipe(postcss(plugins)) // optimizamos el codigo css
       .pipe(dest('build/css')) // lo guardamos en la ubicacion deseada

    done();
}

// optimizar codigo javascript
function js(done) {
src('src/js/**/*.js') // ubicamos el archivo de js a compilar
      .pipe(terser()) // optimizamos el codigo js
      .pipe(dest('build/js')) // lo guardamos en la ubicacion deseada

    done();
}

// funcion que esta a la escucha de los cambios en las funciones css y js
function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);

    done();
}

// ejecutar las funciones por default en paralelo
exports.css = css;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.imagenesAvif = imagenesAvif;
exports.js = js; 
exports.dev = dev;
exports.default = parallel(css, versionWebp, imagenes, imagenesAvif, js, dev);
