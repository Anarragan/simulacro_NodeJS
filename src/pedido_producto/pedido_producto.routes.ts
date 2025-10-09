import { addProductoToPedido, getProductoPedidoByPedidoId, getTotalPriceForPedido } from "./pedido_producto.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", addProductoToPedido);
router.get("/total/:id", getTotalPriceForPedido);
router.get("/:id", getProductoPedidoByPedidoId);

export default router;