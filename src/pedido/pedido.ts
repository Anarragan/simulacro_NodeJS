import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { pedido_producto, pedido_productoId } from '../pedido_producto/pedido_producto.js';
import type { usuario, usuarioId } from '../usuario/usuario.js';

export interface pedidoAttributes {
  id: number;
  fecha: Date;
  estado: string;
  usuario_id: number;
}

export type pedidoPk = "id";
export type pedidoId = pedido[pedidoPk];
export type pedidoOptionalAttributes = "fecha";
export type pedidoCreationAttributes = Optional<pedidoAttributes, pedidoOptionalAttributes>;

export class pedido extends Model<pedidoAttributes, pedidoCreationAttributes> implements pedidoAttributes {
  declare id: number;
  declare fecha: Date;
  declare estado: string;
  declare usuario_id: number;

  // pedido hasMany pedido_producto via pedido_id
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
  // pedido belongsTo usuario via usuario_id
  usuario!: usuario;
  getUsuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof pedido {
    return pedido.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    estado: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "pendiente"
    },
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'pedido',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pedido_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
