import { Module } from "@nestjs/common";
import { EstadoController } from "./application/estado.controller";
import { EstadoResolver } from "./application/estado.resolver";
import { EstadoService } from "./domain/estado.service";

@Module({
  imports: [],
  providers: [EstadoService, EstadoResolver],
  exports: [EstadoService],
  controllers: [EstadoController],
})
export class EstadoModule {}
