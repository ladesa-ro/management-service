import { Logger, type Provider } from "@nestjs/common";
import { DataSource, type DataSourceOptions } from "typeorm";
import { ILoggerPort } from "@/domain/abstractions/logging";
import { DataSourceAppFactory } from "@/infrastructure.database/data-sources/factories/data-source-app-factory";
import type { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { IDatabaseOptions as IDatabaseOptionsToken } from "@/infrastructure.database/options/database-options.interface";
import { IConnectionHealthRegistry } from "@/shared/resilience/connection-health-registry.interface";
import { IAppTypeormConnection } from "./app-typeorm-connection.interface";
import { AppTypeormConnectionProxy } from "./app-typeorm-connection.proxy";

export const AppTypeormConnectionProvider: Provider = {
  provide: IAppTypeormConnection,

  useFactory: (
    opts: IDatabaseOptions | null,
    registry: IConnectionHealthRegistry,
    logger: ILoggerPort,
  ) => {
    if (!opts) {
      Logger.warn("Database not configured. All database operations will return 503.", "TypeORM");
      registry.register("database");
      registry.markUnavailable("database", "Database not configured");
      return new AppTypeormConnectionProxy(null);
    }

    const dataSource = new DataSource(DataSourceAppFactory.fromOptions(opts) as DataSourceOptions);

    Logger.log("App data source created.", "TypeORM");

    const proxy = new AppTypeormConnectionProxy(dataSource);

    proxy.startConnectionLoop(registry, logger);

    return proxy;
  },

  inject: [IDatabaseOptionsToken, IConnectionHealthRegistry, ILoggerPort],
};
