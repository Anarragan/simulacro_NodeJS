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

  console.log("Tablas sincronizadas correctamente");
  app = await createApp();
});

afterAll(async () => {
  await sequelize.close();
  console.log("Database connection closed");
});

describe ("Integracion de Productos", () => {
    it("should create a new producto", async () => {
        await request(app)
            .post("/producto")
            .send({
                nombre: "Producto Test",
                descripcion: "Descripcion del producto test",
                precio: 100.50,
                categoria: "Categoria Test"
            });
    });

    it ("should fetch all productos", async () => {
        const response = await request (app).get("/producto/all");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it ("should fetch a producto by ID", async () => {
        // Primero, crea un producto para asegurarte de que existe
        const newProductoResponse = await request(app)
            .post("/producto")
            .send({
                nombre: "Producto para buscar",
                descripcion: "Descripcion del producto para buscar",
                precio: 200.75,
                categoria: "Categoria Buscar"
            });

        expect(newProductoResponse.status).toBe(201);
        const productoId = newProductoResponse.body.id;

        // Ahora, intenta obtener el producto por su ID
        const fetchResponse = await request(app).get(`/producto/${productoId}`);
        expect(fetchResponse.status).toBe(200);
        expect(fetchResponse.body).toHaveProperty("id", productoId);
        expect(fetchResponse.body.nombre).toBe("Producto para buscar");
    });

    it ("should fetch productos by categoria", async () => {
        // Primero, crea un producto con una categoria específica
        const categoria = "Categoria Especial";
        await request(app)
            .post("/producto")
            .send({
                nombre: "Producto Categoria",
                descripcion: "Descripcion del producto categoria",
                precio: 150.00,
                categoria: categoria
            });

        // Ahora, intenta obtener productos por esa categoria
        const fetchResponse = await request(app).get(`/producto/categoria/${encodeURIComponent(categoria)}`);
        expect(fetchResponse.status).toBe(200);
        expect(Array.isArray(fetchResponse.body)).toBe(true);
        expect(fetchResponse.body.length).toBeGreaterThan(0);
        expect(fetchResponse.body[0].categoria).toBe(categoria);
    });

    it ("should update an existing producto", async () => {
        // Primero, crea un producto para actualizarlo después
        const newProductoResponse = await request(app)
            .post("/producto")
            .send({
                nombre: "Producto a actualizar",
                descripcion: "Descripcion del producto a actualizar",
                precio: 300.00,
                categoria: "Categoria Actualizar"
            });

        expect(newProductoResponse.status).toBe(201);
        const productoId = newProductoResponse.body.id;

        // Ahora, actualiza el producto
        const updateResponse = await request(app)
            .put(`/producto/${productoId}`)
            .send({
                nombre: "Producto Actualizado",
                precio: 350.00
            });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toHaveProperty("id", productoId);
        expect(updateResponse.body.nombre).toBe("Producto Actualizado");
        expect(updateResponse.body.precio).toBe(350.00);
    });

    it ("should delete an existing producto", async () => {
        // Primero, crea un producto para eliminarlo después
        const newProductoResponse = await request(app)
            .post("/producto")
            .send({
                nombre: "Producto a eliminar",
                descripcion: "Descripcion del producto a eliminar",
                precio: 400.00,
                categoria: "Categoria Eliminar"
            });

        expect(newProductoResponse.status).toBe(201);
        const productoId = newProductoResponse.body.id;

        // Ahora, elimina el producto
        const deleteResponse = await request(app).delete(`/producto/${productoId}`);
        expect(deleteResponse.status).toBe(204);
        expect(deleteResponse.body).toEqual({});
        // Verifica que el producto ya no existe
        const fetchResponse = await request(app).get(`/producto/${productoId}`);
        expect(fetchResponse.status).toBe(404);
        expect(fetchResponse.body).toHaveProperty("error", "Producto not found");
    });
});