import { Global, Module } from "@nestjs/common";
import { ARQUIVO_REPOSITORY_PORT } from "@/modules/armazenamento/arquivo/application/ports";
import { ArquivoService } from "@/modules/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ArquivoTypeOrmRepositoryAdapter } from "@/modules/armazenamento/arquivo/infrastructure/persistence/typeorm";
import { ArquivoRestController } from "@/modules/armazenamento/arquivo/presentation/rest/arquivo.rest.controller";

@Global()
@Module({
  imports: [],
  controllers: [ArquivoRestController],
  providers: [
    {
      provide: ARQUIVO_REPOSITORY_PORT,
      useClass: ArquivoTypeOrmRepositoryAdapter,
    },
    ArquivoService,
  ],
  exports: [ArquivoService],
})
export class ArquivoModule {}
