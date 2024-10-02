import { IsNull } from "typeorm";
import { Vehicle } from "../entity/Vehicle";

import { AppDataSource } from "../data-source";

export const getRegisters = async (query: object) => {
    return await Vehicle.find({ where: query })
}


export const getRegisterWithoutDateOut = async (query: object) => {
    return await Vehicle.findOne({
      where: {
        dateOut: IsNull(),
        ...query
      }
    })
 
}


export const getRegister = async (query: object, id: number) => {
    return await Vehicle.findOneBy({ id });
};

export const createRegister = async (data: Vehicle) => {

    const { placa, parkingId, partnerId } = data;
    const register = new Vehicle();
    register.placa = placa;
    register.parkingId = parkingId;
    register.partnerId = partnerId;
    register.dateIn = new Date();

    return await register.save();

};

export const updateRegister = async (dataUpdate: any, id: number) => {

    const register = await Vehicle.findOneBy({ id: id });
    if (!register) return null

    return await Vehicle.update({ id: id }, dataUpdate);

};

export const deleteRegister = async (id: number) => {
    return await Vehicle.delete({ id: id });
};


//indicadores 

//?vehiculos

export const getTopVeh = async () => {

    const vehRepository = AppDataSource.getRepository('Vehicle')

    return await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.placa', 'placa')
      .addSelect('COUNT(vehicle.id)', 'vehiclecount')
      .groupBy('vehicle.placa')
      .orderBy('vehiclecount', 'DESC')
      .limit(10)
      .getRawMany()

}

export const getTopVehOneParking = async (parkingId: number) => {

    const vehRepository = AppDataSource.getRepository('Vehicle')

    return await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.placa', 'placa')
      .addSelect('COUNT(vehicle.id)', 'vehiclecount')
      .addSelect('vehicle.parkingId', 'parkingId')
      .groupBy('vehicle.placa')
      .addGroupBy("vehicle.parkingId")
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .orderBy('vehiclecount', 'DESC')
      .limit(10)
      .getRawMany()

}

export const getFirstVeh = async (parkingId: number) => {

    const vehRepository = AppDataSource.getRepository('Vehicle')

    return await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.placa', 'placa')
      .addSelect('COUNT(vehicle.id)', 'vehiclecount')
      .addSelect('vehicle.parkingId', 'parkingId')
      .addSelect('vehicle.dateOut', 'dateOut')
      .groupBy('vehicle.placa')
      .addGroupBy("vehicle.parkingId")
      .addGroupBy('vehicle.dateOut')
      .where("vehicle.parkingId = :parkingId", { parkingId })
      .having('COUNT(vehicle.id) = 1')
      .andHaving('vehicle.dateOut IS NULL')
      .limit(10)
      .getRawMany()

}

//?ganacias 

export const getEarnings = async (parkingId: number) => {

    const vehRepository = AppDataSource.getRepository('Vehicle')

    return await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.parkingId', 'parkingId')
      .addSelect('SUM(vehicle.cost)', 'total')
      .groupBy('vehicle.parkingId')
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .getRawMany()

}


export const getEarningsToday = async (parkingId: number) => {

    const startOfDay = new Date(new Date().setHours(0, 0, 0));
    const endOfDay = new Date(new Date().setHours(23, 59, 59));

    const vehRepository = AppDataSource.getRepository('Vehicle')

    return await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.parkingId', 'parkingId')
      .addSelect('SUM(vehicle.cost)', 'total')
      .groupBy('vehicle.parkingId')
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .andWhere("vehicle.dateIn >= :startOfDay", { startOfDay })
      .andWhere("vehicle.dateIn < :endOfDay", { endOfDay })
      .getRawMany()

}

export const getEarningsLastWeek = async (parkingId: number) => {

    const startOfDay = new Date(new Date().setDate(new Date().getDate() - 7));
    const endOfDay = new Date(new Date().setHours(23, 59, 59));

    const vehRepository = AppDataSource.getRepository('Vehicle')

    return await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.parkingId', 'parkingId')
      .addSelect('SUM(vehicle.cost)', 'total')
      .groupBy('vehicle.parkingId')
      .where("vehicle.parkingId = :parkingId", { parkingId: parkingId })
      .andWhere("vehicle.dateIn >= :startOfDay", { startOfDay })
      .andWhere("vehicle.dateIn < :endOfDay", { endOfDay })
      .getRawMany()

}


export const getEarningsLastMonth = async (parkingId: number) => {

    const startOfDayLastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
    startOfDayLastMonth.setHours(0, 0, 0, 0);
    const endOfDay = new Date(new Date().setHours(23, 59, 59));

    const vehRepository = AppDataSource.getRepository('Vehicle')

    return await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.parkingId', 'parkingId')
      .addSelect('SUM(vehicle.cost)', 'total')
      .groupBy('vehicle.parkingId')
      .where("vehicle.parkingId = :parkingId", { parkingId })
      .andWhere("vehicle.dateIn >= :startOfDayLastMonth", { startOfDayLastMonth })
      .andWhere("vehicle.dateIn < :endOfDay", { endOfDay })
      .getRawMany()

}

export const getEarningsLastYear = async (parkingId: number) => {

    const startOfDayLastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    startOfDayLastYear.setHours(0, 0, 0, 0);
    const endOfDay = new Date(new Date().setHours(23, 59, 59));

    const vehRepository = AppDataSource.getRepository('Vehicle')

    return await vehRepository.createQueryBuilder('vehicle')
      .select('vehicle.parkingId', 'parkingId')
      .addSelect('SUM(vehicle.cost)', 'total')
      .groupBy('vehicle.parkingId')
      .where("vehicle.parkingId = :parkingId", { parkingId })
      .andWhere("vehicle.dateIn >= :startOfDayLastYear", { startOfDayLastYear })
      .andWhere("vehicle.dateIn < :endOfDay", { endOfDay })
      .getRawMany()

}

