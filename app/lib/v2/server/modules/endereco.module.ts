import { Module } from "@nestjs/common";
import { EnderecoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { EnderecoService } from "@/v2/core/endereco/application/use-cases/endereco.service";

/**
 * Módulo NestJS para Endereco
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar service e repository
 */
@Module({
  imports: [],
  controllers: [],
  providers: [
    // Service (implementa Use Case Port)
    EnderecoService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "IEnderecoRepositoryPort",
      useClass: EnderecoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EnderecoService],
})
export class EnderecoModule {}
