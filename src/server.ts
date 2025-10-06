import { createApp } from './app.js';
import { connectDB, sequelize } from './config/dataBase.config.js';
import { initModels } from './models/init-models.js';

export async function startServer() {
    try {
        const app = await createApp();
        const PORT = process.env.PORT || 3000;

        await connectDB();
        initModels(sequelize);
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();