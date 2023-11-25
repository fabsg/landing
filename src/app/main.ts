import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmailSchedulerService } from './emailScheduler/emailScheduler.services';
import { config } from 'dotenv';
import * as fs from 'fs';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH)
    }
  });
  await app.listen(process.env.APPLICATION_PORT);

  const emailSchedulerService = app.get(EmailSchedulerService);
  emailSchedulerService.sendEmailWithCSV();
}
bootstrap();
