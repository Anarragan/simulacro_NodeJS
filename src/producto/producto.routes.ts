import { fetchAllProductos, fetchProductoById, fetchProductosByCategoria, createNewProducto, updateExistingProducto, deleteExistingProducto } from "./producto.controller.js";
import { Router } from "express";

const router = Router();

router.get("/all", fetchAllProductos);
router.get("/categoria/:categoria", fetchProductosByCategoria);
router.get("/:id", fetchProductoById);
router.post("/", createNewProducto);
router.put("/:id", updateExistingProducto);
router.delete("/:id", deleteExistingProducto);


export {router};