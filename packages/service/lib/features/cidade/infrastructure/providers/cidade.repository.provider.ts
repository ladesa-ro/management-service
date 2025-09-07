import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CidadeRepositoryAdapter } from "@/features/cidade";
import { APP_DATA_SOURCE_TOKEN } from "@/infrastructure/persistence/typeorm/providers/app-data-source.provider";
import { CIDADE_REPOSITORY, ICidadeRepositoryPort } from "../../application/ports";

export const CidadeRepositoryProvider: Provider = {
  provide: CIDADE_REPOSITORY,

  inject: [APP_DATA_SOURCE_TOKEN],
  useFactory: (dataSource: DataSource): ICidadeRepositoryPort => {
    return new CidadeRepositoryAdapter(dataSource);
  },
};
