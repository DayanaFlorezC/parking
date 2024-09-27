import { AppDataSource } from "./data-source"
import {initSeeders} from './seeders/seeders'
import App from './App'
import dotenv from 'dotenv';
dotenv.config();

async function main() {

    try {
        AppDataSource.initialize().then(() => {
            console.log('Base de datos conectada correctamente...')
            initSeeders()
        })
        App.listen(process.env.PORT)
        console.log('servidor corriendo en el puerto 8000')
    } catch (error) {
        console.log(error)
    }


}

main()

