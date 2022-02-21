import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import "reflect-metadata"
import { User } from "./User";

@Entity()
export class Post extends BaseEntity{ 
    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable: true,})
    title!: string

    @Column({nullable: true,})
    description: string

    @Column({nullable: true,})
    image: string

    @Column({nullable: true,})
    latitude: number
    //max +=90
    @Column({nullable: true,})
    longitude: number
    //max +-180

    //create a left join on user

    @Column({nullable: true})
    creator: string
    
    @ManyToOne(() => User, user => user.post)
    creatorId: User

    @Column({nullable: true,})
    visitDate: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


}