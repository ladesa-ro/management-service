import { Module } from "@nestjs/common";
import { EnderecoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { EnderecoService } from "@/v2/core/endereco/application/use-cases/endereco.service";

/**
 * Módulo Endereco configurado com Arquitetura Hexagonal
 * - EnderecoService: Implementa casos de uso (porta de entrada)
 * - EnderecoTypeOrmRepositoryAdapter: Implementa IEnderecoRepositoryPort (porta de saída)
 */
@Module({
  imports: [],
  controllers: [],
  providers: [
    // Adapter de repositório (implementação da porta de saída)
    {
      provide: "IEnderecoRepositoryPort",
      useClass: EnderecoTypeOrmRepositoryAdapter,
    },

    // Use case service (implementação da porta de entrada)
    EnderecoService,
  ],
  exports: [EnderecoService],
})
export class EnderecoModule {}
