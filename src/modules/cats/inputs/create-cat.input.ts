import { z } from 'zod';

import { createZodDto } from '@/common/utils';

export const CreateCatSchema = z.object({
  name: z.string(),
  age: z.coerce.number().optional(),
});

export type CreateCatInputType = z.infer<typeof CreateCatSchema>;

export class CreateCatInput extends createZodDto(CreateCatSchema) {}
