import type { Sequelize } from "sequelize";
import { pedido as _pedido } from "../pedido/pedido.js";
import type { pedidoAttributes, pedidoCreationAttributes } from "../pedido/pedido.js";
import { pedido_producto as _pedido_producto } from "../pedido_producto/pedido_producto.js";
import type { pedido_productoAttributes, pedido_productoCreationAttributes } from "../pedido_producto/pedido_producto.js";
import { producto as _producto } from "../producto/producto.js";
import type { productoAttributes, productoCreationAttributes } from "../producto/producto.js";
import { usuario as _usuario } from "../usuario/usuario.js";
import type { usuarioAttributes, usuarioCreationAttributes } from "../usuario/usuario.js";

export {
  _pedido as pedido,
  _pedido_producto as pedido_producto,
  _producto as producto,
  _usuario as usuario,
};

export type {
  pedidoAttributes,
  pedidoCreationAttributes,
  pedido_productoAttributes,
  pedido_productoCreationAttributes,
  productoAttributes,
  productoCreationAttributes,
  usuarioAttributes,
  usuarioCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const pedido = _pedido.initModel(sequelize);
  const pedido_producto = _pedido_producto.initModel(sequelize);
  const producto = _producto.initModel(sequelize);
  const usuario = _usuario.initModel(sequelize);

  pedido_producto.belongsTo(pedido, { as: "pedido", foreignKey: "pedido_id"});
  pedido.hasMany(pedido_producto, { as: "pedido_productos", foreignKey: "pedido_id"});
  pedido_producto.belongsTo(producto, { as: "producto", foreignKey: "producto_id"});
  producto.hasMany(pedido_producto, { as: "pedido_productos", foreignKey: "producto_id"});
  pedido.belongsTo(usuario, { as: "usuario", foreignKey: "usuario_id"});
  usuario.hasMany(pedido, { as: "pedidos", foreignKey: "usuario_id"});

  return {
    pedido: pedido,
    pedido_producto: pedido_producto,
    producto: producto,
    usuario: usuario,
  };
}