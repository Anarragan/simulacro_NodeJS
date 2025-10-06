import { fetchAllPedidos, fetchPedidoById, fetchPedidosByEstado, fetchPedidosByFecha, createNewPedido, updateExistingPedido, deleteExistingPedido } from "./pedido.controllers.js";    
import { Router } from "express";

const router = Router();

router.get("/all", fetchAllPedidos);
router.get("/estado/:estado", fetchPedidosByEstado);
router.get("/fecha/:fecha", fetchPedidosByFecha);
router.get("/:id", fetchPedidoById);
router.post("/", createNewPedido);
router.put("/:id", updateExistingPedido);
router.delete("/:id", deleteExistingPedido);

export {router};