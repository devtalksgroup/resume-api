import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SampleResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the sample',
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'Title Sample 1',
    description: 'The title of the sample',
  })
  @Expose()
  title: string;

  @ApiProperty({
    example: 'Name Sample 1',
    description: 'The name of the sample',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Whether the sample is active',
  })
  @Expose()
  isActive: boolean;
}
