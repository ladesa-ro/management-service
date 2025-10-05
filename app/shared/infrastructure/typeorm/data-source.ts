import { DataSource } from "typeorm";
import { EstadoDatabaseEntity } from "@/features/estado/infrastructure";

export const APP_DATA_SOURCE_TOKEN = Symbol("Ladesa.ManagementService.Typeorm.DataSource.App");

export const makeDataSource = () => {
  const ds = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "management-service-user",
    password: "management-service-pass",
    database: "management-service",
    entities: [EstadoDatabaseEntity],
  });
  return ds.initialize();
};
