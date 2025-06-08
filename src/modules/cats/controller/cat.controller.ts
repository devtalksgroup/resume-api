import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ZodSerializerDto } from 'nestjs-zod';

import { CreateCatInput } from '../inputs/create-cat.input';
import { CreateCatOutput } from '../outputs/create-cat.output';
import { CatService } from '../service/cat.service';

@Controller({ version: '1', path: 'cat' })
export class CatController {
  constructor(private readonly service: CatService) {}

  @Post()
  @ZodSerializerDto(CreateCatOutput)
  @ApiCreatedResponse({ type: CreateCatOutput })
  create(@Body() dto: CreateCatInput) {
    return this.service.create(dto);
  }
}
