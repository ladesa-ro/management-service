import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, ValidateNested } from "class-validator";
import { HorarioGeradoAulaFindOneInputDto } from "@/v2/server/modules/horario-gerado-aula/http/dto";
import { IntervaloDeTempoFindOneInputDto } from "@/v2/server/modules/intervalo-de-tempo/http/dto";
import { PerfilFindOneInputDto } from "@/v2/server/modules/perfil/http/dto";
import { TurmaFindOneInputDto } from "@/v2/server/modules/turma/http/dto";

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
