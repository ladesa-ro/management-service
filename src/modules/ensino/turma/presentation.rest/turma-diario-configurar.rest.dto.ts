import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/modules/@shared/presentation/rest";
import { IsArray, IsUUID, Type, ValidateNested } from "@/modules/@shared/presentation/shared";

@ApiSchema({ name: "TurmaDiarioConfigurarParamsDto" })
export class TurmaDiarioConfigurarParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da turma" })
  @IsUUID()
  turmaId: string;
}

@ApiSchema({ name: "TurmaDiarioConfigurarItemDto" })
export class TurmaDiarioConfigurarItemRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da disciplina" })
  @IsUUID()
  disciplinaId: string;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs dos professores (perfis)",
  })
  @IsArray()
  @IsUUID(undefined, { each: true })
  professorPerfilIds: string[];
}

@ApiSchema({ name: "TurmaDiarioConfigurarInputDto" })
export class TurmaDiarioConfigurarInputRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID do calendario letivo" })
  @IsUUID()
  calendarioLetivoId: string;

  @ApiProperty({
    type: () => [TurmaDiarioConfigurarItemRestDto],
    description: "Configuracao de disciplinas",
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TurmaDiarioConfigurarItemRestDto)
  diarios: TurmaDiarioConfigurarItemRestDto[];
}

@ApiSchema({ name: "TurmaDiarioConfigurarOutputDto" })
export class TurmaDiarioConfigurarOutputRestDto {
  @ApiProperty({ type: "number", description: "Quantidade de diarios criados" })
  created: number;
}
