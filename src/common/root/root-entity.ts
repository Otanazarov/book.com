import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RootEntity{
    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    uptated_at:Date
}