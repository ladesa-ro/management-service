import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DisponibilidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DisponibilidadeService } from "@/v2/core/disponibilidade/application/use-cases/disponibilidade.service";
import { DisponibilidadeController } from "./controllers";

@Module({
  imports: [],
  controllers: [DisponibilidadeController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IDisponibilidadeRepositoryPort",
      useClass: DisponibilidadeTypeOrmRepositoryAdapter,
    },
    DisponibilidadeService,
  ],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
