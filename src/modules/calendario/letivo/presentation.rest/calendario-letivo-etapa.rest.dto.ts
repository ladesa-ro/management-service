import { SharedFields } from "@/domain/abstractions";
import {
  CalendarioLetivoEtapaBulkReplaceItemFields,
  CalendarioLetivoEtapaOutputFields,
  CalendarioLetivoEtapaParamsFields,
} from "@/modules/calendario/letivo/domain/calendario-letivo-etapa.fields";
import { ApiProperty, ApiSchema } from "@/shared/presentation/rest";

@ApiSchema({ name: "CalendarioLetivoEtapaParentParamsDto" })
export class CalendarioLetivoEtapaParentParamsRestDto {
  @ApiProperty(CalendarioLetivoEtapaParamsFields.calendarioLetivoId.swaggerMetadata)
  calendarioLetivoId: string;
}

@ApiSchema({ name: "CalendarioLetivoEtapaBulkReplaceItemDto" })
export class CalendarioLetivoEtapaBulkReplaceItemRestDto {
  @ApiProperty(
    CalendarioLetivoEtapaBulkReplaceItemFields.ofertaFormacaoPeriodoEtapaId.swaggerMetadata,
  )
  ofertaFormacaoPeriodoEtapaId: string;

  @ApiProperty(CalendarioLetivoEtapaBulkReplaceItemFields.dataInicio.swaggerMetadata)
  dataInicio: string;

  @ApiProperty(CalendarioLetivoEtapaBulkReplaceItemFields.dataTermino.swaggerMetadata)
  dataTermino: string;
}

@ApiSchema({ name: "CalendarioLetivoEtapaBulkReplaceInputDto" })
export class CalendarioLetivoEtapaBulkReplaceInputRestDto {
  @ApiProperty({ type: () => [CalendarioLetivoEtapaBulkReplaceItemRestDto] })
  etapas: CalendarioLetivoEtapaBulkReplaceItemRestDto[];
}

@ApiSchema({ name: "CalendarioLetivoEtapaFindOneOutputDto" })
export class CalendarioLetivoEtapaFindOneOutputRestDto {
  @ApiProperty(CalendarioLetivoEtapaOutputFields.id.swaggerMetadata) id: string;
  @ApiProperty(CalendarioLetivoEtapaOutputFields.ofertaFormacaoPeriodoEtapaId.swaggerMetadata)
  ofertaFormacaoPeriodoEtapaId: string;
  @ApiProperty(CalendarioLetivoEtapaOutputFields.nomeEtapa.swaggerMetadata) nomeEtapa: string;
  @ApiProperty(CalendarioLetivoEtapaOutputFields.dataInicio.swaggerMetadata) dataInicio: string;
  @ApiProperty(CalendarioLetivoEtapaOutputFields.dataTermino.swaggerMetadata) dataTermino: string;
}

@ApiSchema({ name: "CalendarioLetivoEtapaListOutputDto" })
export class CalendarioLetivoEtapaListOutputRestDto {
  @ApiProperty({
    ...SharedFields.data.swaggerMetadata,
    type: () => [CalendarioLetivoEtapaFindOneOutputRestDto],
  })
  data: CalendarioLetivoEtapaFindOneOutputRestDto[];
}
