import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { env } from './env.config';
import { User } from 'src/module/user/entities/user.entity';
import { Category } from 'src/module/category/entities/category.entity';
import { Book } from 'src/module/book/entities/book.entity';
import { Dostavka } from 'src/module/dostavka/entities/dostavka.entity';
import { Saved } from 'src/module/saved/entities/saved.entity';

export const typeoremConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [User, Category, Book, Dostavka, Saved],
  synchronize: true,
};
