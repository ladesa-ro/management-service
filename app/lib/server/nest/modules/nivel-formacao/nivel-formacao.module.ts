import { Module } from "@nestjs/common";
import { NIVEL_FORMACAO_REPOSITORY_PORT } from "@/core/nivel-formacao/application/ports";
import { NivelFormacaoService } from "@/core/nivel-formacao/application/use-cases/nivel-formacao.service";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NivelFormacaoRestController } from "./rest/nivel-formacao.rest.controller";

@Module({
  imports: [],
  controllers: [NivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    NivelFormacaoService,
    {
      provide: NIVEL_FORMACAO_REPOSITORY_PORT,
      useClass: NivelFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
