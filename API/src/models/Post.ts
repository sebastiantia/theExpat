import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import "reflect-metadata";
import { User } from "./User";
import { Heart } from "./Heart";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  title!: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  latitude: number;
  //max +=90
  @Column({ nullable: true })
  longitude: number;
  
  @Column({ default: 0 })
  heartcount: number;

  @OneToMany(() => Heart, (heart) => heart.post)
  hearts: Heart[];

  @Column({ nullable: true })
  creator: string;

  @ManyToOne(() => User, (user) => user.post)
  creatorId: User;

  @Column({ nullable: true })
  visitDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
