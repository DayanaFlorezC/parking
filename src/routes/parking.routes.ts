import { Router, RequestHandler } from "express";

import {
    createParkingController,
    deleteParkingController,
    getParkingController,
    getParkingsController,
    updateParkingController,
    getTopParkingsController
} from '../controller/parking.controller';

import {
    authMiddleware,
    authAdmin,
} from '../middlewares/auth'

const router = Router();

router.get('/parking',
    authMiddleware as RequestHandler,
    authAdmin as RequestHandler,
    getParkingsController as RequestHandler
)

router.get("/parking/:id",
    authMiddleware as RequestHandler,
    getParkingController as RequestHandler
);

router.post("/parking",
    authMiddleware as RequestHandler,
    authAdmin as RequestHandler,
    createParkingController as RequestHandler
);

router.put("/parking/:id",
    authMiddleware as RequestHandler,
    authAdmin as RequestHandler,
    updateParkingController as RequestHandler
);

router.delete("/parking/:id",
    authMiddleware as RequestHandler,
    authAdmin as RequestHandler,
    deleteParkingController as RequestHandler
);


router.get("/parking/ind/parkings",
    authMiddleware as RequestHandler,
    authAdmin as RequestHandler,
    getTopParkingsController as RequestHandler
)

export default router;