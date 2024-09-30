import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import { validate, IsEmail } from "class-validator"

@Entity()
export class Email {

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

    
    @BeforeInsert()
    async validateEntity() {
        const errors = await validate(this);
        if (errors.length > 0) {
            throw new Error(`Validation failed! ${errors}`);
        }
    }
}
