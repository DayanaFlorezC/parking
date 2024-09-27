import { Parking } from "../entity/Parking";

export const getParkings =  async (query : object) =>{
    try {

        return await Parking.find({where: query})
        
    } catch (error) {
        console.log(error)
    }
}


export const getParking = async (query: object, id: number) => {
  try {
    const parking = await Parking.findOneBy({ id: id, ...query });

    if (!parking) return null

    return parking
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
};

export const createParking = async (data : Parking) => {
  try {
    const { name, capacity, costByHour } = data;
    const parking = new Parking();
    parking.name = name;
    parking.capacity = capacity;
    parking.costByHour = costByHour; 
    parking.createdAt= new Date();
    await parking.save();
    return parking
    
  } catch (error) {
    console.log(error)
    throw Error 
  }

};

export const updateParking = async (dataUpdate: Parking, id: number ) => {

  try {
    const parking = await Parking.findOneBy({ id: id });
    if (!parking) return null

    await Parking.update({ id: id }, dataUpdate);

    return parking
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
};

export const deleteParking = async (id: number) => {
  try {
    const result = await Parking.delete({ id: id });

    if (result.affected === 0)
      return  null

    return 'ok'
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
};



