import { ApiProperty } from "@nestjs/swagger";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsDateString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PerfilFindOneInputDto } from "@/v2/adapters/in/http/perfil/dto";
import { TurmaFindOneInputDto } from "@/v2/adapters/in/http/turma/dto";
import { IntervaloDeTempoFindOneInputDto } from "@/v2/adapters/in/http/intervalo-de-tempo/dto";
import { HorarioGeradoAulaFindOneInputDto } from "@/v2/adapters/in/http/horario-gerado-aula/dto";

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
