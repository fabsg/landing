import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailSchedulerService } from '../emailScheduler/emailScheduler.services';
import { Landing } from './landing.entity';

@Controller('landing')
export class LandingController {
    constructor(
    @InjectRepository(Landing)
    private readonly landingRepository: Repository<Landing>,
    private emailService: EmailSchedulerService
    ) {}

    @Post()
    async create(@Body() landingData: Landing): Promise<Landing> {
        const landing = this.landingRepository.create(landingData);
        await this.emailService.sendEmailToCustomer(landing);
        return await this.landingRepository.save(landing);
    }
}