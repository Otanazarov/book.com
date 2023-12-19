import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SavedService } from './saved.service';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';
import { FindAllSavedDto } from './dto/findAll-savedDto';

@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Post()
  create(@Body() createSavedDto: CreateSavedDto) {
    return this.savedService.create(createSavedDto);
  }

  @Get()
  findAll(@Query() findAllSavedDto:FindAllSavedDto) {
    return this.savedService.findAll(findAllSavedDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedService.findOne(+id);
  }





  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavedDto: UpdateSavedDto) {
    return this.savedService.update(+id, updateSavedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedService.remove(+id);
  }
}
