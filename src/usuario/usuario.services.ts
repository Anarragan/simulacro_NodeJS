import { usuario, type usuarioCreationAttributes, type usuarioAttributes } from "../models/init-models.js";

export const getAllUsuarios = async () => {
  const usuarios = await usuario.findAll();
  return usuarios;
};

export const getUsuarioById = async (id: number) => {
  const usuarioData = await usuario.findByPk(id);
  return usuarioData;
};

export const createUsuario = async (usuarioData: usuarioCreationAttributes) => {
  const newUsuario = await usuario.create(usuarioData);
  return newUsuario;
};

export const updateUsuario = async (id: number, usuarioData: Partial<usuarioAttributes>) => {
  const [updatedRows] = await usuario.update(usuarioData, { where: { id } });
    if (updatedRows === 0) {
      throw new Error("Usuario not found or no changes made");
    }
    const updatedUsuario = await usuario.findByPk(id);
    return updatedUsuario;
};

export const deleteUsuario = async (id: number) => {
    const deletedRows = await usuario.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new Error("Usuario not found");
    }
    return deletedRows;
  }

