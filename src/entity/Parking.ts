import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import {
    IsInt,
    IsDate,
    Min,
} from "class-validator"

@Entity()
export class Parking extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    @Min(1, {message: 'minimo 1'})
    @IsInt()
    capacity!: number

    @Column()
    @Min(0)
    costByHour!: number

    @Column()
    @IsDate()
    createdAt!: Date

}
