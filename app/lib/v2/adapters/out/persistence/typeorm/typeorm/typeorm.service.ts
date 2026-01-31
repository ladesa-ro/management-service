import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { DatabaseContextService } from "@/modules/@database-context";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm/providers/app-data-source.provider";

@Injectable()
export class TypeormService {
  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN)
    private appDataSource: DataSource,
  ) {}

  async getAppDataSource(): Promise<DataSource> {
    return this.appDataSource;
  }

  async getDatabaseContextApp() {
    const dataSource = await this.getAppDataSource();
    return new DatabaseContextService(dataSource);
  }
}
