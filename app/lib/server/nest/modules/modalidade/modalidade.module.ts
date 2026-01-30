import { Module } from "@nestjs/common";
import { MODALIDADE_REPOSITORY_PORT } from "@/core/modalidade/application/ports";
import { ModalidadeService } from "@/core/modalidade/application/use-cases/modalidade.service";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { ModalidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ModalidadeRestController } from "./rest/modalidade.rest.controller";

@Module({
  imports: [],
  controllers: [ModalidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    ModalidadeService,
    {
      provide: MODALIDADE_REPOSITORY_PORT,
      useClass: ModalidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ModalidadeService],
})
export class ModalidadeModule {}
