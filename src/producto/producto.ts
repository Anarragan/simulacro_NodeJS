import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { pedido_producto, pedido_productoId } from '../pedido_producto/pedido_producto.js';

export interface productoAttributes {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

export type productoPk = "id";
export type productoId = producto[productoPk];
export type productoCreationAttributes = productoAttributes;

export class producto extends Model<productoAttributes, productoCreationAttributes> implements productoAttributes {
  declare id: number;
  declare nombre: string;
  declare precio: number;
  declare categoria: string;

  // producto hasMany pedido_producto via producto_id
  pedido_productos!: pedido_producto[];
  getPedido_productos!: Sequelize.HasManyGetAssociationsMixin<pedido_producto>;
  setPedido_productos!: Sequelize.HasManySetAssociationsMixin<pedido_producto, pedido_productoId>;
  addPedido_producto!: Sequelize.HasManyAddAssociationMixin<pedido_producto, pedido_productoId>;
  addPedido_productos!: Sequelize.HasManyAddAssociationsMixin<pedido_producto, pedido_productoId>;
  createPedido_producto!: Sequelize.HasManyCreateAssociationMixin<pedido_producto>;
  removePedido_producto!: Sequelize.HasManyRemoveAssociationMixin<pedido_producto, pedido_productoId>;
  removePedido_productos!: Sequelize.HasManyRemoveAssociationsMixin<pedido_producto, pedido_productoId>;
  hasPedido_producto!: Sequelize.HasManyHasAssociationMixin<pedido_producto, pedido_productoId>;
  hasPedido_productos!: Sequelize.HasManyHasAssociationsMixin<pedido_producto, pedido_productoId>;
  countPedido_productos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof producto {
    return producto.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precio: {
      type: DataTypes.REAL,
      allowNull: false
    },
    categoria: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'producto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "producto_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
