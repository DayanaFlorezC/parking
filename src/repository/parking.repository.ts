import { Parking } from "../entity/Parking";
import { AppDataSource } from "../data-source";

export const getParkings = async (query: object) => {

  const ParkRepository = AppDataSource.getRepository('Parking')

  return await ParkRepository.createQueryBuilder('parking')
    .leftJoinAndSelect("parking.vehicles", "vehicle", "vehicle.dateOut IS NULL")
    .getMany();

}

export const getParking = async (query: object, id: number) => {

  const ParkRepository = AppDataSource.getRepository('Parking')

  return await ParkRepository.createQueryBuilder('parking')
    .where("parking.id = :id", { id })
    .leftJoinAndSelect("parking.vehicles", "vehicle", "vehicle.dateOut IS NULL")
    .getOne();

};

export const createParking = async (data: Parking) => {

  const { name, capacity, costByHour, userId } = data;
  const parking = new Parking();
  parking.name = name;
  parking.capacity = capacity;
  parking.costByHour = costByHour;
  parking.createdAt = new Date();
  parking.userId = userId
  return await parking.save();

};

export const updateParking = async (dataUpdate: any, id: number) => {

  const parking = await Parking.findOneBy({ id: id });
  if (!parking) return null

  return await Parking.update({ id: id }, dataUpdate);

};

export const deleteParking = async (id: number) => {
  return await Parking.delete({ id: id });
};

//?Indicador parkigns
export const getTopParkings = async () => {

  const oneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));
  const ParkRepository = AppDataSource.getRepository('Parking')


  return await ParkRepository.createQueryBuilder('parking')
    .leftJoin("parking.vehicles", "vehicle")
    .where('vehicle.dateIn > :oneWeekAgo', { oneWeekAgo })
    .select('parking.id', 'idparking')
    .addSelect('SUM(vehicle.cost)', 'total')
    .groupBy('parking.id')
    .orderBy('total', 'DESC')
    .limit(3)
    .getRawMany()

}



