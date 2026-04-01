import { SharedFields } from "@/domain/abstractions";
import {
  CursoPeriodoDisciplinaItemFields,
  CursoPeriodoDisciplinaParamsFields,
  CursoPeriodoDisciplinaPeriodoFields,
} from "@/modules/ensino/curso/domain/curso-periodo-disciplina.fields";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

@ApiSchema({ name: "CursoPeriodoDisciplinaParentParamsDto" })
export class CursoPeriodoDisciplinaParentParamsRestDto {
  @ApiProperty(CursoPeriodoDisciplinaParamsFields.cursoId.swaggerMetadata)
  cursoId: string;
}

@ApiSchema({ name: "CursoPeriodoDisciplinaItemDto" })
export class CursoPeriodoDisciplinaItemRestDto {
  @ApiProperty(CursoPeriodoDisciplinaItemFields.disciplinaId.swaggerMetadata)
  disciplinaId: string;

  @ApiPropertyOptional(CursoPeriodoDisciplinaItemFields.cargaHoraria.swaggerMetadata)
  cargaHoraria?: number;
}

@ApiSchema({ name: "CursoPeriodoDisciplinaPeriodoItemDto" })
export class CursoPeriodoDisciplinaPeriodoItemRestDto {
  @ApiProperty(CursoPeriodoDisciplinaPeriodoFields.numeroPeriodo.swaggerMetadata)
  numeroPeriodo: number;

  @ApiProperty({
    type: () => [CursoPeriodoDisciplinaItemRestDto],
    ...CursoPeriodoDisciplinaPeriodoFields.disciplinas.swaggerMetadata,
  })
  disciplinas: CursoPeriodoDisciplinaItemRestDto[];
}

@ApiSchema({ name: "CursoPeriodoDisciplinaBulkReplaceInputDto" })
export class CursoPeriodoDisciplinaBulkReplaceInputRestDto {
  @ApiProperty({ type: () => [CursoPeriodoDisciplinaPeriodoItemRestDto] })
  periodos: CursoPeriodoDisciplinaPeriodoItemRestDto[];
}

@ApiSchema({ name: "CursoPeriodoDisciplinaOutputItemDto" })
export class CursoPeriodoDisciplinaOutputItemRestDto {
  @ApiProperty(CursoPeriodoDisciplinaItemFields.id.swaggerMetadata) id: string;
  @ApiProperty(CursoPeriodoDisciplinaItemFields.disciplinaId.swaggerMetadata) disciplinaId: string;
  @ApiPropertyOptional(CursoPeriodoDisciplinaItemFields.disciplinaNome.swaggerMetadata)
  disciplinaNome: string | null;
  @ApiPropertyOptional({
    ...CursoPeriodoDisciplinaItemFields.cargaHoraria.swaggerMetadata,
    nullable: true,
  })
  cargaHoraria: number | null;
}

@ApiSchema({ name: "CursoPeriodoDisciplinaOutputPeriodoDto" })
export class CursoPeriodoDisciplinaOutputPeriodoRestDto {
  @ApiProperty(CursoPeriodoDisciplinaPeriodoFields.numeroPeriodo.swaggerMetadata)
  numeroPeriodo: number;
  @ApiProperty({ type: () => [CursoPeriodoDisciplinaOutputItemRestDto] })
  disciplinas: CursoPeriodoDisciplinaOutputItemRestDto[];
}

@ApiSchema({ name: "CursoPeriodoDisciplinaListOutputDto" })
export class CursoPeriodoDisciplinaListOutputRestDto {
  @ApiProperty({
    type: () => [CursoPeriodoDisciplinaOutputPeriodoRestDto],
    ...SharedFields.data.swaggerMetadata,
  })
  data: CursoPeriodoDisciplinaOutputPeriodoRestDto[];
}
