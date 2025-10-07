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
  return await usuario.update(usuarioData, { where: { id } });
};

export const deleteUsuario = async (id: number) => {
    return await usuario.destroy({ where: { id } });
};

