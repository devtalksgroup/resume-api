import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateSampleDto, SampleResponseDto, UpdateSampleDto } from '../dto';
import { SampleService } from '../services/sample.service';

@ApiTags('Sample')
@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new sample',
    description: 'Creates a new sample with the provided data',
  })
  @ApiBody({
    type: CreateSampleDto,
    description: 'Sample data to create',
  })
  @ApiResponse({
    status: 201,
    description: 'Sample successfully created',
    type: SampleResponseDto,
  })
  createSample(
    @Body() createSampleDto: CreateSampleDto,
  ): Promise<SampleResponseDto> {
    return this.sampleService.create(createSampleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all samples',
    description: 'Retrieves a list of all samples',
  })
  @ApiResponse({
    status: 200,
    description: 'List of samples retrieved successfully',
    type: [SampleResponseDto],
  })
  getAllSample(): Promise<SampleResponseDto[]> {
    return this.sampleService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get sample by ID',
    description: 'Retrieves a specific sample by its ID',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Sample ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Sample retrieved successfully',
    type: SampleResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Sample not found',
  })
  getOneSampleById(@Param('id') id: number): Promise<SampleResponseDto> {
    return this.sampleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update sample by ID',
    description: 'Updates a specific sample with the provided data',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Sample ID',
    example: 1,
  })
  @ApiBody({
    type: UpdateSampleDto,
    description: 'Sample data to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Sample updated successfully',
    type: SampleResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Sample not found',
  })
  updateSampleById(
    @Param('id') id: number,
    @Body() updateSampleDto: UpdateSampleDto,
  ): Promise<SampleResponseDto> {
    return this.sampleService.update(id, updateSampleDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete sample by ID',
    description: 'Deletes a specific sample by its ID',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Sample ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Sample deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Sample deleted successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Sample not found',
  })
  deleteSampleById(@Param('id') id: number): Promise<{ message: string }> {
    return this.sampleService.remove(id);
  }
}
