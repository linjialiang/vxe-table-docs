const gulp = require('gulp')
const del = require('del')
const rename = require('gulp-rename')

gulp.task('move_docs_static', () => {
  return gulp.src([
    'v4/dist/static/**'
  ])
    .pipe(gulp.dest('v4/dist/v4/static'))
})

gulp.task('move_docs_root', () => {
  return gulp.src([
    'v4/dist/favicon.ico',
    'v4/dist/index.html',
    'v4/dist/issues.html',
    'v4/dist/logo.png'
  ])
    .pipe(gulp.dest('v4/dist/v4'))
})

gulp.task('clear_docs_temp', () => {
  return del([
    'docs'
  ], { force: true })
})

gulp.task('move_docs_latest', gulp.series('clear_docs_temp', () => {
  return gulp.src([
    'v4/dist/v4/404.html'
  ])
    .pipe(gulp.dest('v4/dist'))
}))

gulp.task('build_v4_docs', gulp.parallel('move_docs_static', 'move_docs_root'))

gulp.task('copy_v1_docs', () => {
  return gulp.src('v4/dist/v1/index.html')
    .pipe(rename({
      basename: '404'
    }))
    .pipe(gulp.dest('v4/dist/v1'))
})

gulp.task('copy_v2_docs', () => {
  return gulp.src('v4/dist/v2/index.html')
    .pipe(rename({
      basename: '404'
    }))
    .pipe(gulp.dest('v4/dist/v2'))
})

gulp.task('copy_v3_docs', () => {
  return gulp.src('v4/dist/v3/index.html')
    .pipe(rename({
      basename: '404'
    }))
    .pipe(gulp.dest('v4/dist/v3'))
})

gulp.task('copy_docs_index', gulp.parallel('copy_v1_docs', 'copy_v2_docs', 'copy_v3_docs', () => {
  return gulp.src('v4/dist/v4/index.html')
    .pipe(rename({
      basename: '404'
    }))
    .pipe(gulp.dest('v4/dist/v4'))
}))

gulp.task('build_docs', gulp.series('build_v4_docs', 'copy_docs_index', 'move_docs_latest', () => {
  return gulp.src([
    'v4/dist/**'
  ])
    .pipe(gulp.dest('docs'))
}))

gulp.task(
  'copy_docs_index_a2',
  gulp.parallel('copy_v3_docs', () => {
    return gulp
      .src('v4/dist/v4/index.html')
      .pipe(
        rename({
          basename: '404',
        }),
      )
      .pipe(gulp.dest('v4/dist/v4'));
  }),
);

gulp.task(
  'build_docs_a2',
  gulp.series('build_v4_docs', 'copy_docs_index_a2', 'move_docs_latest', () => {
    return gulp.src(['v4/dist/**']).pipe(gulp.dest('docs'));
  }),
);
