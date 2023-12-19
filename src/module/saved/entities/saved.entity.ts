import { Book } from 'src/module/book/entities/book.entity';
import { RootEntity } from 'src/common/root/root-entity';
import { User } from 'src/module/user/entities/user.entity';
import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Saved extends RootEntity {
  @ManyToOne((saved) => User)
  user: User;

  @ManyToOne((saved) => Book)
  book: Book;
}
