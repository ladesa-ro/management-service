import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

@ApiSchema({ name: "TurmaDiarioConfigurarParamsDto" })
export class TurmaDiarioConfigurarParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da turma" })
  turmaId: string;
}

@ApiSchema({ name: "TurmaDiarioConfigurarItemDto" })
export class TurmaDiarioConfigurarItemRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da disciplina" })
  disciplinaId: string;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs dos professores (perfis)",
  })
  professorPerfilIds: string[];
}

@ApiSchema({ name: "TurmaDiarioConfigurarInputDto" })
export class TurmaDiarioConfigurarInputRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID do calendario letivo" })
  calendarioLetivoId: string;

  @ApiProperty({
    type: () => [TurmaDiarioConfigurarItemRestDto],
    description: "Configuracao de disciplinas",
  })
  diarios: TurmaDiarioConfigurarItemRestDto[];
}

@ApiSchema({ name: "TurmaDiarioConfigurarOutputDto" })
export class TurmaDiarioConfigurarOutputRestDto {
  @ApiProperty({ type: "number", description: "Quantidade de diarios criados" })
  created: number;
}
