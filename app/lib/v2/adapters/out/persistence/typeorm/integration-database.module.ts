import { Module } from "@nestjs/common";
import { DatabaseContextModule } from "@/modules/@database-context";
import { TypeormModule } from "@/modules/@shared/infrastructure/persistence/typeorm";

@Module({
  imports: [TypeormModule, DatabaseContextModule],
})
export class IntegrationDatabaseModule {}
