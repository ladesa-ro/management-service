import type { DataSourceOptions } from "typeorm";
import { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";

export class DataSourceFactory {
  public static fromOptions(opts: IDatabaseOptions): DataSourceOptions {
    const result: DataSourceOptions = {
      type: "postgres" as const,
      schema: opts.schema,
      synchronize: false,
    };

    if (opts.url) {
      Object.assign(result, {
        url: opts.url,
      });
    }

    if (opts.useSSL !== "false") {
      Object.assign(result, {
        options: {
          validateConnection: false,
          trustServerCertificate: true,
        },
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      });
    }

    return result;
  }
}
