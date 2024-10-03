# Awesome Project Build with TypeORM

Este proyecto es una API REST que maneja la lógica de negocio de un sistema de parqueaderos con roles de **admin** y **socio**, además de la integración con un servicio de envío de correos electrónicos.

## Descripción 

La API permite la gestión de usuarios y parqueaderos, junto con el registro de vehículos y consulta de indicadores. Se ha implementado autenticación basada en JWT, controlando los permisos según el rol del usuario (admin o socio). Adicionalmente, esta API interactúa con un servicio externo para el envío de correos electrónicos.

## Requisitos

Para ejecutar este proyecto, asegúrate de tener instalado:

- **Node.js** v22.8.0
- **Postgresql** para la base de datos

Para la gestión de la base de datos se utilizó **Type-ORM** 

Pasos para ejecutar el proyecto:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `create database parkingDb` Script SQL
4. Run `npm run dev` command
5. Crear un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

```

PORT = 3001
secretKeyJWT = ""

PASSWORD_ADMIN_DEFAULT = '$2b$10$T6q.pZPRksIut.PKuPHXjudY/tAREEFnTBo5FSMQAb5/SZMZlQE/W'

PORT_DB = 5432
USERNAME_DB = "postgres"
PASS_DB = "postgres"
DATABASE_NAME = "parkingDb"


URI_MAILSERVIVE = "http://localhost:3000"

```

## Uso de la API

Los endpoints están distribuidos en tres secciones principales, de acuerdo a las tablas usadas en la base de datos:

- **user**: Gestiona usuarios con roles de admin y socio.
- **vehicle**: CRUD para el registro de vehículos y validaciones asociadas.
- **parking**: CRUD para la gestión de parqueaderos.
- **Email**: Guarda la información de los correos electrónicos enviados 

Se ha implementado un endpoint que permite al rol de administrador gestionar el envío de correos electrónicos a los socios. Es fundamental que el microservicio esté correctamente configurado para acceder al recurso de envío de correos electrónicos.

En el repositorio se enccuentra la colección de postman con cada uno de los endpoints para facilitar las pruebas de los mismos
