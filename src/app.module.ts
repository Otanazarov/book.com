import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeoremConfig } from './common/config/typeorm-config';
import { CategoryModule } from './module/category/category.module';
import { BookModule } from './module/book/book.module';
import { SavedModule } from './module/saved/saved.module';
import { DostavkaModule } from './module/dostavka/dostavka.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeoremConfig),
    UserModule,
    CategoryModule,
    BookModule,
    SavedModule,
    DostavkaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
