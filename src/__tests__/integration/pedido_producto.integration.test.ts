import request from "supertest";
import type { Express } from "express";
import { createApp } from "../../app.js";
import { sequelize } from "../../config/dataBase.config.js";
import { initModels } from "../../models/init-models.js";

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

  app = await createApp();
});

afterAll(async() => {
    await sequelize.close();
});

describe ("Integracion de pedido_producto", () => {
    it("should create a new pedido_producto, fetching and calculate total", async () => {
        // Primero, crea un usuario
        const user = await request(app)
            .post("/usuario")
            .send({
                nombre: "Usuario Test",
                email: "usuario@test.com"
            });
        expect(user.status).toBe(201);
        const userId = user.body.id;

        // Luego, crea un producto
        const producto = await request(app)
            .post("/producto")
            .send({
                nombre: "Producto Test",
                descripcion: "Descripcion del producto test",
                precio: 100.50,
                categoria: "Test"
            });
        expect(producto.status).toBe(201);
        const productoId = producto.body.id;

        // Finalmente, crea un pedido
        const pedido = await request(app)
            .post("/pedido")
            .send({
                usuario_id: userId,
                total: 100.50,
                fecha: new Date()
            });
        expect(pedido.status).toBe(201);
        const pedidoId = pedido.body.id;

        // Ahora, crea un pedido_producto
        const pedidoProducto = await request(app)
            .post("/pedido_producto")
            .send({
                pedido_id: pedidoId,
                producto_id: productoId,
                cantidad: 2
            });
        expect(pedidoProducto.status).toBe(201);
        expect(pedidoProducto.body).toHaveProperty("id");
        expect(pedidoProducto.body.pedido_id).toBe(pedidoId);
        expect(pedidoProducto.body.producto_id).toBe(productoId);
        expect(Number(pedidoProducto.body.cantidad)).toBe(2);


        // Obtener los productos del pedido
        const productos = await request(app).get(`/pedido_producto/${pedidoId}`);
        expect(productos.status).toBe(200);
        expect(Array.isArray(productos.body)).toBe(true);
        expect(productos.body[0].pedido_id).toBe(pedidoId);


        // Calcular el total del pedido
        const totalResponse = await request(app).get(`/pedido_producto/total/${pedidoId}`);
        expect(totalResponse.status).toBe(200);
        expect(totalResponse.body).toHaveProperty("total");
        expect(Number(totalResponse.body.total)).toBeCloseTo(201.00); // 100.50 * 2 = 201.00
    });
});