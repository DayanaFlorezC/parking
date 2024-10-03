import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Vehicle } from "./entity/Vehicle"
import { Parking } from "./entity/Parking"

import dotenv from 'dotenv';
import { MigrtionsInnit } from "./migrations/migrations.init"

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.PORT_DB) || 5432,
    username: process.env.USERNAMEDB || "postgres",
    password: process.env.PASS_DB || "postgres",
    database: process.env.DATABASE_NAME || "parkingDb",
    synchronize: true,
    logging: false,
    entities: [User, Vehicle, Parking],
    migrations: [MigrtionsInnit],
    subscribers: [],
})
