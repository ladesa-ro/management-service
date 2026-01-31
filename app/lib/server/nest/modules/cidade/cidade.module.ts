import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CIDADE_REPOSITORY_PORT } from "@/modules/cidade/application/ports";
import { CidadeService } from "@/modules/cidade/application/use-cases/cidade.service";
import { CidadeTypeOrmRepositoryAdapter } from "@/modules/cidade/infrastructure/persistence/typeorm";
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
