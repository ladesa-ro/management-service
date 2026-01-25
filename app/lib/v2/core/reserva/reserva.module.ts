import { Module } from "@nestjs/common";
import { UsuarioModule } from "@/v2/core/usuario/usuario.module";
import { AmbienteModule } from "../ambiente/ambiente.module";
import { ReservaController } from "@/v2/adapters/in/http/reserva/reserva.controller";
import { ReservaService } from "@/v2/core/reserva/application/use-cases/reserva.service";

@Module({
  imports: [UsuarioModule, AmbienteModule],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
