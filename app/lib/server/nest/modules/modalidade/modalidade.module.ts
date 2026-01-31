import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/@shared/infrastructure/persistence/typeorm";
import { MODALIDADE_REPOSITORY_PORT } from "@/modules/modalidade/application/ports";
import { ModalidadeService } from "@/modules/modalidade/application/use-cases/modalidade.service";
import { ModalidadeTypeOrmRepositoryAdapter } from "@/modules/modalidade/infrastructure/persistence/typeorm";
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
