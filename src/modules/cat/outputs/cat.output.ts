import { z } from 'zod';

import { createZodDto } from '@/common/utils';

import { CreateCatSchema } from '../inputs/create-cat.input';

export const CatOutputSchema = CreateCatSchema.extend({
  id: z.number(),
});

export type CatOutputType = z.infer<typeof CatOutputSchema>;

export class CatOutput extends createZodDto(CatOutputSchema) {}
