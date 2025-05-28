import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSampleDto {
  @ApiProperty({ example: 'Title Sample 1' })
  title: string;

  @ApiProperty({ example: 'Name Sample 1' })
  name: string;

  @ApiPropertyOptional({ example: true })
  isActive?: boolean;
}
