import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cat } from '../entities/cat.entity';
import { CreateCatInputType } from '../inputs/create-cat.input';
import { UpdateCatInputType } from '../inputs/update-cat.input';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(dto: CreateCatInputType): Promise<Cat> {
    const cat = this.catRepository.create(dto);
    return this.catRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    const cat = await this.catRepository.findOne({
      where: { id },
    });

    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    return cat;
  }

  async remove(id: number): Promise<{ message: string }> {
    const cat = await this.catRepository.findOne({
      where: { id },
    });

    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    await this.catRepository.remove(cat);
    return { message: 'Cat deleted successfully' };
  }

  async update(id: number, dto: UpdateCatInputType): Promise<Cat> {
    const cat = await this.catRepository.findOne({
      where: { id },
    });

    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    Object.assign(cat, dto);
    return this.catRepository.save(cat);
  }
}
