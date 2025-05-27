const gulp = require('gulp');
const del = require('del');
const mkdirp = require('mkdirp');
const zip = require('gulp-zip');
const ts = require('gulp-typescript');

// 新增TypeScript项目配置
const tsProject = ts.createProject('tsconfig.json');

// 修改dev任务配置
gulp.task('dev', () => {
  console.log('\x1b[36m%s\x1b[0m', '🚀 启动实时监听模式...');
  process.env.NODE_ENV = 'development'
  
  // 删除旧dist目录（新增）
  del.sync('./dist');
  
  // 仅处理非TS文件（更新匹配规则）
  gulp.src([
    'src/**/*', 
    '!src/**/*.ts', 
    '!node_modules/**', 
    '!dist/**'
  ]).pipe(gulp.dest('./dist'));

  // TS编译流程（保持现有）
  const tsResult = gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('dist'));

  // 更新监听配置（新增文件类型过滤）
  const watcher = gulp.watch(['src/**/*.{ts,wxml,wxss,json}'], { 
    ignored: [
      'node_modules/**', 
      'dist/**',
      '**/*.js'  // 新增JS文件过滤
    ] 
  });
  
  watcher.on('change', (path) => {
    console.log('\x1b[33m%s\x1b[0m', `🔄 检测到文件变更: ${path}`);
    if(path.endsWith('.ts')) {
      // 处理TS编译
      gulp.src(path, { base: 'src' })
        .pipe(tsProject())
        .pipe(gulp.dest('dist'))
        .on('end', () => {
          // 编译完成后删除生成的JS文件（新增）
          del.sync(path.replace('src/', 'dist/').replace('.ts', '.js'));
        });
    } else {
      // 处理其他文件
      gulp.src(path, { base: 'src' })
        .pipe(gulp.dest('dist'));
    }
  });

  return watcher;
});

gulp.task( 'prod', () => {
  console.log('\x1b[36m%s\x1b[0m', '🚀 启动实时监听模式...');
   process.env.NODE_ENV = 'production'
  // 修改基础路径为src目录
  const basePath = 'src';
  
  // 初始化文件同步（仅处理src目录）
  gulp.src(['src/**/*', '!node_modules/**', '!dist/**'])
    .pipe(gulp.dest('./dist'));

  // 添加文件监听（仅监听src目录）
  const watcher = gulp.watch(['src/**/*.{wxml,wxss,js,json}', '!node_modules/**', '!dist/**']);
  
  watcher.on('change', (path) => {
    console.log('\x1b[33m%s\x1b[0m', `🔄 检测到文件变更: ${path}`);
    gulp.src(path, { base: basePath })  // 保持src目录结构
      .pipe(gulp.dest('./dist'));
  });

  return watcher;
});

// build任务

// 清理构建目录
gulp.task('clean', () => {
  console.log('\x1b[36m%s\x1b[0m', '🧹 清理构建目录...'); // 青色文字
  return del('./build');
});

// 创建构建目录
gulp.task('createDir', (done) => {
  mkdirp.sync('./build');
  done();
});

// 复制文件
gulp.task('copyFiles', () => {
  console.log('\x1b[32m%s\x1b[0m', '📁 复制项目文件...');
  return gulp.src(['src/app.*', 'src/**/*', 'project.config.json'], { base: 'src' })
    .pipe(gulp.dest('./build'));
});

// 新增压缩插件
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

// 压缩任务
// 修改后的压缩任务
gulp.task('minify', () => {
  return gulp.src(['build/**/*.js', 'build/**/*.css', 'build/**/*.wxml'], { read: false })
    .pipe(gulp.dest('./build')); // 跳过压缩步骤
});

// 取消注释compress任务
gulp.task('compress', () => {
  return gulp.src('build/**/*')
    .pipe(zip(`build-${Date.now()}.zip`))
    .pipe(gulp.dest('./dist'));
});

// 更新构建任务链（保持任务顺序）
// 修改build任务链
gulp.task('build', gulp.series(
  'clean',
  'createDir',
  // 新增编译步骤
  () => tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('build')),
  'copyFiles', 
  'minify',
  'compress'
));