import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingController } from './landing/landing.controller';
import { Landing } from './landing/landing.entity';
import { LandingService } from './landing/landing.services';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailSchedulerService } from './emailScheduler/emailScheduler.services';
import { ExcelService } from './excel/excel.services';
import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'frontend', 'assets'),
      serveRoot: '/assets',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'frontend'),
      serveRoot: '/',
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'landing.db',
      entities: [Landing],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Landing]),
  ],
  controllers: [AppController, LandingController],
  providers: [ExcelService, LandingService, EmailSchedulerService],
  exports: [ExcelService, LandingService]
})
export class AppModule {}
