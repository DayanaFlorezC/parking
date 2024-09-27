import { User } from "../entity/User";

interface UserBody {
  name: string;
  email: string;
  password: string;
  role: string,
  createdAt: Date
}

export const getUsers = async (query: object) => {
  try {
    return await User.find({where: query});
  } catch (error) {
    if (error instanceof Error) {
      return false
      //!recuera hacer el manejador de errores 
    }
  }
};

export const getUser = async (id: number) => {
  try {
    const user = await User.findOneBy({ id: id });

    if (!user) return null

    return user
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
};

export const createUser = async (data : UserBody) => {
  try {
    const { name, email, password } = data;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password; 
    user.role = 'socio';
    user.createdAt= new Date();
    await user.save();
    return user
    
  } catch (error) {
    console.log(error)
    throw Error 
  }

};

export const updateUser = async (dataUpdate: UserBody, id: number ) => {

  try {
    const user = await User.findOneBy({ id: id});
    if (!user) return null

    await User.update({ id: id }, dataUpdate);

    return user
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
};

export const deleteUser = async (id: number) => {
  try {
    const result = await User.delete({ id: id});

    if (result.affected === 0)
      return  null

    return 'ok'
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
};


