const gulp = require('gulp');

gulp.task('dev', () => {
  console.log('\x1b[36m%s\x1b[0m', '🚀 启动实时监听模式...');
  
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