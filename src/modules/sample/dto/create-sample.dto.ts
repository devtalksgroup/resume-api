import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateSampleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Title Sample 1',
    description: 'The title of the sample',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Name Sample 1',
    description: 'The name of the sample',
  })
  name: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    example: true,
    default: true,
    description: 'Whether the sample is active',
  })
  isActive?: boolean;
}
