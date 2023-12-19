import { Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedController } from './saved.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saved } from './entities/saved.entity';
import { Book } from 'src/module/book/entities/book.entity';
import { User } from 'src/module/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Saved, Book, User])],
  controllers: [SavedController],
  providers: [SavedService],
})
export class SavedModule {}
