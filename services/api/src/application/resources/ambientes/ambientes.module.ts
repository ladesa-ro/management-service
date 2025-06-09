import { BaseLugaresModule } from "@/application/resources/base/lugares/base-lugares.module";
import { Module } from "@nestjs/common";
import { AmbienteModule } from "./ambiente/ambiente.module";
import { BlocoModule } from "./bloco/bloco.module";
import { CampusModule } from "./campus/campus.module";
import { ReservaModule } from "./reserva/reserva.module";

@Module({
  imports: [BaseLugaresModule, CampusModule, BlocoModule, AmbienteModule, ReservaModule],
})
export class AmbientesModule {}
