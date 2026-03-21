import type { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/conn.interface";

@DeclareImplementation()
export class TypeormService {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private appTypeormConnection: IAppTypeormConnection,
  ) {}

  async getAppDataSource(): Promise<DataSource> {
    return this.appTypeormConnection as DataSource;
  }
}
