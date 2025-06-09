import { z } from 'zod';

import { createZodDto } from '@/common/utils';

export const CreateCatSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  age: z.coerce
    .number()
    .int()
    .min(0, 'Age must be positive')
    .max(30, 'Age is too high')
    .optional(),
});

export type CreateCatInputType = z.infer<typeof CreateCatSchema>;

export class CreateCatInput extends createZodDto(CreateCatSchema) {}
