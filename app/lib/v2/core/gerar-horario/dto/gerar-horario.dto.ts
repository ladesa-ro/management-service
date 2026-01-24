import { ApiProperty } from "@nestjs/swagger";
import { Field, ObjectType, InputType } from "@nestjs/graphql";
import { IsDateString, IsArray, ValidateNested, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { PerfilFindOneOutputDto, PerfilFindOneInputDto } from "@/v2/core/perfil/dto";
import { TurmaFindOneOutputDto, TurmaFindOneInputDto } from "@/v2/core/turma/dto";
import { IntervaloDeTempoFindOneOutputDto, IntervaloDeTempoFindOneInputDto } from "@/v2/core/intervalo-de-tempo/dto";
import { HorarioGeradoAulaFindOneInputDto } from "@/v2/core/horario-gerado-aula/dto";

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

  @ApiProperty({ type: () => [HorarioGeradoAulaFindOneInputDto], description: "Aulas geradas" })
  @Field(() => [HorarioGeradoAulaFindOneInputDto])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioGeradoAulaFindOneInputDto)
  aulas: HorarioGeradoAulaFindOneInputDto[];
}
