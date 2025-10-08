import express from 'express';
import {router} from './usuario/usuario.routes.js';
import {router as productoRouter} from './producto/producto.routes.js';
import {router as pedidoRouter } from './pedido/pedido.routes.js';
import pedidoProductoRouter from './pedido_producto/pedido_producto.routes.js';

export const createApp = async (): Promise<express.Express> => {
    const app = express();
    app.use(express.json());
    app.use("/usuario", router);
    app.use("/producto", productoRouter);
    app.use("/pedido", pedidoRouter);
    app.use("/pedido_producto", pedidoProductoRouter);
    app.use("/categoria", productoRouter);
    app.use("/estado", pedidoRouter);
    app.use("/fecha", pedidoRouter);
    app.use("/total", pedidoProductoRouter);
    return app;
}