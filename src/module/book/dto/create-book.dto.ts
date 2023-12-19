import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  bookName: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  desc: string;

  @ApiProperty({ default: [7, 8, 9] })
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  categoryID: number[];

  @ApiProperty({ default: './PDF/bookname.pdf' })
  @IsString()
  pdf: string;
}
