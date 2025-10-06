import { addProductoToPedido, getProductoPedido, getTotalPriceForPedido } from "./pedido_producto.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", addProductoToPedido);
router.get("/:id", getProductoPedido);
router.get("/total/:id", getTotalPriceForPedido);

export default router;