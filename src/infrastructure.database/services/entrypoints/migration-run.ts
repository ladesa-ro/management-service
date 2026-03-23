import { getMigrationDataSource } from "@/infrastructure.database/data-sources/entrypoints/migration.data-source";
import { MigrationRunService } from "../migration-run.service";

const main = async () => {
  const dataSource = await getMigrationDataSource();
  await dataSource.initialize();

  try {
    const service = new MigrationRunService(dataSource);
    await service.execute();
  } finally {
    await dataSource.destroy();
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
