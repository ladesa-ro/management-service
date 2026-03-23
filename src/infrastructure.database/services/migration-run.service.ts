import type { DataSource } from "typeorm";
import type { IMigrationRunService } from "@/infrastructure.database/services/interfaces/migration-run.service.interface";

export class MigrationRunService implements IMigrationRunService {
  constructor(private readonly dataSource: DataSource) {}

  async execute(): Promise<void> {
    const migrations = await this.dataSource.runMigrations();

    if (migrations.length === 0) {
      console.log("No pending migrations.");
    } else {
      console.log(`Executed ${migrations.length} migration(s):`);

      for (const migration of migrations) {
        console.log(`  - ${migration.name}`);
      }
    }
  }
}
