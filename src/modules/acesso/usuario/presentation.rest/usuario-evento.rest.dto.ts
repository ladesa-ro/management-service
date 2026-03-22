import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

@ApiSchema({ name: "UsuarioEventoParentParamsDto" })
export class UsuarioEventoParentParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID do usuario" })
  id: string;
}

@ApiSchema({ name: "UsuarioEventoItemParamsDto" })
export class UsuarioEventoItemParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID do usuario" })
  id: string;

  @ApiProperty({ type: "string", format: "uuid", description: "ID do evento" })
  eventoId: string;
}

@ApiSchema({ name: "UsuarioEventoCreateInputDto" })
export class UsuarioEventoCreateInputRestDto {
  @ApiProperty({ type: "string", description: "Nome do evento/atividade" })
  nome: string;

  @ApiProperty({ type: "string", format: "date" })
  dataInicio: string;

  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  dataFim?: string;

  @ApiProperty({ type: "boolean" })
  diaInteiro: boolean;

  @ApiPropertyOptional({ type: "string" })
  horarioInicio?: string;

  @ApiPropertyOptional({ type: "string" })
  horarioFim?: string;

  @ApiPropertyOptional({ type: "string", nullable: true })
  cor?: string;

  @ApiPropertyOptional({ type: "string", nullable: true })
  repeticao?: string;

  @ApiPropertyOptional({
    type: "string",
    enum: ["EVENTO", "INDISPONIBILIDADE"],
    description: "Tipo: EVENTO (atividade) ou INDISPONIBILIDADE",
  })
  tipo?: string;
}

@ApiSchema({ name: "UsuarioEventoUpdateInputDto" })
export class UsuarioEventoUpdateInputRestDto {
  @ApiPropertyOptional({ type: "string" }) nome?: string;
  @ApiPropertyOptional({ type: "string", format: "date" })
  dataInicio?: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  dataFim?: string;
  @ApiPropertyOptional({ type: "boolean" }) diaInteiro?: boolean;
  @ApiPropertyOptional({ type: "string" }) horarioInicio?: string;
  @ApiPropertyOptional({ type: "string" }) horarioFim?: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) cor?: string;
  @ApiPropertyOptional({ type: "string", nullable: true })
  repeticao?: string;
}

@ApiSchema({ name: "UsuarioEventoFindOneOutputDto" })
export class UsuarioEventoFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) nome: string | null;
  @ApiProperty({ type: "string" }) tipo: string;
  @ApiProperty({ type: "string", format: "date" }) dataInicio: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true }) dataFim: string | null;
  @ApiProperty({ type: "boolean" }) diaInteiro: boolean;
  @ApiProperty({ type: "string" }) horarioInicio: string;
  @ApiProperty({ type: "string" }) horarioFim: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) cor: string | null;
  @ApiPropertyOptional({ type: "string", nullable: true }) repeticao: string | null;
  @ApiPropertyOptional({ type: "string", nullable: true }) status: string | null;
}

@ApiSchema({ name: "UsuarioEventoListOutputDto" })
export class UsuarioEventoListOutputRestDto {
  @ApiProperty({ type: () => [UsuarioEventoFindOneOutputRestDto] })
  data: UsuarioEventoFindOneOutputRestDto[];
}
