import type { IConfigInfrastructureDatabase } from "../../Config/IConfigInfrastructureDatabase";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { DataSourceOptionsFactory } from "./DataSourceOptionsFactory";
import { getDataSourceDbConfig } from "./utils/getDataSourceDbConfig";

export const getMigrationDataSource = async (
  configBase: IConfigInfrastructureDatabase | null = null,
) => {
  const config = await getDataSourceDbConfig(configBase);

  const factory = new DataSourceOptionsFactory(config);
  const options = factory.getMigrationDataSourceOptions();

  const dataSource = new DataSource(options);

  return dataSource;
};

const migrationDataSource = getMigrationDataSource();

export default migrationDataSource;
