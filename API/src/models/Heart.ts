import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { Post } from "./Post";
  import { User } from "./User";
  
  @Entity()
  export class Heart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @PrimaryColumn()
    userId: number;
  
    @PrimaryColumn()
    postId: number;
  
    @ManyToOne(() => User, (user) => user.hearts)
    user: User;

    @ManyToOne(() => Post, (post) => post.hearts, {
      onDelete: "CASCADE",
    })
    post: Post;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }