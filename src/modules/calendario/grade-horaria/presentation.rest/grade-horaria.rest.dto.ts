import { z } from "zod";
import { SharedFields } from "@/domain/abstractions";
import {
  GradeHorariaCampusParamsFields,
  GradeHorariaFields,
  GradeHorariaIntervaloFields,
} from "@/modules/calendario/grade-horaria/domain/grade-horaria.fields";
import { ApiProperty, ApiSchema } from "@/shared/presentation/rest";
import { uuidSchema } from "@/shared/validation/schemas";
import { gradeHorariaIntervalosArraySchema } from "../domain/grade-horaria.schemas";

// ============================================================================
// Intervalo (value object)
// ============================================================================

@ApiSchema({ name: "GradeHorariaIntervaloInputDto" })
export class GradeHorariaIntervaloInputRestDto {
  @ApiProperty(GradeHorariaIntervaloFields.inicio.swaggerMetadata)
  inicio: string;

  @ApiProperty(GradeHorariaIntervaloFields.fim.swaggerMetadata)
  fim: string;
}

@ApiSchema({ name: "GradeHorariaIntervaloOutputDto" })
export class GradeHorariaIntervaloOutputRestDto {
  @ApiProperty(GradeHorariaIntervaloFields.inicio.swaggerMetadata)
  inicio: string;

  @ApiProperty(GradeHorariaIntervaloFields.fim.swaggerMetadata)
  fim: string;
}

// ============================================================================
// Grade Horaria item (input)
// ============================================================================

@ApiSchema({ name: "GradeHorariaItemInputDto" })
export class GradeHorariaItemInputRestDto {
  @ApiProperty(GradeHorariaFields.identificadorExterno.swaggerMetadata)
  identificadorExterno: string;

  @ApiProperty(GradeHorariaFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty({
    ...GradeHorariaFields.intervalos.swaggerMetadata,
    type: () => [GradeHorariaIntervaloInputRestDto],
  })
  intervalos: GradeHorariaIntervaloInputRestDto[];
}

// ============================================================================
// Grade Horaria item (output)
// ============================================================================

@ApiSchema({ name: "GradeHorariaItemOutputDto" })
export class GradeHorariaItemOutputRestDto {
  @ApiProperty(GradeHorariaFields.identificadorExterno.swaggerMetadata)
  identificadorExterno: string;

  @ApiProperty(GradeHorariaFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty({
    ...GradeHorariaFields.intervalos.swaggerMetadata,
    type: () => [GradeHorariaIntervaloOutputRestDto],
  })
  intervalos: GradeHorariaIntervaloOutputRestDto[];
}

// ============================================================================
// Params
// ============================================================================

@ApiSchema({ name: "GradeHorariaCampusParamsDto" })
export class GradeHorariaCampusParamsRestDto {
  static schema = z.object({ campusId: uuidSchema });

  @ApiProperty(GradeHorariaCampusParamsFields.campusId.swaggerMetadata)
  campusId: string;
}

// ============================================================================
// PUT Input
// ============================================================================

const gradeHorariaItemInputSchema = z.object({
  identificadorExterno: uuidSchema,
  nome: z.string().min(1),
  intervalos: gradeHorariaIntervalosArraySchema,
});

@ApiSchema({ name: "GradeHorariaReplaceInputDto" })
export class GradeHorariaReplaceInputRestDto {
  static schema = z.object({
    gradesHorarias: z.array(gradeHorariaItemInputSchema),
  });

  @ApiProperty({
    ...GradeHorariaFields.gradesHorarias.swaggerMetadata,
    type: () => [GradeHorariaItemInputRestDto],
  })
  gradesHorarias: GradeHorariaItemInputRestDto[];
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "GradeHorariaListOutputDto" })
export class GradeHorariaListOutputRestDto {
  @ApiProperty({
    ...SharedFields.data.swaggerMetadata,
    type: () => [GradeHorariaItemOutputRestDto],
  })
  data: GradeHorariaItemOutputRestDto[];
}
