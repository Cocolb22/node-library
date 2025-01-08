import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "corentin",
  password: "sckoll22",
  database: "library_db",
  synchronize: true, // Synchronise les entités automatiquement (à désactiver en production)
  migrations:[__dirname + "/migrations/*.ts"],
  entities: [__dirname + "/entities/*.ts"], // Où se trouvent les entités
  logging: true,
});
