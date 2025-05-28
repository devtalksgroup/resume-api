import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { UpdateSampleDto } from '../dto/update-sample.dto';
import { SampleService } from '../services/sample.service';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  createSample(@Body() createSampleDto: CreateSampleDto) {
    return this.sampleService.create(createSampleDto);
  }

  @Get()
  getAllSample() {
    return this.sampleService.findAll();
  }

  @Get(':id')
  getOneSampleById(@Param('id') id: number) {
    return this.sampleService.findOne(id);
  }

  @Patch(':id')
  updateSampleById(
    @Param('id') id: number,
    @Body() updateSampleDto: UpdateSampleDto,
  ) {
    return this.sampleService.update(id, updateSampleDto);
  }

  @Delete(':id')
  deleteSampleById(@Param('id') id: number) {
    return this.sampleService.remove(id);
  }
}
