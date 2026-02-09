import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, ValidateNested } from "class-validator";
import { HorarioGeradoAulaFindOneInputRestDto } from "@/server/nest/modules/horario-gerado-aula/rest";
import { IntervaloDeTempoFindOneInputRestDto } from "@/server/nest/modules/intervalo-de-tempo/rest/intervalo-de-tempo.rest.dto";
import { PerfilFindOneInputRestDto } from "@/server/nest/modules/perfil/rest";
import { TurmaFindOneInputRestDto } from "@/server/nest/modules/turma/rest";

// ============================================================================
// Gerar Horario Input
// ============================================================================

@ApiSchema({ name: "GerarHorarioInputDto" })
export class GerarHorarioInputRestDto {
  @ApiProperty({ description: "Data inicial" })
  @IsDateString()
  dataInicial: string;

  @ApiProperty({ description: "Data final" })
  @IsDateString()
  dataFinal: string;

  @ApiProperty({ type: () => [PerfilFindOneInputRestDto], description: "Professores" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerfilFindOneInputRestDto)
  professores: PerfilFindOneInputRestDto[];

  @ApiProperty({ type: () => [TurmaFindOneInputRestDto], description: "Turmas" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TurmaFindOneInputRestDto)
  turmas: TurmaFindOneInputRestDto[];

  @ApiProperty({ type: () => [IntervaloDeTempoFindOneInputRestDto], description: "Intervalos" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IntervaloDeTempoFindOneInputRestDto)
  intervalos: IntervaloDeTempoFindOneInputRestDto[];
}

// ============================================================================
// Gerar Horario Output
// ============================================================================

@ApiSchema({ name: "GerarHorarioOutputDto" })
export class GerarHorarioOutputRestDto {
  @ApiProperty({ description: "Data inicial" })
  @IsDateString()
  dataInicial: string;

  @ApiProperty({ description: "Data final" })
  @IsDateString()
  dataFinal: string;

  @ApiProperty({ type: () => [HorarioGeradoAulaFindOneInputRestDto], description: "Aulas geradas" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioGeradoAulaFindOneInputRestDto)
  aulas: HorarioGeradoAulaFindOneInputRestDto[];
}
