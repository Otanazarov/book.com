import { PartialType } from '@nestjs/swagger';
import { CreateDostavkaDto } from './create-dostavka.dto';

export class UpdateDostavkaDto extends PartialType(CreateDostavkaDto) {}
