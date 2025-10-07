import { jest } from '@jest/globals';
import { Op } from 'sequelize';

const mockPedido: any = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
};

jest.unstable_mockModule("../../pedido/pedido.js", () => ({
    pedido: mockPedido
}));

const { createPedido, getAllPedidos, getPedidoById, getPedidosByEstado, getPedidosByFecha } = await import("../../pedido/pedido.services.js");

describe('Pedido Services', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create pedido', async () => {
        const mockPedidoData = { id: 1, estado: 'pendiente', fecha: new Date() };
        mockPedido.create.mockResolvedValue(mockPedidoData);

        const result = await createPedido(mockPedidoData);

        expect(mockPedido.create).toHaveBeenCalledWith(mockPedidoData);
        expect(result).toEqual(mockPedidoData);
    });

    it('should get all pedidos', async () => {
        const mockPedidos = [
            { id: 1, estado: 'pendiente', fecha: new Date() },
            { id: 2, estado: 'completado', fecha: new Date() }
        ];
        mockPedido.findAll.mockResolvedValue(mockPedidos);

        const result = await getAllPedidos();

        expect(mockPedido.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockPedidos);
    });

    it('should get pedido by estado', async () => {
        const mockPedidoData = { id: 1, estado: 'pendiente', fecha: new Date() };
        mockPedido.findAll.mockResolvedValue([mockPedidoData]);

        const result = await getPedidosByEstado('pendiente');

        expect(mockPedido.findAll).toHaveBeenCalledWith({
            where: {
                estado: 'pendiente'
            }
        });
        expect(result).toEqual([mockPedidoData]);
    });
});