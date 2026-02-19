import { Global, Module } from "@nestjs/common";
import { ARQUIVO_REPOSITORY_PORT } from "@/modules/@base/armazenamento/arquivo/application/ports";
import { ArquivoService } from "@/modules/@base/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ArquivoTypeOrmRepositoryAdapter } from "@/modules/@base/armazenamento/arquivo/infrastructure/persistence/typeorm";
import { ArquivoRestController } from "@/modules/@base/armazenamento/arquivo/presentation/rest/arquivo.rest.controller";

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
