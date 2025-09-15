import { Sequelize } from "sequelize";
import {
  DATABASE_USER,
  DATABASE_KEY,
  DATABASE_HOST,
  DATABASE_NAME,
} from "../config/env.js";

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_KEY, {
  host: DATABASE_HOST,
  dialect: "mariadb",
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conectado ao banco de dados");
  })
  .catch((err) => {
    console.error("❌ Falha na conexão com o banco de dados:", err);
  });

// Para sincronizar modelos sem apagar tabelas existentes:
// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log("Modelos sincronizados com sucesso!");
//   })
//   .catch((err) => {
//     console.error("Erro ao sincronizar modelos:", err);
//   });

export default sequelize;
