import { getMigrationDataSource } from "@/infrastructure.database/data-sources/entrypoints/migration.data-source";
import { MigrationRevertService } from "../migration-revert.service";

const main = async () => {
  const dataSource = await getMigrationDataSource();
  await dataSource.initialize();

  try {
    const service = new MigrationRevertService(dataSource);
    await service.execute();
  } finally {
    await dataSource.destroy();
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
