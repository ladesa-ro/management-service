import { AutorizacaoModule } from "@/domain/resources/autorizacao/autorizacao.module";
import { BaseLugaresModule } from "@/domain/resources/base/lugares/base-lugares.module";
import { EnsinoDiscenteModule } from "@/domain/resources/ensino/discente/ensino-discente.module";
import { Module } from "@nestjs/common";
import { AmbientesModule } from "./ambientes/ambientes.module";
import { AutenticacaoModule } from "./autenticacao/autenticacao.module";
import { BaseModule } from "./base/base.module";
import { CalendarioModule } from "./calendario/calendario.module";
import { EnsinoInstitucionalModule } from "./ensino/institucional/ensino-institucional.module";
import { HorarioAcademicoModule } from "./horario-academico/horario-academico.module";
//import { GerarHorarioModule } from './gerar-horario/gerar-horario.module';

@Module({
  imports: [
    //
    BaseModule,
    BaseLugaresModule,
    AutenticacaoModule,
    AmbientesModule,
    AutorizacaoModule,
    EnsinoInstitucionalModule,
    CalendarioModule,
    EnsinoDiscenteModule,
    HorarioAcademicoModule,
    /*GerarHorarioModule*/
  ],
})
export class ResourcesModule {}
