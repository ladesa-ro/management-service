import { join } from "path";
import { DataSourceOptions } from "typeorm";
import { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { DataSourceFactory } from "./data-source-factory";

export class DataSourceAppFactory {
  public static fromOptions(opts: IDatabaseOptions): DataSourceOptions {
    const entitiesPath = join(__dirname, "../../..");

    return {
      ...DataSourceFactory.fromOptions(opts),
      entities: [`${entitiesPath}/**/*.entity{.ts,.js}`],
    };
  }
}
