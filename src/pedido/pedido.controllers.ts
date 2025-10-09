import { getAllPedidos, getPedidoById, createPedido, updatePedido, deletePedido, getPedidosByEstado, getPedidosByFecha } from "./pedido.services.js";
import type { Request, Response } from "express";

export const fetchAllPedidos = async (req: Request, res: Response) => {
    try {
        const pedidos = await getAllPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
};

export const fetchPedidoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pedidoData = await getPedidoById(Number(id));
        if (!pedidoData) {
            return res.status(404).json({ error: "Pedido not found" });
        }
        res.status(200).json(pedidoData);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
}
};

export const fetchPedidosByEstado = async (req: Request, res: Response) => {
    const { estado } = req.params;
    if (typeof estado !== "string") {
        return res.status(400).json({ error: "Estado parameter is required" });
    }
    try {
        const pedidos = await getPedidosByEstado(estado);
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}

export const fetchPedidosByFecha = async (req: Request, res: Response) => {
    const { fecha } = req.params;
    if (!fecha || isNaN(Date.parse(fecha))) {
        return res.status(400).json({ error: "Valid fecha parameter is required" });
    }
    try {
        const pedidos = await getPedidosByFecha(new Date(fecha));
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
};

export const createNewPedido = async (req: Request, res: Response) => {
    const pedidoData = req.body;
    try {
        const newPedido = await createPedido(pedidoData);
        res.status(201).json(newPedido);
    } catch (error) {
        console.error("Error creating pedido:", error);
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}

export const updateExistingPedido = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pedidoData = req.body;
    try {
        const updatedPedido = await updatePedido(Number(id), pedidoData);
        if (!updatedPedido) {
            return res.status(404).json({ error: "Pedido not found" });
        }
        res.status(200).json(updatedPedido);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}

export const deleteExistingPedido = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deletePedido(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}
