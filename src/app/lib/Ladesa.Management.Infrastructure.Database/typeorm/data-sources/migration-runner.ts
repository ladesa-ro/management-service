import "reflect-metadata";
import { DataSource } from "typeorm";
import { DataSourceOptionsFactory } from "./DataSourceOptionsFactory";
import { getDataSourceDbConfig } from "./utils/getDataSourceDbConfig";

const getDataSource = async () => {
  const config = await getDataSourceDbConfig(null);
  const factory = new DataSourceOptionsFactory(config);
  const options = factory.getMigrationDataSourceOptions();
  return new DataSource({ ...options, logging: "all" });
};

export class MigrationRunner {
  static async up(): Promise<void> {
    const dataSource = await getDataSource();

    await dataSource.initialize();

    try {
      const migrations = await dataSource.runMigrations({ transaction: "each" });
      console.log(`Ran ${migrations.length} migration(s).`);
    } finally {
      await dataSource.destroy();
    }
  }

  static async down(): Promise<void> {
    const dataSource = await getDataSource();

    await dataSource.initialize();

    try {
      await dataSource.undoLastMigration({ transaction: "each" });
      console.log("Reverted last migration.");
    } finally {
      await dataSource.destroy();
    }
  }
}
