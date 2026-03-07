import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { HorarioGeradoAulaFindOneInputRestDto } from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/HorarioGeradoAulaRestDto";
import { IntervaloDeTempoFindOneInputRestDto } from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/IntervaloDeTempoRestDto";
import { PerfilFindOneInputRestDto } from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/PerfilRestDto";
import { TurmaFindOneInputRestDto } from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/TurmaRestDto";

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
