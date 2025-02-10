import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "corentin",
  password: "sckoll22",
  database: "library_db",
  synchronize: true,
  migrations:["src/migrations/*.ts"],
  entities: ["src/entities/*.ts"],
  logging: true,
});
