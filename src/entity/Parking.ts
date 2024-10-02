import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    BeforeInsert, 
    ManyToOne, 
    JoinColumn,
    OneToMany 
} from "typeorm";

import {
    IsInt,
    IsDate,
    Min,
    validate,
} from "class-validator"
import { User } from "./User";
import { Vehicle } from "./Vehicle";
import { ValidationsExceptions } from "../middlewares/exceptions/exceptions.error";

@Entity()
export class Parking extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    @Min(1, { message: 'minimo 1' })
    @IsInt()
    capacity!: number

    @Column()
    @Min(0)
    costByHour!: number

    @Column()
    @IsDate()
    createdAt!: Date

    @Column()
    userId: number
    
    @ManyToOne(() => User, (user) => user.parkings)
    @JoinColumn({name: "userId"})
    user: User;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.parking)
    vehicles: Vehicle[];

    @BeforeInsert()
    async validateEntity() {
        const errors = await validate(this);
        if (errors.length > 0) {
            throw new ValidationsExceptions(`Validation failed! ${errors}`);
        }
    }


}
