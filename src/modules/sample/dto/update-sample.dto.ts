import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSampleDto {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  isActive?: boolean;
}
