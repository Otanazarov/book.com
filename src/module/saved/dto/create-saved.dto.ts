import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateSavedDto {
  @ApiProperty()
  @IsNumber()
  userID: number;

  @ApiProperty()
  @IsNumber()
  bookID: number;
}
