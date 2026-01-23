import { Module } from "@nestjs/common";
import { UsuarioModule } from "@/v2/core/usuario/usuario.module";
import { AmbienteModule } from "../ambiente/ambiente.module";
import { ReservaController } from "./api/reserva.controller";
import { ReservaService } from "./domain/reserva.service";

@Module({
  imports: [UsuarioModule, AmbienteModule],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
