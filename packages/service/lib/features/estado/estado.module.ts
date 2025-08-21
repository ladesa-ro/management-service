import { Module } from "@nestjs/common";
import { EstadoController } from "@/features/estado/api/estado.controller";
import { EstadoService } from "./domain/estado.service";

@Module({
  imports: [],
  providers: [EstadoService],
  exports: [EstadoService],
  controllers: [EstadoController],
})
export class EstadoModule {}
