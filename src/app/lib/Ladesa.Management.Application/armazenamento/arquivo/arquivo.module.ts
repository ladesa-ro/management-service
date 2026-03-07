import { Global, Module } from "@nestjs/common";
import { IArquivoRepository } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/ports";
import { ArquivoService } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ArquivoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Infrastructure.Database/Repositories/ArquivoRepositoryAdapter";
import { ArquivoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/ArquivoRestController";

@Global()
@Module({
  imports: [],
  controllers: [ArquivoRestController],
  providers: [
    {
      provide: IArquivoRepository,
      useClass: ArquivoTypeOrmRepositoryAdapter,
    },
    ArquivoService,
  ],
  exports: [ArquivoService],
})
export class ArquivoModule {}
