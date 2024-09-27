import { User } from '../entity/User';
import dotenv from "dotenv"

dotenv.config()

export const initSeeders = async () => {
    try {

        const existAdmin = await User.find({
            where: {
                email: "admin@mail.com"
            }
        })

        console.log(existAdmin, 'bala')

        if (!existAdmin.length) {
            const user = new User()

            user.name = "Admin"
            user.email = "admin@mail.com"
            user.password = process.env.PASSWORD_ADMIN_DEFAULT + ''
            user.role = "admin"
            user.createdAt = new Date();
            await user.save();

        }
    } catch (error) {
        console.log(error)

    }
}