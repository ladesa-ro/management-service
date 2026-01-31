import { Module } from "@nestjs/common";
import { TypeormModule } from "@/@shared/infrastructure/persistence/typeorm";
import { DatabaseContextModule } from "@/database-context";

@Module({
  imports: [TypeormModule, DatabaseContextModule],
})
export class IntegrationDatabaseModule {}
