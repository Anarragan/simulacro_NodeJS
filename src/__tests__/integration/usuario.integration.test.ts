import request from 'supertest';
import type { Express } from 'express';
import { createApp } from '../../app.js';
import { sequelize } from '../../config/dataBase.config.js';
import { initModels } from '../../models/init-models.js';

let app: Express;

beforeAll(async () => {
    initModels(sequelize);
    await sequelize.authenticate();

  //sincronizar primero las tablas sin dependencias
  await sequelize.models.usuario.sync({ force: true });
  await sequelize.models.producto.sync({ force: true });

//luego las tablas con dependencias
  await sequelize.models.pedido.sync({ force: true });
  await sequelize.models.pedido_producto.sync({ force: true });

  console.log('Tablas sincronizadas correctamente');
  app = await createApp();
});

afterAll(async () => {
    await sequelize.close();
    console.log('Database connection closed');
});

describe('Integracion - Usuarios', () => {
    it('Deberia crear un nuevo usuario', async () => {
        const response = await request(app)
            .post('/usuario')
            .send({
                nombre: 'Juan Perez',
                email: 'juan.perez@example.com'
            });

        console.log('Response Body:', response.body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nombre).toBe('Juan Perez');
        expect(response.body.email).toBe('juan.perez@example.com');
    });

    it('Deberia obtener todos los usuarios', async () => {
        const response = await request(app).get('/usuario/all');

        console.log('Response Body:', response.body);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('Deberia obtener un usuario por ID', async () => {
        // Primero, crea un usuario para asegurarte de que existe
        const newUserResponse = await request(app)
            .post('/usuario')
            .send({
                nombre: 'Maria Lopez',
                email: 'maria.lopez@example.com'
            });

        const userId = newUserResponse.body.id;

        const response = await request(app).get(`/usuario/${userId}`);

        console.log('Response Body:', response.body);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', userId);
        expect(response.body).toHaveProperty('nombre', 'Maria Lopez');
        expect(response.body).toHaveProperty('email', 'maria.lopez@example.com');
    });

    it('Deberia actualizar un usuario existente', async () => {
        // Primero, crea un usuario para asegurarte de que existe
        const newUserResponse = await request(app)
            .post('/usuario')
            .send({
                nombre: 'Carlos Sanchez',
                email: 'carlos.sanchez@example.com'
            });

        const userId = newUserResponse.body.id;

        const response = await request(app)
            .put(`/usuario/${userId}`)
            .send({
                nombre: 'Carlos Updated',
                email: 'carlos.updated@example.com'
            });

        console.log('Response Body:', response.body);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', userId);
        expect(response.body).toHaveProperty('nombre', 'Carlos Updated');
        expect(response.body).toHaveProperty('email', 'carlos.updated@example.com');
    });
    it('Deberia eliminar un usuario existente', async () => {
        // Primero, crea un usuario para asegurarte de que existe
        const newUserResponse = await request(app)
            .post('/usuario')
            .send({
                nombre: 'Ana Torres',
                email: 'ana.torres@example.com'
            });

        const userId = newUserResponse.body.id;

        const response = await request(app)
            .delete(`/usuario/${userId}`);

        console.log('Response Body:', response.body);

        expect(response.status).toBe(204);
    });
});