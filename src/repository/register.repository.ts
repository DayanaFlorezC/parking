import { Vehicle } from "../entity/Vehicle";

export const getRegisters =  async (query : object) =>{
    try {

        return await Vehicle.find({where: query})
        
    } catch (error) {
        console.log(error)
    }
}


export const getRegister = async (query: object, id: number) => {
  try {

    const register = await Vehicle.findOneBy({ id});

    if (!register) return null

    return register
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
};

export const createRegister = async (data : Vehicle) => {
  try {
    const { placa, idParking, idPartner } = data;
    const register = new Vehicle();
    register.placa = placa;
    register.idParking = idParking;
    register.idPartner = idPartner; 
    register.dateIn= new Date();
    await register.save();
    return register
    
  } catch (error) {
    console.log(error)
    throw Error 
  }

};

export const updateRegister = async (dataUpdate: Vehicle, id: number ) => {

  try {
    const register = await Vehicle.findOneBy({ id: id });
    if (!register) return null

    await Vehicle.update({ id: id}, dataUpdate);

    return register
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
};

export const deleteRegister = async (id: number) => {
  try {
    const result = await Vehicle.delete({ id: id });

    if (result.affected === 0)
      return  null

    return 'ok'
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
};



