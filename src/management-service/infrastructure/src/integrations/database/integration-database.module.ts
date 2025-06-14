import { Module } from "@nestjs/common";
import { DatabaseContextModule } from "./context";
import { TypeormModule } from "./typeorm";

@Module({
  imports: [TypeormModule, DatabaseContextModule],
})
export class IntegrationDatabaseModule {}
