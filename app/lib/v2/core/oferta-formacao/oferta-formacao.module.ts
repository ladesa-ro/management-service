import { Module } from "@nestjs/common";
import { ModalidadeModule } from "@/v2/core/modalidade/modalidade.module";
import { OfertaFormacaoController } from "@/v2/adapters/in/http/oferta-formacao/oferta-formacao.controller";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";
import { OfertaFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo OfertaFormacao configurado com Arquitetura Hexagonal
 * - OfertaFormacaoService: Implementa casos de uso (porta de entrada)
 * - OfertaFormacaoTypeOrmRepositoryAdapter: Implementa IOfertaFormacaoRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IOfertaFormacaoRepositoryPort",
      useClass: OfertaFormacaoTypeOrmRepositoryAdapter,
    },
    OfertaFormacaoService,
  ],
  exports: [OfertaFormacaoService],
})
export class OfertaFormacaoModule {}
