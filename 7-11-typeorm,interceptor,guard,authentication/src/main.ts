import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require("cookie-session")

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ["aslkdjalsd"]
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // to make sure that the coming requests doesn't have extra properties we don't need (ex: user has email and pass only in the body >>> ignore extra properties if exist for security)
  }))
  await app.listen(3000);
}
bootstrap();
