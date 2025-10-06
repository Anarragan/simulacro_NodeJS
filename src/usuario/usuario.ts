import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { pedido, pedidoId } from '../pedido/pedido.js';

export interface usuarioAttributes {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export type usuarioPk = "id";
export type usuarioId = usuario[usuarioPk];
export type usuarioOptionalAttributes = "rol";
export type usuarioCreationAttributes = Optional<usuarioAttributes, usuarioOptionalAttributes>;

export class usuario extends Model<usuarioAttributes, usuarioCreationAttributes> implements usuarioAttributes {
  declare id: number;
  declare nombre: string;
  declare email: string;
  declare rol: string;

  // usuario hasMany pedido via usuario_id
  pedidos!: pedido[];
  getPedidos!: Sequelize.HasManyGetAssociationsMixin<pedido>;
  setPedidos!: Sequelize.HasManySetAssociationsMixin<pedido, pedidoId>;
  addPedido!: Sequelize.HasManyAddAssociationMixin<pedido, pedidoId>;
  addPedidos!: Sequelize.HasManyAddAssociationsMixin<pedido, pedidoId>;
  createPedido!: Sequelize.HasManyCreateAssociationMixin<pedido>;
  removePedido!: Sequelize.HasManyRemoveAssociationMixin<pedido, pedidoId>;
  removePedidos!: Sequelize.HasManyRemoveAssociationsMixin<pedido, pedidoId>;
  hasPedido!: Sequelize.HasManyHasAssociationMixin<pedido, pedidoId>;
  hasPedidos!: Sequelize.HasManyHasAssociationsMixin<pedido, pedidoId>;
  countPedidos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof usuario {
    return usuario.init({
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
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "usuario_email_key"
    },
    rol: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "cliente"
    }
  }, {
    sequelize,
    tableName: 'usuario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuario_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "usuario_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
