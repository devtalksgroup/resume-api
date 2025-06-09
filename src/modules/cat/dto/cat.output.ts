import { z } from 'zod';

import { createZodDto } from '@/common/utils';

export const CatOutputSchema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number().nullable(),
});

export type CatOutputType = z.infer<typeof CatOutputSchema>;

export class CatOutput extends createZodDto(CatOutputSchema) {}
