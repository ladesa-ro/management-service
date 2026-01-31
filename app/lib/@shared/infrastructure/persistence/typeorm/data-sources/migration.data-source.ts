import type { IConfigPort } from "@/modules/@shared/application/ports/out/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { getDataSourceAppConfigService } from "./utils/getDataSourceEnvironmentConfigService";

export const getMigrationDataSource = async (appConfigServiceBase: IConfigPort | null = null) => {
  const appConfigService = await getDataSourceAppConfigService(appConfigServiceBase);

  const options = appConfigService.getTypeOrmMigrationDataSourceOptions();

  console.log({ options });

  const dataSource = new DataSource(options);

  return dataSource;
};

const migrationDataSource = getMigrationDataSource();

export default migrationDataSource;
