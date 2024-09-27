import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique  } from "typeorm";
import {
    IsEmail,
    IsDate,
} from "class-validator"

@Entity()
@Unique(["email"])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    @IsEmail()
    email!: string

    @Column()
    password!: string

    @Column()
    role!: string

    @Column()
    @IsDate()
    createdAt!: Date
}
