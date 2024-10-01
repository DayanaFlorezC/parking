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

interface UserResponse {
  name: string;
  email: string;
  role: string,
  createdAt: Date
}

export const getUsers = async (query: object) => {
  try {
    return await User.find({
      where: query, relations: {
        parkings: true
      }
    });
  } catch (error) {
    console.log(error)
    throw new Error("Error al obtener los usuarios");
  }
};

export const getUser = async (id: number) => {
  try {
    const user = await User.findOne({ where: { id: id }, relations: { vehicles: true, parkings: true } });

    if (!user) return null

    return user
  } catch (error) {
    throw new Error("Error en get one user");
  }
};

export const createUser = async (data: UserBody) => {
  try {
    const { name, email, password } = data;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = 'socio';
    user.createdAt = new Date();
    await user.save();

    return user

  } catch (error) {
    console.log(error)
    throw new Error("Error al crear el usuario");
  }

};

export const updateUser = async (dataUpdate: UserBody, id: number) => {

  try {
    const user = await User.findOneBy({ id: id });
    if (!user) return null

    await User.update({ id: id }, dataUpdate);

    return user
  } catch (error) {
    console.log(error)
    throw new Error("Error al editar el usuario");
  }
};

export const deleteUser = async (id: number) => {
  try {
    const result = await User.delete({ id: id });

    if (result.affected === 0)
      return null

    return result
  } catch (error) {
    throw new Error("Error al borrar el usuario");
  }
};


export const createEmail= async (data: Email) =>{
  try {
    const {to, from, subject, message } = data;
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
  try {

    const oneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    const vehRepository = AppDataSource.getRepository('User')

    const result = await vehRepository.createQueryBuilder('user')
      .leftJoinAndSelect("user.vehicles", "vehicle")
      .where('vehicle.dateIn > :oneWeekAgo', { oneWeekAgo })
      .select('user.id', 'id')
      .addSelect('COUNT(vehicle.id)', 'vehiclecount')
      .groupBy('user.id')
      .orderBy('vehiclecount', 'DESC')
      .limit(3)
      .getRawMany()

    return result
  } catch (error) {
    console.log(error)
    throw new Error("Error consulta indicador ");
  }
}
