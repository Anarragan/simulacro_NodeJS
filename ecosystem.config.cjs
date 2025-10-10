module.exports = {
  apps: [
    {
      name: "papas-sushiria",     // Nombre del proceso PM2
      script: "./dist/server.js", // Tu punto de entrada compilado
      instances: "max",           // Usa todos los núcleos disponibles
      exec_mode: "cluster",       // Cluster mode para producción
      watch: false,               // No ver cambios (solo para dev)
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      // Opcional: puedes añadir manejo de logs personalizados
      output: "./logs/out.log",
      error: "./logs/error.log",
      merge_logs: true
    }
  ]
};