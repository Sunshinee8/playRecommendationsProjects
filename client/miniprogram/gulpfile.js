const gulp = require('gulp');

gulp.task('dev', () => {
  console.log('\x1b[36m%s\x1b[0m', '🚀 启动实时监听模式...');
  
  // 修正基础路径配置
  const basePath = './';
  
  // 初始化文件同步（排除dist目录）
  gulp.src(['**/*', '!node_modules/**', '!dist/**'])
    .pipe(gulp.dest('./dist'));

  // 添加文件监听（排除dist目录）
  const watcher = gulp.watch(['**/*.{wxml,wxss,js,json}', '!node_modules/**', '!dist/**']);
  
  watcher.on('change', (path) => {
    console.log('\x1b[33m%s\x1b[0m', `🔄 检测到文件变更: ${path}`);
    gulp.src(path, { base: basePath })  // 保持基础路径一致
      .pipe(gulp.dest('./dist'));
  });

  return watcher;
});