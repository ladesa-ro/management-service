import type { DataSourceOptions } from "typeorm";
import { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";

export function buildDataSourceConnectionOptions(
  opts: IDatabaseOptions,
): Partial<DataSourceOptions> {
  const result: Partial<DataSourceOptions> = {
    type: "postgres" as const,
    schema: opts.schema,
    synchronize: false,
  };

  if (opts.url) {
    Object.assign(result, { url: opts.url });
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
