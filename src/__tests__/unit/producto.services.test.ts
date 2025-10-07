import {jest} from '@jest/globals';

const mockProducto: any {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
}

jest.unstable_mockModule("../../models/init-models.js", () => ({
    producto: mockProducto
}));

const 
