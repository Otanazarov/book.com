import { Book } from 'src/module/book/entities/book.entity';
import { RootEntity } from 'src/common/root/root-entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Category extends RootEntity {
  @Column()
  categoryName: string;
  @ManyToMany(() => Book, (book) => book.category, { cascade: true })
  @JoinTable()
  book: Book[];
}
