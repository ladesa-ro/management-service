import { ApiProperty, ApiSchema } from "@/shared/presentation/rest";

@ApiSchema({ name: "CalendarioLetivoEtapaParentParamsDto" })
export class CalendarioLetivoEtapaParentParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID do calendario letivo" })
  calendarioLetivoId: string;
}

@ApiSchema({ name: "CalendarioLetivoEtapaBulkReplaceItemDto" })
export class CalendarioLetivoEtapaBulkReplaceItemRestDto {
  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID da etapa da oferta de formacao periodo",
  })
  ofertaFormacaoPeriodoEtapaId: string;

  @ApiProperty({ type: "string", format: "date", description: "Data inicio da etapa" })
  dataInicio: string;

  @ApiProperty({ type: "string", format: "date", description: "Data termino da etapa" })
  dataTermino: string;
}

@ApiSchema({ name: "CalendarioLetivoEtapaBulkReplaceInputDto" })
export class CalendarioLetivoEtapaBulkReplaceInputRestDto {
  @ApiProperty({ type: () => [CalendarioLetivoEtapaBulkReplaceItemRestDto] })
  etapas: CalendarioLetivoEtapaBulkReplaceItemRestDto[];
}

@ApiSchema({ name: "CalendarioLetivoEtapaFindOneOutputDto" })
export class CalendarioLetivoEtapaFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string" }) ofertaFormacaoPeriodoEtapaId: string;
  @ApiProperty({ type: "string" }) nomeEtapa: string;
  @ApiProperty({ type: "string", format: "date" }) dataInicio: string;
  @ApiProperty({ type: "string", format: "date" }) dataTermino: string;
}

@ApiSchema({ name: "CalendarioLetivoEtapaListOutputDto" })
export class CalendarioLetivoEtapaListOutputRestDto {
  @ApiProperty({ type: () => [CalendarioLetivoEtapaFindOneOutputRestDto] })
  data: CalendarioLetivoEtapaFindOneOutputRestDto[];
}
