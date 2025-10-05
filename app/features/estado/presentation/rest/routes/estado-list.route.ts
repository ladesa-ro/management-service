import type { Type } from "typebox";
import { type EstadoListInputDto, EstadoListInputDtoSchema, EstadoListSettings, estadoAuthorizationFromRequest } from "@/features";
import { getListRequestSchema, type RequestRepresentationDto, requestListDtoToInputDto, validateDto } from "@/shared";

export type EstadoListRequestDto = Type.Static<typeof EstadoListRoute.requestSchema>;

export class EstadoListRoute {
  static requestSchema = getListRequestSchema(EstadoListInputDtoSchema, EstadoListSettings);

  static operation = {
    operationId: "estadoList",
    summary: "Rota que realiza a listagem de estados.",
    description: "Obtenha uma lista de estados cadastrados no sistema com base-entity em filtros personalizados.",
  };

  static requestToDto(request: EstadoListRequestDto): EstadoListInputDto {
    return requestListDtoToInputDto(request);
  }

  constructor(private estadoApplicationService: EstadoApplicationService) {}

  async handler(incomingRequest: RequestRepresentationDto) {
    const request = await validateDto(EstadoListRoute.requestSchema, incomingRequest);
    const dto = EstadoListRoute.requestToDto(request);

    const authorizationPort = estadoAuthorizationFromRequest(request);

    return this.estadoApplicationService.estadoList(authorizationPort, dto);
  }
}
