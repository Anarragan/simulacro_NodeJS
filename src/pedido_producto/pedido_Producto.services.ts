import { fn, literal } from "sequelize";
import { pedido_producto, type pedido_productoAttributes, type pedido_productoCreationAttributes } from "../models/init-models.js";
import { producto } from "../producto/producto.js";

export const createPedidoProducto = async (data: pedido_productoCreationAttributes) => {
    const newPedidoProducto = await pedido_producto.create(data);
    return newPedidoProducto;
};

export const getPedidoProductoByPedidoId = async (pedido_id: number): Promise<pedido_productoAttributes[] | null> => {
    return await pedido_producto.findAll({ where: { pedido_id: pedido_id } });
}; 

export const getPriceByPedidoId = async (pedido_id: number): Promise<number> => {
    try {
        const result = await pedido_producto.findAll({
            attributes: [
                [fn("SUM", literal('"pedido_producto"."cantidad" * "producto"."precio"')), "total"]
            ],
            where: { pedido_id },
            include: [{
                model: producto,
                as: "producto",
                attributes: [],
            }],
            raw: true,
        }) as any;
        const total = result?.[0]?.total ? Number(result[0].total) : 0;
        return total;
    } catch (error) {
        console.error("Error calculating total price for pedido_id:", pedido_id, error);
        throw error;
    }
};

