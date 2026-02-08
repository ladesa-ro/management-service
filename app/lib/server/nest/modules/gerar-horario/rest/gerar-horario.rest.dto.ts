import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, ValidateNested } from "class-validator";
import { HorarioGeradoAulaFindOneInputRestDto } from "@/server/nest/modules/horario-gerado-aula/rest";
import { IntervaloDeTempoFindOneInputDto } from "@/server/nest/modules/intervalo-de-tempo/rest/intervalo-de-tempo.rest.dto";
import { PerfilFindOneInputDto } from "@/server/nest/modules/perfil/rest";
import { TurmaFindOneInputDto } from "@/server/nest/modules/turma/rest";

// ============================================================================
// Gerar Horario Input
// ============================================================================

@InputType("GerarHorarioInput")
export class GerarHorarioInputDto {
  @ApiProperty({ description: "Data inicial" })
  @Field()
  @IsDateString()
  dataInicial: string;

  @ApiProperty({ description: "Data final" })
  @Field()
  @IsDateString()
  dataFinal: string;

  @ApiProperty({ type: () => [PerfilFindOneInputDto], description: "Professores" })
  @Field(() => [PerfilFindOneInputDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerfilFindOneInputDto)
  professores: PerfilFindOneInputDto[];

  @ApiProperty({ type: () => [TurmaFindOneInputDto], description: "Turmas" })
  @Field(() => [TurmaFindOneInputDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TurmaFindOneInputDto)
  turmas: TurmaFindOneInputDto[];

  @ApiProperty({ type: () => [IntervaloDeTempoFindOneInputDto], description: "Intervalos" })
  @Field(() => [IntervaloDeTempoFindOneInputDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IntervaloDeTempoFindOneInputDto)
  intervalos: IntervaloDeTempoFindOneInputDto[];
}

// ============================================================================
// Gerar Horario Output
// ============================================================================

@ObjectType("GerarHorarioOutput")
export class GerarHorarioOutputDto {
  @ApiProperty({ description: "Data inicial" })
  @Field()
  @IsDateString()
  dataInicial: string;

  @ApiProperty({ description: "Data final" })
  @Field()
  @IsDateString()
  dataFinal: string;

  @ApiProperty({ type: () => [HorarioGeradoAulaFindOneInputRestDto], description: "Aulas geradas" })
  @Field(() => [HorarioGeradoAulaFindOneInputRestDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioGeradoAulaFindOneInputRestDto)
  aulas: HorarioGeradoAulaFindOneInputRestDto[];
}
