import { join } from "path";
import { DataSourceOptions } from "typeorm";
import { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { DataSourceFactory } from "./data-source-factory";

export class DataSourceMigrationFactory {
  public static fromOptions(opts: IDatabaseOptions): DataSourceOptions {
    const migrationsPath = join(__dirname, "../../migrations");

    return {
      ...DataSourceFactory.fromOptions(opts),
      migrations: [`${migrationsPath}/*{.ts,.js}`],
      migrationsTableName: "app_migration_db",
    };
  }
}
