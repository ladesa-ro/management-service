import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";

@ApiSchema({ name: "CursoPeriodoDisciplinaParentParamsDto" })
export class CursoPeriodoDisciplinaParentParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID do curso" })
  @IsUUID()
  cursoId: string;
}

@ApiSchema({ name: "CursoPeriodoDisciplinaItemDto" })
export class CursoPeriodoDisciplinaItemRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da disciplina" })
  @IsUUID()
  disciplinaId: string;

  @ApiPropertyOptional({ type: "integer", description: "Carga horaria", minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  cargaHoraria?: number;
}

@ApiSchema({ name: "CursoPeriodoDisciplinaPeriodoItemDto" })
export class CursoPeriodoDisciplinaPeriodoItemRestDto {
  @ApiProperty({ type: "integer", description: "Numero do periodo", minimum: 1 })
  @IsInt()
  @Min(1)
  numeroPeriodo: number;

  @ApiProperty({ type: () => [CursoPeriodoDisciplinaItemRestDto], description: "Disciplinas do periodo" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CursoPeriodoDisciplinaItemRestDto)
  disciplinas: CursoPeriodoDisciplinaItemRestDto[];
}

@ApiSchema({ name: "CursoPeriodoDisciplinaBulkReplaceInputDto" })
export class CursoPeriodoDisciplinaBulkReplaceInputRestDto {
  @ApiProperty({ type: () => [CursoPeriodoDisciplinaPeriodoItemRestDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CursoPeriodoDisciplinaPeriodoItemRestDto)
  periodos: CursoPeriodoDisciplinaPeriodoItemRestDto[];
}

@ApiSchema({ name: "CursoPeriodoDisciplinaOutputItemDto" })
export class CursoPeriodoDisciplinaOutputItemRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string" }) disciplinaId: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) disciplinaNome: string | null;
  @ApiPropertyOptional({ type: "integer", nullable: true }) cargaHoraria: number | null;
}

@ApiSchema({ name: "CursoPeriodoDisciplinaOutputPeriodoDto" })
export class CursoPeriodoDisciplinaOutputPeriodoRestDto {
  @ApiProperty({ type: "integer" }) numeroPeriodo: number;
  @ApiProperty({ type: () => [CursoPeriodoDisciplinaOutputItemRestDto] })
  disciplinas: CursoPeriodoDisciplinaOutputItemRestDto[];
}

@ApiSchema({ name: "CursoPeriodoDisciplinaListOutputDto" })
export class CursoPeriodoDisciplinaListOutputRestDto {
  @ApiProperty({ type: () => [CursoPeriodoDisciplinaOutputPeriodoRestDto] })
  data: CursoPeriodoDisciplinaOutputPeriodoRestDto[];
}
