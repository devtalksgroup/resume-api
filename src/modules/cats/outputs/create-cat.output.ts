import { createZodDto } from '@/common/utils';

import { CreateCatSchema } from '../inputs/create-cat.input';

const CreateCatOutputSchema = CreateCatSchema.pick({ name: true });

export class CreateCatOutput extends createZodDto(CreateCatOutputSchema) {}
