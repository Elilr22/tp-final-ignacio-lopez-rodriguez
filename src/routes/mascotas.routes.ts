import { Router } from "express";
import * as mascotasController from "../controllers/mascotas.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";


const router = Router();

router.get("/",authenticate,authorize(['admin']), mascotasController.getAllMascotas);
router.get("/:id", mascotasController.getMascotaById);
router.post("/",authenticate,authorize(['admin']), mascotasController.createMascota);
router.put("/:id", authenticate,authorize(['admin']), mascotasController.updateMascota);
router.delete("/:id",authenticate,authorize(['admin']), mascotasController.deleteMascota);



export default router;