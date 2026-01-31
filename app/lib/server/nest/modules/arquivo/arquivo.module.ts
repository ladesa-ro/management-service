import { Global, Module } from "@nestjs/common";
import { ARQUIVO_REPOSITORY_PORT } from "@/modules/arquivo/application/ports";
import { ArquivoService } from "@/modules/arquivo/application/use-cases/arquivo.service";
import { ArquivoTypeOrmRepositoryAdapter } from "@/modules/arquivo/infrastructure/persistence/typeorm";
import { ArquivoRestController } from "./rest/arquivo.rest.controller";

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
