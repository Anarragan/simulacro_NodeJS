import { getAllProductos, getProductoById, createProducto, updateProducto, deleteProducto, getProductosByCategoria } from "./producto.services.js";
import type { Request, Response } from "express";

export const fetchAllProductos = async (req: Request, res: Response) => {
    try {
        const productos = await getAllProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
};

export const fetchProductoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const productoData = await getProductoById(Number(id));
        if (!productoData) {
            return res.status(404).json({ error: "Producto not found" });
        }
        res.status(200).json(productoData);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}

export const fetchProductosByCategoria = async (req: Request, res: Response) => {
    const { categoria } = req.params;
    if (typeof categoria !== "string") {
        return res.status(400).json({ error: "Categoria parameter is required" });
    }
    try {
        const productos = await getProductosByCategoria(categoria);
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}

export const createNewProducto = async (req: Request, res: Response) => {
    const productoData = req.body;
    try {
        const newProducto = await createProducto(productoData);
        res.status(201).json(newProducto);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}

export const updateExistingProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const productoData = req.body;
    try {
        const [updatedCount, updatedProducto] = await updateProducto(Number(id), productoData);
        if (updatedCount === 0) {
            return res.status(404).json({ error: "Producto not found" });
        }
        res.status(200).json(updatedProducto[0]);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}

export const deleteExistingProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteProducto(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}