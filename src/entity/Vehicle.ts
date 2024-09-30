import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    BeforeInsert,
    ManyToOne, 
    JoinColumn 
} from "typeorm";

import {
    IsInt,
    Length,
    IsDate,
    Min,
    validate
} from "class-validator"
import { Parking } from "./Parking";
import { User } from "./User";

@Entity()
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @Length(6)
    placa!: string
    
    @Column()
    partnerId!: number

    @Column()
    @IsDate()
    dateIn!: Date

    @Column({ nullable: true, default: null})
    dateOut!: Date 
    
    @Column({ nullable: true, default: 0})
    cost!: number

    @Column()
    parkingId: number

    @ManyToOne(() => Parking, (parking) => parking.vehicles)
    @JoinColumn({name: "parkingId"})
    parking: Parking;

    @ManyToOne(() => User, (user) => user.vehicles)
    @JoinColumn({name: "partnerId"})
    user: User;

    @BeforeInsert()
    async validateEntity() {
        const errors = await validate(this);
        if (errors.length > 0) {
            throw new Error(`Validation failed! ${errors}`);
        }
    }
}
