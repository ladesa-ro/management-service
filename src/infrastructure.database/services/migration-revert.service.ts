import type { DataSource } from "typeorm";
import type { IMigrationRevertService } from "@/infrastructure.database/services/interfaces/migration-revert.service.interface";

export class MigrationRevertService implements IMigrationRevertService {
  constructor(private readonly dataSource: DataSource) {}

  async execute(): Promise<void> {
    await this.dataSource.undoLastMigration();
    console.log("Last migration reverted.");
  }
}
