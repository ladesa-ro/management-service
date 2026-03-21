import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/modules/@shared/presentation/rest";
import { IsBoolean, IsOptional, IsString, IsUUID } from "@/modules/@shared/presentation/shared";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "TurmaEventoParentParamsDto" })
export class TurmaEventoParentParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da turma" })
  @IsUUID()
  turmaId: string;
}

@ApiSchema({ name: "TurmaEventoItemParamsDto" })
export class TurmaEventoItemParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da turma" })
  @IsUUID()
  turmaId: string;

  @ApiProperty({ type: "string", format: "uuid", description: "ID do evento" })
  @IsUUID()
  eventoId: string;
}

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "TurmaEventoCreateInputDto" })
export class TurmaEventoCreateInputRestDto {
  @ApiProperty({ type: "string", description: "Nome do evento" })
  @IsString()
  nome: string;

  @ApiProperty({ type: "string", format: "date", description: "Data inicio" })
  @IsString()
  dataInicio: string;

  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  @IsOptional()
  @IsString()
  dataFim?: string;

  @ApiProperty({ type: "boolean", description: "Evento ocupa o dia inteiro" })
  @IsBoolean()
  diaInteiro: boolean;

  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  horarioInicio?: string;

  @ApiPropertyOptional({ type: "string" })
  @IsOptional()
  @IsString()
  horarioFim?: string;

  @ApiPropertyOptional({ type: "string", nullable: true })
  @IsOptional()
  @IsString()
  cor?: string;

  @ApiPropertyOptional({ type: "string", nullable: true })
  @IsOptional()
  @IsString()
  repeticao?: string;
}

// ============================================================================
// Update Input
// ============================================================================

@ApiSchema({ name: "TurmaEventoUpdateInputDto" })
export class TurmaEventoUpdateInputRestDto {
  @ApiPropertyOptional({ type: "string" }) @IsOptional() @IsString() nome?: string;
  @ApiPropertyOptional({ type: "string", format: "date" })
  @IsOptional()
  @IsString()
  dataInicio?: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  @IsOptional()
  @IsString()
  dataFim?: string;
  @ApiPropertyOptional({ type: "boolean" }) @IsOptional() @IsBoolean() diaInteiro?: boolean;
  @ApiPropertyOptional({ type: "string" }) @IsOptional() @IsString() horarioInicio?: string;
  @ApiPropertyOptional({ type: "string" }) @IsOptional() @IsString() horarioFim?: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) @IsOptional() @IsString() cor?: string;
  @ApiPropertyOptional({ type: "string", nullable: true })
  @IsOptional()
  @IsString()
  repeticao?: string;
}

// ============================================================================
// Output (reuses CalendarioEventoFindOneOutputRestDto shape)
// ============================================================================

@ApiSchema({ name: "TurmaEventoFindOneOutputDto" })
export class TurmaEventoFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) nome: string | null;
  @ApiProperty({ type: "string", format: "date" }) dataInicio: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true }) dataFim: string | null;
  @ApiProperty({ type: "boolean" }) diaInteiro: boolean;
  @ApiProperty({ type: "string" }) horarioInicio: string;
  @ApiProperty({ type: "string" }) horarioFim: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) cor: string | null;
  @ApiPropertyOptional({ type: "string", nullable: true }) repeticao: string | null;
  @ApiPropertyOptional({ type: "string", nullable: true }) status: string | null;
}

@ApiSchema({ name: "TurmaEventoListOutputDto" })
export class TurmaEventoListOutputRestDto {
  @ApiProperty({ type: () => [TurmaEventoFindOneOutputRestDto] })
  data: TurmaEventoFindOneOutputRestDto[];
}
