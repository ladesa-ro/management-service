import { Module } from "@nestjs/common";
import { TypeormModule } from "../../../infrastructure/persistence/typeorm";
import { DatabaseContextModule } from "./context";

@Module({
  imports: [TypeormModule, DatabaseContextModule],
})
export class IntegrationDatabaseModule {
}
