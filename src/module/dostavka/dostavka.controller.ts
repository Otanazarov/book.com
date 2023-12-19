import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DostavkaService } from './dostavka.service';
import { CreateDostavkaDto } from './dto/create-dostavka.dto';
import { UpdateDostavkaDto } from './dto/update-dostavka.dto';
import { FindAllDostavkaDto } from './dto/findAll-dostavkaDto';

@Controller('dostavka')
export class DostavkaController {
  constructor(private readonly dostavkaService: DostavkaService) {}

  @Post()
  create(@Body() createDostavkaDto: CreateDostavkaDto) {
    return this.dostavkaService.create(createDostavkaDto);
  }

  @Get()
  findAll(@Query()findAllDostavkaDto:FindAllDostavkaDto) {
    return this.dostavkaService.findAll(findAllDostavkaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dostavkaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDostavkaDto: UpdateDostavkaDto) {
    return this.dostavkaService.update(+id, updateDostavkaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dostavkaService.remove(+id);
  }
}
