import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

@ApiSchema({ name: "HorarioAulaConfiguracaoCreateInputDto" })
export class HorarioAulaConfiguracaoCreateInputRestDto {
  @ApiProperty({ type: "string", format: "date", description: "Data inicio da configuracao" })
  dataInicio: string;

  @ApiPropertyOptional({
    type: "string",
    format: "date",
    nullable: true,
    description: "Data fim da configuracao",
  })
  dataFim?: string;

  @ApiProperty({ type: "boolean", description: "Configuracao ativa" })
  ativo: boolean;

  @ApiProperty({ type: "string", format: "uuid", description: "ID do campus" })
  campusId: string;
}

@ApiSchema({ name: "HorarioAulaConfiguracaoUpdateInputDto" })
export class HorarioAulaConfiguracaoUpdateInputRestDto {
  @ApiPropertyOptional({ type: "string", format: "date" })
  dataInicio?: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  dataFim?: string;
  @ApiPropertyOptional({ type: "boolean" }) ativo?: boolean;
  @ApiPropertyOptional({ type: "string", format: "uuid" })
  campusId?: string;
}

@ApiSchema({ name: "HorarioAulaConfiguracaoFindOneParamsDto" })
export class HorarioAulaConfiguracaoFindOneParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  id: string;
}

@ApiSchema({ name: "HorarioAulaConfiguracaoFindOneOutputDto" })
export class HorarioAulaConfiguracaoFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string", format: "date" }) dataInicio: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true }) dataFim: string | null;
  @ApiProperty({ type: "boolean" }) ativo: boolean;
  @ApiProperty({ type: "string" }) campusId: string;
}

@ApiSchema({ name: "HorarioAulaConfiguracaoListOutputDto" })
export class HorarioAulaConfiguracaoListOutputRestDto {
  @ApiProperty({ type: () => [HorarioAulaConfiguracaoFindOneOutputRestDto] })
  data: HorarioAulaConfiguracaoFindOneOutputRestDto[];
}
