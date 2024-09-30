import { Parking } from "../entity/Parking";

export const getParkings = async (query: object) => {
  try {

    return await Parking.find({ where: query })

  } catch (error) {
    console.log(error)
    throw new Error("Error al obtener los parqueaderos");

  }
}


export const getParking = async (query: object, id: number) => {
  try {
    return await Parking.findOneBy({ id: id, ...query });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error al obtener un parqueadero");
    }
  }
};

export const createParking = async (data: Parking) => {
  try {
    const { name, capacity, costByHour } = data;
    const parking = new Parking();
    parking.name = name;
    parking.capacity = capacity;
    parking.costByHour = costByHour;
    parking.createdAt = new Date();
    await parking.save();
    return parking

  } catch (error) {
    console.log(error)
    throw new Error("Error al crear un parqueadero");
  }

};

export const updateParking = async (dataUpdate: Parking, id: number) => {

  try {
    const parking = await Parking.findOneBy({ id: id });
    if (!parking) return null

    await Parking.update({ id: id }, dataUpdate);

    return parking
  } catch (error) {
    throw new Error("Error al editar un parqueadero");
  }
};

export const deleteParking = async (id: number) => {
  try {
    const result= await Parking.delete({ id: id });

    if (result.affected === 0)
      return null

    return result.raw
  } catch (error) {
    throw new Error("Error al borrar un parqueadero");
  }
};



