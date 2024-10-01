import { IsNull } from "typeorm";
import { Vehicle } from "../entity/Vehicle";

import { AppDataSource } from "../data-source";

export const getRegisters = async (query: object) => {
  try {
    return await Vehicle.find({ where: query })
  } catch (error) {
    throw new Error("Error al obtener varios registros");
  }
}


export const getRegisterWithoutDateOut = async (query: object) => {
  try {

    return await Vehicle.findOne({
      where: {
        dateOut: IsNull(),
        ...query
      }
    })
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
    const { placa, parkingId, partnerId } = data;
    const register = new Vehicle();
    register.placa = placa;
    register.parkingId = parkingId;
    register.partnerId = partnerId;
    register.dateIn = new Date();

    await register.save();
    return register

  } catch (error) {
    console.log(error)
    throw new Error("Error al crear un registro");
  }

};

export const updateRegister = async (dataUpdate: any, id: number) => {

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


//indicadores 

//?vehiculos

export const getTopVeh = async () => {
  try {

    const vehRepository = AppDataSource.getRepository('Vehicle')

    const vehiculos = await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.placa', 'placa')
      .addSelect('COUNT(vehicle.id)', 'vehiclecount')
      .groupBy('vehicle.placa')
      .orderBy('vehiclecount', 'DESC')
      .limit(10)
      .getRawMany()

    return vehiculos
  } catch (error) {
    console.log(error)
    throw new Error("Error indicador");
  }
}

export const getTopVehOneParking = async (parkingId: number) => {
  try {

    const vehRepository = AppDataSource.getRepository('Vehicle')

    const vehiculos = await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.placa', 'placa')
      .addSelect('COUNT(vehicle.id)', 'vehiclecount')
      .addSelect('vehicle.parkingId', 'parkingId')
      .groupBy('vehicle.placa')
      .addGroupBy("vehicle.parkingId")
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .orderBy('vehiclecount', 'DESC')
      .limit(10)
      .getRawMany()

    return vehiculos
  } catch (error) {
    console.log(error)
    throw new Error("Error indicador");
  }
}

export const getFirstVeh = async (parkingId: number) => {
  try {

    const vehRepository = AppDataSource.getRepository('Vehicle')

    const vehiculos = await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.placa', 'placa')
      .addSelect('COUNT(vehicle.id)', 'vehiclecount')
      .addSelect('vehicle.parkingId', 'parkingId')
      .addSelect('vehicle.dateOut', 'dateOut')
      .groupBy('vehicle.placa')
      .addGroupBy("vehicle.parkingId")
      .addGroupBy('vehicle.dateOut')
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .having('COUNT(vehicle.id) = 1')
      .andHaving('vehicle.dateOut IS NULL')
      .limit(10)
      .getRawMany()


    return vehiculos
  } catch (error) {
    console.log(error)
    throw new Error("Error indicador");
  }
}

//?ganacias 

export const getEarnings = async (parkingId: number) => {
  try {
    const vehRepository = AppDataSource.getRepository('Vehicle')

    const total = await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.parkingId', 'parkingId')
      .addSelect('SUM(vehicle.cost)', 'total')
      .groupBy('vehicle.parkingId')
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .getRawMany()


    return total
  } catch (error) {
    console.log(error)
    throw new Error("Error indicador ganacias");

  }
}


export const getEarningsToday = async (parkingId: number) => {
  try {

    const startOfDay = new Date(new Date().setHours(0, 0, 0));
    const endOfDay = new Date(new Date().setHours(23, 59, 59));

    const vehRepository = AppDataSource.getRepository('Vehicle')

    const total = await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.parkingId', 'parkingId')
      .addSelect('SUM(vehicle.cost)', 'total')
      .groupBy('vehicle.parkingId')
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .andWhere("vehicle.dateIn >= :startOfDay", { startOfDay })
      .andWhere("vehicle.dateIn < :endOfDay", { endOfDay })
      .getRawMany()


    return total
  } catch (error) {
    console.log(error)
    throw new Error("Error indicador ganacias");

  }
}

export const getEarningsLastWeek = async (parkingId: number) => {
  try {

    const startOfDay = new Date(new Date().setDate(new Date().getDate() - 7));
    const endOfDay = new Date(new Date().setHours(23, 59, 59));

    const vehRepository = AppDataSource.getRepository('Vehicle')

    const total = await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.parkingId', 'parkingId')
      .addSelect('SUM(vehicle.cost)', 'total')
      .groupBy('vehicle.parkingId')
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .andWhere("vehicle.dateIn >= :startOfDay", { startOfDay })
      .andWhere("vehicle.dateIn < :endOfDay", { endOfDay })
      .getRawMany()


    return total
  } catch (error) {
    console.log(error)
    throw new Error("Error indicador ganacias");

  }
}


export const getEarningsLastMonth = async (parkingId: number) => {
  try {

    const startOfDayLastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
    startOfDayLastMonth.setHours(0, 0, 0, 0);
    const endOfDay = new Date(new Date().setHours(23, 59, 59));

    const vehRepository = AppDataSource.getRepository('Vehicle')

    const total = await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.parkingId', 'parkingId')
      .addSelect('SUM(vehicle.cost)', 'total')
      .groupBy('vehicle.parkingId')
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .andWhere("vehicle.dateIn >= :startOfDayLastMonth", { startOfDayLastMonth })
      .andWhere("vehicle.dateIn < :endOfDay", { endOfDay })
      .getRawMany()


    return total
  } catch (error) {
    console.log(error)
    throw new Error("Error indicador ganacias");

  }
}

export const getEarningsLastYear = async (parkingId: number) => {
  try {

    const startOfDayLastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    startOfDayLastYear.setHours(0, 0, 0, 0);
    const endOfDay = new Date(new Date().setHours(23, 59, 59));

    const vehRepository = AppDataSource.getRepository('Vehicle')

    const total = await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.parkingId', 'parkingId')
      .addSelect('SUM(vehicle.cost)', 'total')
      .groupBy('vehicle.parkingId')
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .andWhere("vehicle.dateIn >= :startOfDayLastYear", { startOfDayLastYear })
      .andWhere("vehicle.dateIn < :endOfDay", { endOfDay })
      .getRawMany()


    return total
  } catch (error) {
    console.log(error)
    throw new Error("Error indicador ganacias");

  }
}

