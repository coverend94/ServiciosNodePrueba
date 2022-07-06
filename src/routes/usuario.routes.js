import { Router } from "express";
import { methods as usuarioController } from "./../controllers/usuario.controller";

const router = Router();

router.get("/getAll", usuarioController.getUsuario);
router.get("/search/:search", usuarioController.searchBy);
router.post("/create", usuarioController.createUser);
router.post("/update", usuarioController.updateUser);
router.post("/delete", usuarioController.deleteUser);
router.post("/activate", usuarioController.activateUser);
router.post("/login", usuarioController.loginByEmail);
router.get("/getReporte:id", usuarioController.getReporte);

export default router;