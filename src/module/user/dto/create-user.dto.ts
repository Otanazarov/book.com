import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/common/enum/user.role';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsEnum(UserRole)
  @ApiProperty({default:UserRole.USER})
  role: UserRole;
}
