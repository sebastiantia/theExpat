import { BaseEntity, Column, CreateDateColumn, Double, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Url } from "url";
import "reflect-metadata"

@Entity()
export class Post extends BaseEntity{ 
    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable: true,})
    userId: string

    @Column({nullable: true,})
    title!: string

    @Column({nullable: true,})
    description: string

    @Column({nullable: true,})
    image: number

    @Column({nullable: true,})
    latitude: number
    //max +=90
    @Column({nullable: true,})
    longitude: number
    //max +-180

    @Column({nullable: true,})
    visitDate: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


}