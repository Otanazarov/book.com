import { RootEntity } from 'src/common/root/root-entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Dostavka extends RootEntity {
  @Column()
  address: string;

  @Column()
  street: string;

  @Column()
  phoneNumber: string;

  @Column()
  house: string;

  @Column()
  timeDastavka: string;

  @ManyToOne((comment) => User)
  user: User;
}
