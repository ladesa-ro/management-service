import { appDataSourceProvider } from "@/infrastructure/persistence/typeorm/providers/app-data-source.provider";

export const typeormProviders = [
  // ...
  appDataSourceProvider,
];
