import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { initModels } from "../models/init-models.js";

const envFile = process.env.NODE_ENV === 'test' 
? path.resolve(process.cwd(), '.env.test') 
: path.resolve(process.cwd(), '.env');

dotenv.config({ path: envFile });
console.log(`Using environment file: ${envFile}`);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);

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
        console.log(`Conectado correctamente a la BD: ${process.env.DB_NAME} en ${process.env.DB_HOST}:${process.env.DB_PORT}`);
        initModels(sequelize);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}