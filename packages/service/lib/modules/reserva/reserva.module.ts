import { Module } from "@nestjs/common";
import { AmbienteModule } from "../ambiente/ambiente.module";
import { UsuarioModule } from "../legacy/application/resources/autenticacao/usuario/usuario.module";
import { ReservaController } from "./api/reserva.controller";
import { ReservaResolver } from "./reserva.resolver";
import { ReservaService } from "./domain/reserva.service";

@Module({
  imports: [UsuarioModule, AmbienteModule],
  controllers: [ReservaController],
  providers: [ReservaService, ReservaResolver],
  exports: [ReservaService],
})
export class ReservaModule {
}
