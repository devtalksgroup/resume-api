import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sample } from '../entities/sample.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { UpdateSampleDto } from '../dto/update-sample.dto';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
  ) {}

  async create(createSampleDto: CreateSampleDto): Promise<Sample> {
    const newSample = this.sampleRepository.create(createSampleDto);
    return await this.sampleRepository.save(newSample);
  }

  async findAll() {
    return await this.sampleRepository.find();
  }

  async findOne(id: number) {
    const sample = await this.sampleRepository.findOne({ where: { id } });

    if (!sample) {
      throw new NotFoundException();
    }

    return sample;
  }

  async update(id: number, updateSampleDto: UpdateSampleDto) {
    const sample = await this.findOne(id);

    if (!sample) {
      throw new NotFoundException();
    }

    Object.assign(sample, updateSampleDto);

    return await this.sampleRepository.save(sample);
  }

  async remove(id: number) {
    const sample = await this.findOne(id);

    if (!sample) {
      throw new NotFoundException();
    }

    return await this.sampleRepository.remove(sample);
  }
}
