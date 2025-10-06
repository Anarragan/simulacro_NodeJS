import { fetchAllUsuarios, fetchUsuarioById, createNewUsuario, updateExistingUsuario, deleteExistingUsuario } from "./usuario.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/all", fetchAllUsuarios);
router.get("/:id", fetchUsuarioById);
router.post("/", createNewUsuario);
router.put("/:id", updateExistingUsuario);
router.delete("/:id", deleteExistingUsuario);

export {router};
