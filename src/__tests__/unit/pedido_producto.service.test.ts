import { jest } from '@jest/globals';

const mockPedidoProducto: any = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(), // necesario para getPriceByPedidoId
};

const mockProducto: any = {
  findOne: jest.fn()
};

jest.unstable_mockModule("../../models/init-models.js", () => ({
  pedido_producto: mockPedidoProducto
}));

jest.unstable_mockModule("../../producto/producto.js", () => ({
  producto: mockProducto
}));

const { createPedidoProducto, getPedidoProductoByPedidoId, getPriceByPedidoId } = await import("../../pedido_producto/pedido_Producto.services.js");

describe('Pedido_Producto Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create pedido_producto', async () => {
    const mockPedidoProductoData = { id: 1, pedido_id: 1, producto_id: 1, cantidad: 2 };
    mockPedidoProducto.create.mockResolvedValue(mockPedidoProductoData);

    const result = await createPedidoProducto(mockPedidoProductoData);

    expect(mockPedidoProducto.create).toHaveBeenCalledWith(mockPedidoProductoData);
    expect(result).toEqual(mockPedidoProductoData);
  });

  it('should get pedido by pedido_id', async () => {
    const mockPedidoProductos = [
      { id: 1, pedido_id: 1, producto_id:   1, cantidad: 2 },
      { id: 2, pedido_id: 1, producto_id: 2, cantidad: 3 }
    ];
    mockPedidoProducto.findAll.mockResolvedValue(mockPedidoProductos);

    const result = await getPedidoProductoByPedidoId(1);

    expect(mockPedidoProducto.findAll).toHaveBeenCalledWith({ where: { pedido_id: 1 } });
    expect(result).toEqual(mockPedidoProductos);
  });

  it('should get total price by pedido_id', async () => {
    const mockTotal = [{ total: '500' }];
    mockPedidoProducto.findAll.mockResolvedValue(mockTotal);

    const result = await getPriceByPedidoId(1);

    // Llamado básico
    expect(mockPedidoProducto.findAll).toHaveBeenCalledTimes(1);
    const callArg = mockPedidoProducto.findAll.mock.calls[0][0];

    // Verificaciones parciales sin acoplar a la representación interna de Sequelize.fn
    expect(callArg.where).toEqual({ pedido_id: 1 });
    expect(callArg.raw).toBe(true);
    expect(Array.isArray(callArg.attributes)).toBe(true);
    expect(callArg.attributes[0][1]).toBe('total'); // alias
    expect(callArg.include[0].as).toBe('producto');
    expect(result).toBe(500);
  });

});