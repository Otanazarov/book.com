import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDostavkaDto {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  house: string;

  @ApiProperty()
  @IsString()
  timeDastavka: string;

  @ApiProperty()
  @IsNumber()
  user_id:number
}
