import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Heart } from "./Heart";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @OneToMany(() => Post, (post) => post.creator)
  post: Post[];

  @OneToMany(() => Heart, (heart) => heart.user)
  hearts: Heart[];

  @Column()
  password!: string;
}
