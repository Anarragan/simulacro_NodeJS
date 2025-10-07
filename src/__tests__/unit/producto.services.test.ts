import {jest} from '@jest/globals';
import { Op } from 'sequelize';

const mockProducto: any = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
}

jest.unstable_mockModule("../../models/init-models.js", () => ({
    producto: mockProducto
}));

const { createProducto, getAllProductos, getProductoById, getProductosByCategoria, updateProducto, deleteProducto } = await import("../../producto/producto.services.js");

describe('Producto Services', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create producto', async () => {
        const mockProduct = { id: 1, nombre: 'Producto 1', categoria: 'Categoria A', precio: 100 };
        mockProducto.create.mockResolvedValue(mockProduct);

        const result = await createProducto(mockProduct);

        expect(mockProducto.create).toHaveBeenCalledWith(mockProduct);
        expect(result).toEqual(mockProduct);
    });

    it('should get all productos', async () => {
        const mockProducts = [
            { id: 1, nombre: 'Producto 1', categoria: 'Categoria A', precio: 100 },
            { id: 2, nombre: 'Producto 2', categoria: 'Categoria B', precio: 200 },
            { id: 3, nombre: 'Producto 3', categoria: 'Categoria A', precio: 150 }
        ];
        mockProducto.findAll.mockResolvedValue(mockProducts);

        const result = await getAllProductos();

        expect(mockProducto.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockProducts);
    });

    it('should get producto by id', async () => {
        const mockProduct = { id: 1, nombre: 'Producto 1', categoria: 'Categoria A', precio: 100 };
        mockProducto.findByPk.mockResolvedValue(mockProduct);

        const result = await getProductoById(1);

        expect(mockProducto.findByPk).toHaveBeenCalledWith(1);
        expect(result).toEqual(mockProduct);
    });

    it('should get productos by categoria', async () => {
        const mockProducts = [
            { id: 1, nombre: 'Producto 1', categoria: 'Categoria A', precio: 100 },
            { id: 3, nombre: 'Producto 3', categoria: 'Categoria A', precio: 150 }
        ];
        mockProducto.findAll.mockResolvedValue(mockProducts);

        const result = await getProductosByCategoria('Categoria A');

        expect(mockProducto.findAll).toHaveBeenCalledWith({
            where: {
                categoria: {
                    [Op.like]: '%Categoria A%',
                },
            },
        });
        expect(result).toEqual(mockProducts);
    });

    it('should update producto', async () => {
        const mockProduct = { id: 1, nombre: 'Producto 1', categoria: 'Categoria A', precio: 100 };
        mockProducto.update.mockResolvedValue([1]);

        const result = await updateProducto(1, mockProduct);    

        expect(mockProducto.update).toHaveBeenCalledWith(mockProduct, { where: { id: 1 } });
        expect(result).toEqual([1]);
    });

    it('should delete producto', async () => {
        mockProducto.destroy.mockResolvedValue(1); // Simula que se eliminó 1 fila

        const result = await deleteProducto(1);

        expect(mockProducto.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(1);
    });
});
