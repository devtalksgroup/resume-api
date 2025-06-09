import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';

import { CatController } from './controller/cat.controller';
import { Cat } from './entities/cat.entity';
import { CatService } from './service/cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatController],
  providers: [
    CatService,
    // https://github.com/BenLorantfy/nestjs-zod?tab=readme-ov-file#globally-recommended
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },

    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class CatModule {}
