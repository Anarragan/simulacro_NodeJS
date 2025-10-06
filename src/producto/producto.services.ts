import { producto, type productoAttributes, type productoCreationAttributes } from "./producto.js";
import { Op } from 'sequelize';

export const getAllProductos = async () => {
    const productos = await producto.findAll();
    return productos;
};

export const getProductoById = async (id: number) => {
  const productoData = await producto.findByPk(id);
  return productoData;
};

export const getProductosByCategoria = async (categoria: string) => {
  try {
    const productos = await producto.findAll({
      where: {
        categoria: {
          [Op.like]: `%${categoria}%`,
        },
      },
    });
    return productos;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching productos by categoria: ${error.message}`);
    }
    throw new Error('Error fetching productos by categoria: Unknown error');
  }
};

export const createProducto = async (productoData: productoCreationAttributes) => {
  const newProducto = await producto.create(productoData);
  return newProducto;
};

export const updateProducto = async (id: number, productoData: Partial<productoAttributes>) => {
    const [updated] = await producto.update(productoData, {
        where: { id }
    });
    return updated;
};

export const deleteProducto = async (id: number) => {
  const deleted = await producto.destroy({
      where: { id }
  });
  return deleted;
};