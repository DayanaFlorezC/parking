import { Vehicle } from "../entity/Vehicle";

export const getRegisters = async (query: object) => {
  try {
    return await Vehicle.find({ where: query })
  } catch (error) {
    throw new Error("Error al obtener varios registros");
  }
}


export const getRegister = async (query: object, id: number) => {
  try {

    return await Vehicle.findOneBy({ id });

  } catch (error) {
    throw new Error("Error al obtener un registro");
  }
};

export const createRegister = async (data: Vehicle) => {
  try {
    const { placa, idParking, idPartner } = data;
    const register = new Vehicle();
    register.placa = placa;
    register.idParking = idParking;
    register.idPartner = idPartner;
    register.dateIn = new Date();
    await register.save();
    return register

  } catch (error) {
    console.log(error)
    throw new Error("Error al crear un registro");
  }

};

export const updateRegister = async (dataUpdate: Vehicle, id: number) => {

  try {
    const register = await Vehicle.findOneBy({ id: id });
    if (!register) return null

    await Vehicle.update({ id: id }, dataUpdate);

    return register
  } catch (error) {
    throw new Error("Error al actualizar un registro");
  }
};

export const deleteRegister = async (id: number) => {
  try {
    const result = await Vehicle.delete({ id: id });

    if (result.affected === 0)
      return null

    return result.raw
  } catch (error) {
    throw new Error("Error al borrar un registro");
  }
};



