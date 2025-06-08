import { Injectable } from '@nestjs/common';

import { CreateCatInputType } from '../inputs/create-cat.input';

@Injectable()
export class CatService {
  create(dto: CreateCatInputType) {
    return dto;
  }
}
