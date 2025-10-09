import type { Response, Request } from "express";
import { createPedidoProducto, getPedidoProductoByPedidoId, getPriceByPedidoId } from "./pedido_Producto.services.js";

export const addProductoToPedido = async (req: Request, res: Response) => {
    try {
        const dataProductoPedido = req.body;
        const newPedidoProducto = await createPedidoProducto(dataProductoPedido);
        res.status(201).json(newPedidoProducto);
    } catch (error) {
        console.error("addProductoToPedido error:", error);
        res.status(500).json({ error: "Error al agregar producto al pedido" });
    }
};

export const getProductoPedidoByPedidoId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        console.log("Fetching producto pedido for pedido_id:", id);
        const productoPedido = await getPedidoProductoByPedidoId(id);
        if (!productoPedido) {
            return res.status(404).json({ error: "PedidoProducto no encontrado" });
        }
        res.json(productoPedido);
    } catch (error) {
        console.error("getProductoPedido error:", error);
        res.status(500).json({ error: "Error al obtener el producto del pedido" });
    }
};

export const getTotalPriceForPedido = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const totalPrice = await getPriceByPedidoId(Number(id));
        res.json({ total: totalPrice });
    } catch (error) {
        console.error("getTotalPriceForPedido error:", error);
        res.status(500).json({ error: "Error al calcular el precio total del pedido" });
    }
};
