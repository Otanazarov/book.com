import { Category } from 'src/module/category/entities/category.entity';
import { RootEntity } from 'src/common/root/root-entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Book extends RootEntity {
  @Column()
  bookName: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  vievCount: number;

  @Column()
  desc: string;

  @ManyToMany(() => Category, (category) => category.book)
  category: Category[];
  @Column()
  pdf:string
}
