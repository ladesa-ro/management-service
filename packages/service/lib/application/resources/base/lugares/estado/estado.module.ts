import { Module } from "@nestjs/common";
import { EstadoController } from "./estado.controller";
import { EstadoResolver } from "./estado.resolver";
import { EstadoService } from "./estado.service";

@Module({
  imports: [],
  providers: [EstadoService, EstadoResolver],
  exports: [EstadoService],
  controllers: [EstadoController],
})
export class EstadoModule {}
