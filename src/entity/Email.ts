import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity } from "typeorm"
import { validate, IsEmail } from "class-validator"
import { ValidationsExceptions } from "../middlewares/exceptions/exceptions.error"

@Entity()
export class Email extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @IsEmail()
    to!: string

    @Column()
    @IsEmail()
    from!: string

    @Column()
    message!: string

    @Column()
    subject!: string

    @Column()
    createdAt!: Date

    @Column()
    placa!: string

    @Column()
    partnerId!: number

    
    @BeforeInsert()
    async validateEntity() {
        const errors = await validate(this);
        if (errors.length > 0) {
            throw new ValidationsExceptions(`Validation failed! ${errors}`);
        }
    }
}
