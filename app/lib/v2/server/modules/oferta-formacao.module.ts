import { Module } from "@nestjs/common";
import { OfertaFormacaoController } from "@/v2/adapters/in/http/oferta-formacao/oferta-formacao.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { OfertaFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";
import { ModalidadeModule } from "@/v2/server/modules/modalidade.module";

/**
 * Módulo NestJS para OfertaFormacao
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    OfertaFormacaoService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "IOfertaFormacaoRepositoryPort",
      useClass: OfertaFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [OfertaFormacaoService],
})
export class OfertaFormacaoModule {}
