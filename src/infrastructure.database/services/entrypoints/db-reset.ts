import { getMigrationDataSource } from "@/infrastructure.database/data-sources/entrypoints/migration.data-source";
import { MigrationRunService } from "../migration-run.service";
import { SchemaDropService } from "../schema-drop.service";

const main = async () => {
  const dataSource = await getMigrationDataSource();
  await dataSource.initialize();

  try {
    const schemaDropService = new SchemaDropService(dataSource);
    await schemaDropService.execute();

    const migrationRunService = new MigrationRunService(dataSource);
    await migrationRunService.execute();
  } finally {
    await dataSource.destroy();
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
