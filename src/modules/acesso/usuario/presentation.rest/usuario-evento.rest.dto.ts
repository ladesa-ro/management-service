import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/modules/@shared/presentation/rest";
import { IsBoolean, IsOptional, IsString, IsUUID } from "@/modules/@shared/presentation/shared";

@ApiSchema({ name: "UsuarioEventoParentParamsDto" })
export class UsuarioEventoParentParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID do usuario" })
  @IsUUID()
  id: string;
}

@ApiSchema({ name: "UsuarioEventoItemParamsDto" })
export class UsuarioEventoItemParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID do usuario" })
  @IsUUID()
  id: string;

  @ApiProperty({ type: "string", format: "uuid", description: "ID do evento" })
  @IsUUID()
  eventoId: string;
}

@ApiSchema({ name: "UsuarioEventoCreateInputDto" })
export class UsuarioEventoCreateInputRestDto {
  @ApiProperty({ type: "string", description: "Nome do evento/atividade" })
  @IsString()
  nome: string;

  @ApiProperty({ type: "string", format: "date" })
  @IsString()
  dataInicio: string;

  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  @IsOptional()
  @IsString()
  dataFim?: string;

  @ApiProperty({ type: "boolean" })
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

  @ApiPropertyOptional({
    type: "string",
    enum: ["EVENTO", "INDISPONIBILIDADE"],
    description: "Tipo: EVENTO (atividade) ou INDISPONIBILIDADE",
  })
  @IsOptional()
  @IsString()
  tipo?: string;
}

@ApiSchema({ name: "UsuarioEventoUpdateInputDto" })
export class UsuarioEventoUpdateInputRestDto {
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
