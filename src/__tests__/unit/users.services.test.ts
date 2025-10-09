import { jest } from '@jest/globals';

const mockUsuario: any = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn()
};
/*
jest.unstable_mockModule("../../models/init-models.js", () => ({
  usuario: mockUsuario
}));*/

jest.unstable_mockModule("../../config/dataBase.config.js", () => ({
  models: {
    usuario: mockUsuario
  }
}));

const { createUsuario, getAllUsuarios, getUsuarioById, updateUsuario, deleteUsuario } = await import("../../usuario/usuario.services.js");

describe ('Users Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create users', async () => {
    const mockUser = { id: 1, nombre: 'John Doe', email: 'doe@example.com' };
    mockUsuario.create.mockResolvedValue(mockUser);

    const result = await createUsuario(mockUser);

    expect(mockUsuario.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it ('should get all users', async () => {
    const mockUsers = [
      { id: 1, nombre: 'John Doe', email: 'doe@example.com' },
      { id: 2, nombre: 'Jane Doe', email: 'jane@example.com' },
      { id: 3, nombre: 'Jim Beam', email: 'jim@example.com' }
    ];
    mockUsuario.findAll.mockResolvedValue(mockUsers);

    const result = await getAllUsuarios();

    expect(mockUsuario.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  it ('should get user by id', async () => {
    const mockUser = { id: 1, nombre: 'John Doe', email: 'doe@example.com' };
    mockUsuario.findByPk.mockResolvedValue(mockUser);

    const result = await getUsuarioById(1);

    expect(mockUsuario.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  it ('should update user', async () => {
    const mockUser = { id: 1, nombre: 'John Doe', email: 'doe@example.com' };
    mockUsuario.update.mockResolvedValue([1, [mockUser]]);

    const result = await updateUsuario(1, mockUser);

    expect(mockUsuario.update).toHaveBeenCalledWith(mockUser, { where: { id: 1 }, returning: true });
    expect(result).toEqual([1, [mockUser]]);
  });

  it ('should delete user', async () => {
    mockUsuario.destroy.mockResolvedValue(1); // Simula que se eliminó 1 fila

    const result = await deleteUsuario(1);

    expect(mockUsuario.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(1);
  });

});