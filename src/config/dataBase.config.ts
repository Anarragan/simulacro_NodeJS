import { Sequelize } from "sequelize";
import 'dotenv/config';
import { initModels } from "../models/init-models.js";

const isTest = process.env.NODE_ENV === 'test';

export const sequelize = new Sequelize({
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
});

export const models = initModels(sequelize);

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        initModels(sequelize);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

if (isTest) {
  connectDB();
}
