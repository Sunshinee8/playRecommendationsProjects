import { NestFactory } from '@nestjs/core';
import { MySqlModule } from './mysql.module';

async function bootstrap() {
  const app = await NestFactory.create(MySqlModule);
  app.setGlobalPrefix('api'); // ← 添加全局前缀
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
