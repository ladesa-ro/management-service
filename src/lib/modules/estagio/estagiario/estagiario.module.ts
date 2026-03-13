import { Module } from "@nestjs/common";
import { EstagiarioService } from "@/modules/estagio/estagiario/application/use-cases/estagiario.service";
import {
  EstagiarioTypeOrmRepositoryAdapter,
} from "@/modules/estagio/estagiario/infrastructure";
import { EstagiarioRestController } from "@/modules/estagio/estagiario/presentation/rest/estagiario.rest.controller";
import { ESTAGIARIO_REPOSITORY_PORT } from "@/modules/estagio/estagiario/application/ports";

@Module({
  imports: [],
  controllers: [EstagiarioRestController],
  providers: [
    EstagiarioService,
    {
      provide: ESTAGIARIO_REPOSITORY_PORT,
      useClass: EstagiarioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EstagiarioService],
})
export class EstagiarioModule {}
