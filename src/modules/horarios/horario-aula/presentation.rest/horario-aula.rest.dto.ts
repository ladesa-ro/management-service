import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
} from "@/modules/@shared/presentation/rest";
import {
  IsOptional,
  IsString,
  IsUUID,
} from "@/modules/@shared/presentation/shared";

@ApiSchema({ name: "HorarioAulaCreateInputDto" })
export class HorarioAulaCreateInputRestDto {
  @ApiProperty({ type: "string", description: "Horario inicio (HH:MM:SS)" })
  @IsString()
  inicio: string;

  @ApiProperty({ type: "string", description: "Horario fim (HH:MM:SS)" })
  @IsString()
  fim: string;

  @ApiProperty({ type: "string", format: "uuid", description: "ID da configuracao de horario de aula" })
  @IsUUID()
  horarioAulaConfiguracaoId: string;
}

@ApiSchema({ name: "HorarioAulaUpdateInputDto" })
export class HorarioAulaUpdateInputRestDto {
  @ApiPropertyOptional({ type: "string" }) @IsOptional() @IsString() inicio?: string;
  @ApiPropertyOptional({ type: "string" }) @IsOptional() @IsString() fim?: string;
  @ApiPropertyOptional({ type: "string", format: "uuid" }) @IsOptional() @IsUUID() horarioAulaConfiguracaoId?: string;
}

@ApiSchema({ name: "HorarioAulaFindOneParamsDto" })
export class HorarioAulaFindOneParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  @IsUUID()
  id: string;
}

@ApiSchema({ name: "HorarioAulaFindOneOutputDto" })
export class HorarioAulaFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string" }) inicio: string;
  @ApiProperty({ type: "string" }) fim: string;
  @ApiProperty({ type: "string" }) horarioAulaConfiguracaoId: string;
}

@ApiSchema({ name: "HorarioAulaListOutputDto" })
export class HorarioAulaListOutputRestDto {
  @ApiProperty({ type: () => [HorarioAulaFindOneOutputRestDto] })
  data: HorarioAulaFindOneOutputRestDto[];
}
