import type { z } from 'zod';

import { createZodDto } from '@/common/utils';

import { CreateCatSchema } from './create-cat.input';

export const UpdateCatSchema = CreateCatSchema.partial();

export type UpdateCatInputType = z.infer<typeof UpdateCatSchema>;

export class UpdateCatInput extends createZodDto(UpdateCatSchema) {}
