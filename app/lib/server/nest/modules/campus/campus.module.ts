import { Module } from "@nestjs/common";
import { CAMPUS_REPOSITORY_PORT, CampusService } from "@/core/campus";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CampusTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { EnderecoModule } from "@/v2/server/modules/endereco";
import { CampusRestController } from "./rest/campus.rest.controller";

@Module({
  imports: [EnderecoModule],
  controllers: [CampusRestController],
  providers: [
    NestJsPaginateAdapter,
    CampusService,
    {
      provide: CAMPUS_REPOSITORY_PORT,
      useClass: CampusTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CampusService],
})
export class CampusModule {}
