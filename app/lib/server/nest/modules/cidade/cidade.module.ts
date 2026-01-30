import { Module } from "@nestjs/common";
import { CIDADE_REPOSITORY_PORT } from "@/core/cidade/application/ports";
import { CidadeService } from "@/core/cidade/application/use-cases/cidade.service";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CidadeRestController } from "./rest/cidade.rest.controller";

@Module({
  imports: [],
  controllers: [CidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    CidadeService,
    {
      provide: CIDADE_REPOSITORY_PORT,
      useClass: CidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CidadeService],
})
export class CidadeModule {}
