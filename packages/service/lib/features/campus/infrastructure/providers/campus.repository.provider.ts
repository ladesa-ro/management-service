import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CAMPUS_REPOSITORY, ICampusRepositoryPort } from "@/features/campus/application/ports";
import {
  CampusRepositoryAdapter
} from "@/features/campus/infrastructure/persistence/typeorm/repositories/campus.repository.adapter";
import { APP_DATA_SOURCE_TOKEN } from "@/infrastructure/persistence/typeorm/providers/app-data-source.provider";

export const CampusRepositoryProvider: Provider = {
  provide: CAMPUS_REPOSITORY,
  inject: [APP_DATA_SOURCE_TOKEN],
  useFactory: (dataSource: DataSource): ICampusRepositoryPort => {
    return new CampusRepositoryAdapter(dataSource);
  },
};
