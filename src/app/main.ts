import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { EmailSchedulerService } from './emailScheduler/emailScheduler.services';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  //const emailSchedulerService = app.get(EmailSchedulerService);
  //emailSchedulerService.sendEmailWithCSV();
  await app.listen(process.env.APPLICATION_PORT);
}
bootstrap();
