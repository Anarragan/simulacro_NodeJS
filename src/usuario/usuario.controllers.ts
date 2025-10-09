import type { Request, Response } from "express";
import { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from "./usuario.services.js";

export const fetchAllUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await getAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
};

export const fetchUsuarioById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await getUsuarioById(Number(id));
        if (!usuario) {
            return res.status(404).json({ error: "Usuario not found" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}

export const createNewUsuario = async (req: Request, res: Response) => {
    const usuarioData = req.body;
    try {
        const newUsuario = await createUsuario(usuarioData);
        res.status(201).json(newUsuario);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}

export const updateExistingUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuarioData = req.body;
    try {
        const [updatedCount, updatedRows] = await updateUsuario(Number(id), usuarioData);
        if (updatedCount === 0) {
            return res.status(404).json({ error: "Usuario not found" });
        }

        const updatedUsuario = updatedRows[0];
        res.status(200).json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}

export const deleteExistingUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteUsuario(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
}