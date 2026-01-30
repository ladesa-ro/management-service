import { Module } from "@nestjs/common";
import { OFERTA_FORMACAO_REPOSITORY_PORT, OfertaFormacaoService } from "@/core/oferta-formacao";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { OfertaFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ModalidadeModule } from "@/server/nest/modules/modalidade";
import { OfertaFormacaoController } from "./http";

/**
 * Modulo NestJS para OfertaFormacao
 *
 * Responsavel por:
 * - Configurar injecao de dependencia
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [ModalidadeModule],
  controllers: [OfertaFormacaoController],
  providers: [
    // Adapter de paginacao generico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    OfertaFormacaoService,

    // Binding: Repository Port -> TypeORM Adapter
    {
      provide: OFERTA_FORMACAO_REPOSITORY_PORT,
      useClass: OfertaFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [OfertaFormacaoService],
})
export class OfertaFormacaoModule {}
