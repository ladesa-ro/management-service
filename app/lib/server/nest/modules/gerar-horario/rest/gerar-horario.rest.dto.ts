import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { HorarioGeradoAulaFindOneInputRestDto } from "@/server/nest/modules/horario-gerado-aula/rest";
import { IntervaloDeTempoFindOneInputRestDto } from "@/server/nest/modules/intervalo-de-tempo/rest/intervalo-de-tempo.rest.dto";
import { PerfilFindOneInputRestDto } from "@/server/nest/modules/perfil/rest";
import { TurmaFindOneInputRestDto } from "@/server/nest/modules/turma/rest";

// ============================================================================
// Gerar Horario Input
// ============================================================================

@decorate(ApiSchema({ name: "GerarHorarioInputDto" }))
export class GerarHorarioInputRestDto {
  @decorate(ApiProperty({ type: "string", description: "Data inicial" }))
  @decorate(IsDateString())
  dataInicial: string;

  @decorate(ApiProperty({ type: "string", description: "Data final" }))
  @decorate(IsDateString())
  dataFinal: string;

  @decorate(ApiProperty({ type: () => [PerfilFindOneInputRestDto], description: "Professores" }))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => PerfilFindOneInputRestDto))
  professores: PerfilFindOneInputRestDto[];

  @decorate(ApiProperty({ type: () => [TurmaFindOneInputRestDto], description: "Turmas" }))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => TurmaFindOneInputRestDto))
  turmas: TurmaFindOneInputRestDto[];

  @decorate(
    ApiProperty({ type: () => [IntervaloDeTempoFindOneInputRestDto], description: "Intervalos" }),
  )
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => IntervaloDeTempoFindOneInputRestDto))
  intervalos: IntervaloDeTempoFindOneInputRestDto[];
}

// ============================================================================
// Gerar Horario Output
// ============================================================================

@decorate(ApiSchema({ name: "GerarHorarioOutputDto" }))
export class GerarHorarioOutputRestDto {
  @decorate(ApiProperty({ type: "string", description: "Data inicial" }))
  @decorate(IsDateString())
  dataInicial: string;

  @decorate(ApiProperty({ type: "string", description: "Data final" }))
  @decorate(IsDateString())
  dataFinal: string;

  @decorate(
    ApiProperty({
      type: () => [HorarioGeradoAulaFindOneInputRestDto],
      description: "Aulas geradas",
    }),
  )
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => HorarioGeradoAulaFindOneInputRestDto))
  aulas: HorarioGeradoAulaFindOneInputRestDto[];
}
