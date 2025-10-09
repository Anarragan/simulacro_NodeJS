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

describe('Integracion de Pedidos', () => {
    it ('should create a new pedido', async () => {

        // crear un usuario
        const user = await request(app)
        .post('/usuario')
        .send({
            nombre: 'Juan',
            email: 'juan@example.com'
        });

        // crear un pedido asociado al usuario
        const pedido = await request(app)
        .post('/pedido')
        .send({
            usuario_id: user.body.id, // Asegúrate de que este usuario exista en la base de datos
            estado: 'pendiente'
        });

        expect(pedido.status).toBe(201);
    });
});