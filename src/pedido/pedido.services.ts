import { pedido, type pedidoAttributes, type pedidoCreationAttributes } from "./pedido.js";
import { Op } from "sequelize";

export const getAllPedidos = async (): Promise<pedidoAttributes[]> => {
    return pedido.findAll();
};

export const getPedidoById = async (id: number): Promise<pedidoAttributes | null> => {
    return pedido.findByPk(id);
};

export const getPedidosByEstado = async (estado: string | string[]): Promise<pedidoAttributes[]> => {
    try {
        const whereEstado = Array.isArray(estado)
            ? { [Op.in]: estado }
            : estado; // Si es solo un string, no usar Op.in

        const pedidos = await pedido.findAll({ 
            where: { 
                estado: whereEstado
            },
        });
        return pedidos;
    } catch (error) {
        console.error("Error fetching pedidos by estado:", error);
        throw error;
    }
};

export const getPedidosByFecha = async (fecha: string | Date): Promise<pedidoAttributes[]> => {
    try {
        const fechaISO = fecha instanceof Date ? fecha.toISOString() : new Date(fecha).toISOString();

        const pedidos = await pedido.findAll({
            where: {
                fecha: {
                    [Op.gt]: fechaISO, // Filtra pedidos con fecha mayor a la proporcionada
                },
            },
        });
        return pedidos;
    } catch (error) {
        console.error("Error fetching pedidos by fecha:", error);
        throw error;
    }
};

export const createPedido = async (data: pedidoCreationAttributes): Promise<pedidoAttributes> => {
    return pedido.create(data);
};

export const updatePedido = async (id: number, data: Partial<pedidoAttributes>): Promise<pedidoAttributes | null> => {
    const pedidoToUpdate = await pedido.findByPk(id);
    if (!pedidoToUpdate) return null;
    return pedidoToUpdate.update(data);
};

export const deletePedido = async (id: number): Promise<void> => {
    const pedidoToDelete = await pedido.findByPk(id);
    if (pedidoToDelete) {
        await pedidoToDelete.destroy();
    }
};