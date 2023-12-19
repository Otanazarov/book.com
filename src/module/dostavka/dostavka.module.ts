import { Module } from '@nestjs/common';
import { DostavkaService } from './dostavka.service';
import { DostavkaController } from './dostavka.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dostavka } from './entities/dostavka.entity';
import { User } from 'src/module/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dostavka, User])],
  controllers: [DostavkaController],
  providers: [DostavkaService],
})
export class DostavkaModule {}
