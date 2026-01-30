import { Global, Module } from "@nestjs/common";
import { IMAGEM_TRANSACTION_PORT } from "@/core/imagem/application/ports";
import { ImagemService } from "@/core/imagem/application/use-cases/imagem.service";
import { ArquivoModule } from "@/server/nest/modules/arquivo";
import { ImagemTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";

/**
 * Modulo Imagem configurado com Arquitetura Hexagonal
 * - ImagemService: Implementa casos de uso (porta de entrada)
 * - ImagemTypeOrmRepositoryAdapter: Implementa IImagemTransactionPort (porta de saida)
 */
@Global()
@Module({
  imports: [ArquivoModule],
  controllers: [],
  providers: [
    {
      provide: IMAGEM_TRANSACTION_PORT,
      useClass: ImagemTypeOrmRepositoryAdapter,
    },
    ImagemService,
  ],
  exports: [ImagemService],
})
export class ImagemModule {}
