import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { EnderecoRepositoryAdapter } from "@/features/endereco/infrastructure";
import { APP_DATA_SOURCE_TOKEN } from "@/infrastructure/persistence/typeorm/providers/app-data-source.provider";
import { ENDERECO_REPOSITORY, type IEnderecoRepositoryPort } from "../../application/ports";

export const EnderecoRepositoryProvider: Provider = {
  provide: ENDERECO_REPOSITORY,

  inject: [APP_DATA_SOURCE_TOKEN],
  useFactory: (dataSource: DataSource): IEnderecoRepositoryPort => {
    return new EnderecoRepositoryAdapter(dataSource);
  },
};
