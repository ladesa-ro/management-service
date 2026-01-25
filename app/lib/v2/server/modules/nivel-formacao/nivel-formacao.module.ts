import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NivelFormacaoService } from "@/v2/core/nivel-formacao/application/use-cases/nivel-formacao.service";
import { NivelFormacaoController } from "./http";

@Module({
  imports: [],
  controllers: [NivelFormacaoController],
  providers: [
    NestJsPaginateAdapter,
    NivelFormacaoService,
    {
      provide: "INivelFormacaoRepositoryPort",
      useClass: NivelFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
