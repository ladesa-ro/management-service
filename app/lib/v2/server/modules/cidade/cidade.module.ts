import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { CidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { CidadeService } from "@/v2/core/cidade/application/use-cases/cidade.service";
import { CidadeController } from "./controllers";

@Module({
  imports: [],
  controllers: [CidadeController],
  providers: [
    NestJsPaginateAdapter,
    CidadeService,
    {
      provide: "ICidadeRepositoryPort",
      useClass: CidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CidadeService],
})
export class CidadeModule {}
