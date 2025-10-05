import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { ESTADO_REPOSITORY, IEstadoRepositoryPort } from "@/features/estado/application/ports";
import {
  EstadoRepositoryAdapter
} from "@/features/estado/infrastructure/persistence/typeorm/repositories/estado.repository.adapter";
import { APP_DATA_SOURCE_TOKEN } from "@/infrastructure/persistence/typeorm/providers/app-data-source.provider";

export const EstadoRepositoryProvider: Provider = {
  provide: ESTADO_REPOSITORY,
  inject: [APP_DATA_SOURCE_TOKEN],
  useFactory: (dataSource: DataSource): IEstadoRepositoryPort => {
    return new EstadoRepositoryAdapter(dataSource);
  },
};
