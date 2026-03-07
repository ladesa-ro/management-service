import { Global, Module } from "@nestjs/common";
import { ARQUIVO_REPOSITORY_PORT } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/ports";
import { ArquivoService } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ArquivoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/armazenamento/arquivo/infrastructure/persistence/typeorm";
import { ArquivoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/ArquivoRestController";

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
