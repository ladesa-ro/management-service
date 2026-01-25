import { Module } from "@nestjs/common";
import { EstadoController } from "@/v2/adapters/in/http/estado/estado.controller";
import { EstadoService } from "@/v2/core/estado/application/use-cases/estado.service";

@Module({
  imports: [],
  providers: [EstadoService],
  exports: [EstadoService],
  controllers: [EstadoController],
})
export class EstadoModule {}
