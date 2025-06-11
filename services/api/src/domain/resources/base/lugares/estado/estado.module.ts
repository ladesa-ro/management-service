import { Module } from "@nestjs/common";
import { EstadoController } from "./estado.controller";
import { EstadoService } from "./estado.service";

@Module({
  imports: [],
  providers: [EstadoService],
  exports: [EstadoService],
  controllers: [EstadoController],
})
export class EstadoModule {}
