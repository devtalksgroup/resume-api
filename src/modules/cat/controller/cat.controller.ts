import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ZodSerializerDto } from 'nestjs-zod';

import { CreateCatInput } from '../inputs/create-cat.input';
import { UpdateCatInput } from '../inputs/update-cat.input';
import { CatOutput } from '../outputs/cat.output';
import { CatService } from '../service/cat.service';

@ApiTags('Cat')
@Controller({ version: '1', path: 'cat' })
export class CatController {
  constructor(private readonly service: CatService) {}

  @Post()
  @ZodSerializerDto(CatOutput)
  @ApiOperation({
    summary: 'Create a new cat',
    description: 'Creates a new cat with the provided data',
  })
  @ApiBody({
    type: CreateCatInput,
    description: 'Cat data to create',
  })
  @ApiCreatedResponse({
    description: 'Cat successfully created',
    type: CatOutput,
  })
  async create(@Body() dto: CreateCatInput): Promise<CatOutput> {
    return this.service.create(dto);
  }

  @Get()
  @ZodSerializerDto(CatOutput)
  @ApiOperation({
    summary: 'Get all cats',
    description: 'Retrieves a list of all active cats',
  })
  @ApiOkResponse({
    description: 'List of cats retrieved successfully',
    type: [CatOutput],
  })
  async findAll(): Promise<CatOutput[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ZodSerializerDto(CatOutput)
  @ApiOperation({
    summary: 'Get cat by ID',
    description: 'Retrieves a specific cat by its ID',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Cat ID',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Cat retrieved successfully',
    type: CatOutput,
  })
  @ApiNotFoundResponse({
    description: 'Cat not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CatOutput> {
    return this.service.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete cat by ID',
    description: 'Deletes a specific cat by its ID',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Cat ID',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Cat deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Cat deleted successfully',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Cat not found',
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.service.remove(id);
  }

  @Patch(':id')
  @ZodSerializerDto(CatOutput)
  @ApiOperation({
    summary: 'Update cat by ID',
    description: 'Updates a specific cat with the provided data',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Cat ID',
    example: 1,
  })
  @ApiBody({
    type: UpdateCatInput,
    description: 'Cat data to update',
  })
  @ApiOkResponse({
    description: 'Cat updated successfully',
    type: CatOutput,
  })
  @ApiNotFoundResponse({
    description: 'Cat not found',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCatInput,
  ): Promise<CatOutput> {
    return this.service.update(id, dto);
  }
}
