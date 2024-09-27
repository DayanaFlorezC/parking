import { Router, RequestHandler } from "express";

import {
    createParkingController,
    deleteParkingController,
    getParkingController,
    getParkingsController,
    updateParkingController
} from '../controller/parking.controller'

const router = Router();

router.get('/parking', getParkingsController as RequestHandler)

router.get("/parking/:id", getParkingController as RequestHandler);

router.post("/parking", createParkingController as RequestHandler);

router.put("/parking/:id", updateParkingController as RequestHandler);

router.delete("/parking/:id", deleteParkingController as RequestHandler);

export default router;