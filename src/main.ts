import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: true }));

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
