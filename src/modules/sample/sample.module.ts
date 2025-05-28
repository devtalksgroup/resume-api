import { Module } from '@nestjs/common';
import { SampleController } from './controllers/sample.controller';
import { SampleService } from './services/sample.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entities/sample.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
