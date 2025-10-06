import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { pedido, pedidoId } from '../pedido/pedido.js';
import type { producto, productoId } from '../producto/producto.js';

export interface pedido_productoAttributes {
  id: number;
  pedido_id: number;
  producto_id: number;
  cantidad: number;
}

export type pedido_productoPk = "id";
export type pedido_productoId = pedido_producto[pedido_productoPk];
export type pedido_productoCreationAttributes = pedido_productoAttributes;

export class pedido_producto extends Model<pedido_productoAttributes, pedido_productoCreationAttributes> implements pedido_productoAttributes {
  id!: number;
  pedido_id!: number;
  producto_id!: number;
  cantidad!: number;

  // pedido_producto belongsTo pedido via pedido_id
  pedido!: pedido;
  getPedido!: Sequelize.BelongsToGetAssociationMixin<pedido>;
  setPedido!: Sequelize.BelongsToSetAssociationMixin<pedido, pedidoId>;
  createPedido!: Sequelize.BelongsToCreateAssociationMixin<pedido>;
  // pedido_producto belongsTo producto via producto_id
  producto!: producto;
  getProducto!: Sequelize.BelongsToGetAssociationMixin<producto>;
  setProducto!: Sequelize.BelongsToSetAssociationMixin<producto, productoId>;
  createProducto!: Sequelize.BelongsToCreateAssociationMixin<producto>;

  static initModel(sequelize: Sequelize.Sequelize): typeof pedido_producto {
    return pedido_producto.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    pedido_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'pedido',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'producto',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pedido_producto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pedido_producto_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
