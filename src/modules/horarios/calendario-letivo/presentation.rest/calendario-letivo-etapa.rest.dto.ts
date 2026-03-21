import { ApiProperty, ApiSchema } from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsString,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";

@ApiSchema({ name: "CalendarioLetivoEtapaParentParamsDto" })
export class CalendarioLetivoEtapaParentParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID do calendario letivo" })
  @IsUUID()
  calendarioLetivoId: string;
}

@ApiSchema({ name: "CalendarioLetivoEtapaBulkReplaceItemDto" })
export class CalendarioLetivoEtapaBulkReplaceItemRestDto {
  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID da etapa da oferta de formacao periodo",
  })
  @IsUUID()
  ofertaFormacaoPeriodoEtapaId: string;

  @ApiProperty({ type: "string", format: "date", description: "Data inicio da etapa" })
  @IsString()
  dataInicio: string;

  @ApiProperty({ type: "string", format: "date", description: "Data termino da etapa" })
  @IsString()
  dataTermino: string;
}

@ApiSchema({ name: "CalendarioLetivoEtapaBulkReplaceInputDto" })
export class CalendarioLetivoEtapaBulkReplaceInputRestDto {
  @ApiProperty({ type: () => [CalendarioLetivoEtapaBulkReplaceItemRestDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CalendarioLetivoEtapaBulkReplaceItemRestDto)
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
