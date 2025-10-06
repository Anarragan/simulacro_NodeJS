import { Op, fn, col } from "sequelize";
import { pedido_producto, type pedido_productoAttributes, type pedido_productoCreationAttributes } from "./pedido_producto.js";

export const createPedidoProducto = async (data: pedido_productoCreationAttributes) => {
    const newPedidoProducto = await pedido_producto.create(data);
    return newPedidoProducto;
};

export const getPedidoById = async (pedido_id: number): Promise<pedido_productoAttributes[] | null> => {
    return pedido_producto.findAll({ where: { pedido_id: pedido_id } });
}

export const getPriceByPedidoId = async (pedido_id: number): Promise<number> => {
    try {
        const result = await pedido_producto.findAll({
            attributes: [[fn("SUM", col("precio")), "total"]],
            where: { pedido_id },
        });
        const total = result[0]?.get("total") as number | null;
        return total || 0;
    } catch (error) {
        console.error("Error calculating total price for pedido_id:", pedido_id, error);
        throw error;
    }
};



