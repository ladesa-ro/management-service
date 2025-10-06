import { Type } from "typebox";
import { ESTADO_USE_CASES, type EstadoFindOneByIdInputDto, EstadoFindOneByIdInputSchema, estadoAuthorizationFromRequest, type IEstadoUseCasesPort } from "@/features";
import { type BaseAppRoute, createRequestSchema, Inject, Injectable } from "@/shared";
import type { AppSchemaType } from "@/shared/infrastructure/schemas/registry/app-schema.ts";

export type EstadoFindOneByIdRequestDto = AppSchemaType<typeof EstadoFindOneByIdRoute.requestSchema>;

@Injectable("Singleton")
export class EstadoFindOneByIdRoute implements BaseAppRoute {
  static method = "GET";
  static path = "/base/estados/:id";

  static requestSchema = createRequestSchema((evaluateContext) => {
    return {
      params: Type.Object({
        id: Type.Index(evaluateContext.getSchema(EstadoFindOneByIdInputSchema), ["id"]),
      }),
    };
  });

  static operation = {
    operationId: "estadoFindOneById",
    summary: "Rota que realiza a consulta de estado.",
    description: "Obtenha os dados de um estado com base no ID.",
  };

  static requestToDto(request: EstadoFindOneByIdRequestDto): EstadoFindOneByIdInputDto {
    return {
      id: request.params.id,
    };
  }

  constructor(
    @Inject(ESTADO_USE_CASES)
    private estadoApplicationService: IEstadoUseCasesPort,
  ) {}

  async handler(request: EstadoFindOneByIdRequestDto) {
    const authorizationPort = estadoAuthorizationFromRequest(request);
    const dto = EstadoFindOneByIdRoute.requestToDto(request);

    return this.estadoApplicationService.estadoFindOneById(authorizationPort, dto);
  }
}
