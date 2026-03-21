import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/modules/@shared/presentation/rest";
import { IsBoolean, IsOptional, IsString, IsUUID } from "@/modules/@shared/presentation/shared";

@ApiSchema({ name: "HorarioAulaConfiguracaoCreateInputDto" })
export class HorarioAulaConfiguracaoCreateInputRestDto {
  @ApiProperty({ type: "string", format: "date", description: "Data inicio da configuracao" })
  @IsString()
  dataInicio: string;

  @ApiPropertyOptional({
    type: "string",
    format: "date",
    nullable: true,
    description: "Data fim da configuracao",
  })
  @IsOptional()
  @IsString()
  dataFim?: string;

  @ApiProperty({ type: "boolean", description: "Configuracao ativa" })
  @IsBoolean()
  ativo: boolean;

  @ApiProperty({ type: "string", format: "uuid", description: "ID do campus" })
  @IsUUID()
  campusId: string;
}

@ApiSchema({ name: "HorarioAulaConfiguracaoUpdateInputDto" })
export class HorarioAulaConfiguracaoUpdateInputRestDto {
  @ApiPropertyOptional({ type: "string", format: "date" })
  @IsOptional()
  @IsString()
  dataInicio?: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  @IsOptional()
  @IsString()
  dataFim?: string;
  @ApiPropertyOptional({ type: "boolean" }) @IsOptional() @IsBoolean() ativo?: boolean;
  @ApiPropertyOptional({ type: "string", format: "uuid" })
  @IsOptional()
  @IsUUID()
  campusId?: string;
}

@ApiSchema({ name: "HorarioAulaConfiguracaoFindOneParamsDto" })
export class HorarioAulaConfiguracaoFindOneParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  @IsUUID()
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
