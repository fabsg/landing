import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Landing } from './landing.entity';

@Controller('landing')
export class LandingController {
    constructor(
    @InjectRepository(Landing)
    private readonly landingRepository: Repository<Landing>,
    ) {}

    @Post()
    async create(@Body() landingData: Landing): Promise<Landing> {
        const landing = this.landingRepository.create(landingData);
        return await this.landingRepository.save(landing);
    }
}