import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    username!: string;

    @OneToMany(() => Post, post => post.creator)
    post: Post[]

    @Column({unique: true})
    email!: string;

    @Column({unique: true})
    password!: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}