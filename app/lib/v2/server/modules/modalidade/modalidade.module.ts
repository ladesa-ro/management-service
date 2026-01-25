import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { ModalidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ModalidadeService } from "@/v2/core/modalidade/application/use-cases/modalidade.service";
import { ModalidadeController } from "./controllers";

@Module({
  imports: [],
  controllers: [ModalidadeController],
  providers: [
    NestJsPaginateAdapter,
    ModalidadeService,
    {
      provide: "IModalidadeRepositoryPort",
      useClass: ModalidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ModalidadeService],
})
export class ModalidadeModule {}
