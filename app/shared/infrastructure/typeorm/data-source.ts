import { DataSource } from "typeorm";

export const APP_DATA_SOURCE_TOKEN = Symbol("Ladesa.ManagementService.Typeorm.DataSource.App");

export const makeDataSource = () => {
  const ds = new DataSource({});
  return ds.initialize();
};
