import { User } from "../entity/User";
import { Email } from "../entity/Email";

import { AppDataSource } from "../data-source";

interface UserBody {
  name: string;
  email: string;
  password: string;
  role: string,
  createdAt: Date
}

export const getUsers = async (query: object) => {
  return await User.find({
    where: query, relations: {
      parkings: true
    }
  });
};

export const getUser = async (id: number) => {

  return await User.findOne({ where: { id: id }, relations: { vehicles: true, parkings: true } });

};

export const getUserByEmail = async (email: string) =>{
  const UserRepository = AppDataSource.getRepository('User')
  return await UserRepository.createQueryBuilder("user")
  .addSelect("user.password") 
  .where("user.email = :email", { email })
  .getOne();
}

export const createUser = async (data: UserBody) => {
    const { name, email, password } = data;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = 'socio';
    user.createdAt = new Date();
    return await user.save();
};

export const updateUser = async (dataUpdate: any, id: number) => {

    const user = await User.findOneBy({ id: id });
    if (!user) return null

    return User.update({ id: id }, dataUpdate);


};

export const deleteUser = async (id: number) => {
  return await User.delete({ id: id });
};


export const createEmail = async (data: Email) => {
  try {
    const { to, from, subject, message } = data;
    const email = new Email();
    email.to = to;
    email.from = from;
    email.subject = subject;
    email.createdAt = new Date();
    email.message = message;
    await email.save();

    return email

  } catch (error) {
    console.log(error)
  }
}

//?Indicador socios
export const getTopSocios = async () => {

    const oneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    const UserRepository = AppDataSource.getRepository('User')

    return await UserRepository.createQueryBuilder('user')
      .leftJoinAndSelect("user.vehicles", "vehicle")
      .where('vehicle.dateIn > :oneWeekAgo', { oneWeekAgo })
      .select('user.id', 'id')
      .addSelect('COUNT(vehicle.id)', 'vehiclecount')
      .groupBy('user.id')
      .orderBy('vehiclecount', 'DESC')
      .limit(3)
      .getRawMany()

}
