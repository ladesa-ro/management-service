import type { Type } from "typebox";
import {
  ESTADO_USE_CASES,
  estadoAuthorizationFromRequest,
  type EstadoListInputDto,
  EstadoListInputDtoSchema,
  EstadoListSettings,
  type IEstadoUseCasesPort
} from "@/features";
import { type BaseAppRoute, getListRequestSchema, Inject, Injectable, requestListDtoToInputDto } from "@/shared";

export type EstadoListRequestDto = Type.Static<typeof EstadoListRoute.requestSchema>;

@Injectable("Singleton")
export class EstadoListRoute implements BaseAppRoute {
  static requestSchema = getListRequestSchema(EstadoListInputDtoSchema, EstadoListSettings);

  static operation = {
    operationId: "estadoList",
    summary: "Rota que realiza a listagem de estados.",
    description: "Obtenha uma lista de estados cadastrados no sistema com base-entity em filtros personalizados.",
  };

  static requestToDto(request: EstadoListRequestDto): EstadoListInputDto {
    return requestListDtoToInputDto(request);
  }

  constructor(
    @Inject(ESTADO_USE_CASES)
    private estadoApplicationService: IEstadoUseCasesPort,
  ) {}

  async handler(request: EstadoListRequestDto) {
    const authorizationPort = estadoAuthorizationFromRequest(request);
    const dto = EstadoListRoute.requestToDto(request);

    return this.estadoApplicationService.estadoList(authorizationPort, dto);
  }
}
