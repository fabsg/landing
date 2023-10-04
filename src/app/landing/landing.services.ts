import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Landing } from './landing.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LandingService {
  constructor(
    @InjectRepository(Landing)
    private landingRepository: Repository<Landing>,
  ) {}

  async fetchData(): Promise<Landing[]> {
    return this.landingRepository.find();
  }
}