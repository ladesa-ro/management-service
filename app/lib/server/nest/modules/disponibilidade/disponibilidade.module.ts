import { Module } from "@nestjs/common";
import { DISPONIBILIDADE_REPOSITORY_PORT } from "@/core/disponibilidade/application/ports";
import { DisponibilidadeService } from "@/core/disponibilidade/application/use-cases/disponibilidade.service";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { DisponibilidadeTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { DisponibilidadeRestController } from "./rest/disponibilidade.rest.controller";

@Module({
  imports: [],
  controllers: [DisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    DisponibilidadeService,
    {
      provide: DISPONIBILIDADE_REPOSITORY_PORT,
      useClass: DisponibilidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
