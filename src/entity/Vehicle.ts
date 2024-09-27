import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import {
    IsInt,
    Length,
    IsDate,
    Min,
} from "class-validator"

@Entity()
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @Length(5,5)
    placa!: string
    

    @Column()
    idPartner!: number

    @Column()
    idParking!: number

    @Column()
    @IsDate()
    dateIn!: Date

    @Column({ nullable: true, default: null})
    @IsDate()
    dateOut!: Date 
    

    @Column({ nullable: true, default: 0})
    @IsInt()
    @Min(0)
    cost!: number
}
