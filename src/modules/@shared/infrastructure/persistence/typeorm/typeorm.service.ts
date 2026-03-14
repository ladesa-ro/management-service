import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { APP_DATA_SOURCE_TOKEN } from "./providers/app-data-source.provider";

@DeclareImplementation()
export class TypeormService {
  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN)
    private appDataSource: DataSource,
  ) {}

  async getAppDataSource(): Promise<DataSource> {
    return this.appDataSource;
  }
}
