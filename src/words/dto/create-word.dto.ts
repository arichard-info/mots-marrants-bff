import { ApiProperty } from '@nestjs/swagger';
export class CreateWordDto {
  @ApiProperty()
  value: string;
  @ApiProperty()
  valid: boolean;
  @ApiProperty()
  user: string;
}
