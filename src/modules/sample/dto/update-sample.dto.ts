import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateSampleDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The title of the sample',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The name of the sample',
  })
  name?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Whether the sample is active',
  })
  isActive?: boolean;
}
