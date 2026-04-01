import { z } from "zod";
import { SharedFields } from "@/domain/abstractions";
import {
  HorarioAulaItemConfigFields,
  HorarioDeAulaCampusParamsFields,
  HorarioDeAulaReplaceFields,
} from "@/modules/horarios/horarios-de-aula/domain/horario-aula-configuracao.fields";
import { ApiProperty, ApiSchema } from "@/shared/presentation/rest";
import { horariosAulaArraySchema } from "../domain/horario-aula-configuracao.schemas";

// ============================================================================
// Horario Item (value object)
// ============================================================================

@ApiSchema({ name: "HorarioAulaItemInputDto" })
export class HorarioAulaItemInputRestDto {
  @ApiProperty(HorarioAulaItemConfigFields.inicio.swaggerMetadata)
  inicio: string;

  @ApiProperty(HorarioAulaItemConfigFields.fim.swaggerMetadata)
  fim: string;
}

@ApiSchema({ name: "HorarioAulaItemOutputDto" })
export class HorarioAulaItemOutputRestDto {
  @ApiProperty(HorarioAulaItemConfigFields.inicio.swaggerMetadata) inicio: string;
  @ApiProperty(HorarioAulaItemConfigFields.fim.swaggerMetadata) fim: string;
}

// ============================================================================
// Params
// ============================================================================

@ApiSchema({ name: "HorarioDeAulaCampusParamsDto" })
export class HorarioDeAulaCampusParamsRestDto {
  @ApiProperty(HorarioDeAulaCampusParamsFields.campusId.swaggerMetadata)
  campusId: string;
}

// ============================================================================
// PUT Input
// ============================================================================

@ApiSchema({ name: "HorarioDeAulaReplaceInputDto" })
export class HorarioDeAulaReplaceInputRestDto {
  static schema = z.object({ horarios: horariosAulaArraySchema });

  @ApiProperty({
    ...HorarioDeAulaReplaceFields.horarios.swaggerMetadata,
    type: () => [HorarioAulaItemInputRestDto],
  })
  horarios: HorarioAulaItemInputRestDto[];
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "HorarioDeAulaListOutputDto" })
export class HorarioDeAulaListOutputRestDto {
  @ApiProperty({
    ...SharedFields.data.swaggerMetadata,
    type: () => [HorarioAulaItemOutputRestDto],
  })
  data: HorarioAulaItemOutputRestDto[];
}
