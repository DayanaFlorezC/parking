import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, BeforeInsert, OneToMany  } from "typeorm";
import {
    IsEmail,
    IsDate,
    validate
} from "class-validator"

import { Parking } from "./Parking";
import { Vehicle } from "./Vehicle";
import { ValidationsExceptions } from "../middlewares/exceptions/exceptions.error";

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

    @Column({ select: false })
    password!: string

    @Column()
    role!: string

    @Column()
    @IsDate()
    createdAt!: Date

    @OneToMany(() => Parking, (parking) => parking.user)
    parkings: Parking[];

    @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
    vehicles: Vehicle[];

    @BeforeInsert()
    async validateEntity() {
        const errors = await validate(this);
        if (errors.length > 0) {
            throw new ValidationsExceptions(`Validation failed! ${errors}`);
        }
    }


  
}
