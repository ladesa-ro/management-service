import { AppConfigService } from "@/infrastructure/config";
import "reflect-metadata";
import { DataSource, type DataSourceOptions } from "typeorm";
import { getDataSourceAppConfigService } from "./utils/getDataSourceEnvironmentConfigService";

export const getMigrationDataSource = async (appConfigServiceBase: AppConfigService | null = null) => {
  const appConfigService = await getDataSourceAppConfigService(appConfigServiceBase);

  const options = appConfigService.getTypeOrmMigrationDataSourceOptions();

  console.log({ options });

  const dataSource = new DataSource(options as DataSourceOptions);

  return dataSource;
};

const migrationDataSource = getMigrationDataSource();

export default migrationDataSource;
