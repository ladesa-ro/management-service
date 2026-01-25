import { Module } from "@nestjs/common";
import { NivelFormacaoController } from "@/v2/adapters/in/http/nivel-formacao/nivel-formacao.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NivelFormacaoService } from "@/v2/core/nivel-formacao/application/use-cases/nivel-formacao.service";

/**
 * Módulo NestJS para NivelFormacao
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [],
  controllers: [NivelFormacaoController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    NivelFormacaoService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "INivelFormacaoRepositoryPort",
      useClass: NivelFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
