import type { DataSource } from "typeorm";
import type { ISchemaDropService } from "@/infrastructure.database/services/interfaces/schema-drop.service.interface";

export class SchemaDropService implements ISchemaDropService {
  constructor(private readonly dataSource: DataSource) {}

  async execute(): Promise<void> {
    await this.dataSource.dropDatabase();
    console.log("Database schema dropped.");
  }
}
