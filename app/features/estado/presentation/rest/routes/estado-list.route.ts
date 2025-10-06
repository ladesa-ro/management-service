import { ESTADO_USE_CASES, type EstadoListInputDto, EstadoListInputDtoSchema, EstadoListSettings, estadoAuthorizationFromRequest, type IEstadoUseCasesPort } from "@/features";
import { type BaseAppRoute, getListRequestSchema, Inject, Injectable, requestListDtoToInputDto } from "@/shared";
import type { AppSchemaType } from "@/shared/infrastructure/schemas/registry/app-schema.ts";

export type EstadoListRequestDto = AppSchemaType<typeof EstadoListRoute.requestSchema>;

@Injectable("Singleton")
export class EstadoListRoute implements BaseAppRoute {
  static method = "GET";
  static path = "/base/estados";

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
