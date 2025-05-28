import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sample } from '../entities/sample.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSampleDto, SampleResponseDto, UpdateSampleDto } from '../dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
  ) {}

  async create(createSampleDto: CreateSampleDto): Promise<SampleResponseDto> {
    const newSample = this.sampleRepository.create(createSampleDto);
    const savedSample = await this.sampleRepository.save(newSample);
    return plainToClass(SampleResponseDto, savedSample, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<SampleResponseDto[]> {
    const samples = await this.sampleRepository.find();
    return plainToClass(SampleResponseDto, samples, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<SampleResponseDto> {
    const sample = await this.sampleRepository.findOne({ where: { id } });

    if (!sample) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }

    return plainToClass(SampleResponseDto, sample, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    updateSampleDto: UpdateSampleDto,
  ): Promise<SampleResponseDto> {
    const sample = await this.sampleRepository.findOne({ where: { id } });

    if (!sample) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }

    Object.assign(sample, updateSampleDto);
    const updatedSample = await this.sampleRepository.save(sample);
    return plainToClass(SampleResponseDto, updatedSample, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const sample = await this.sampleRepository.findOne({ where: { id } });

    if (!sample) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }

    await this.sampleRepository.remove(sample);
    return { message: 'Sample deleted successfully' };
  }
}
