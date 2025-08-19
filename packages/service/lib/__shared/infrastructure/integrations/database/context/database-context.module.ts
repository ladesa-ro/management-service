import { Global, Module } from "@nestjs/common";
import { DatabaseContextService } from "./domain/database-context.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseContextService],
  exports: [DatabaseContextService],
})
export class DatabaseContextModule {
}
