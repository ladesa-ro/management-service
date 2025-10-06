import { Type } from "typebox";
import {
  ESTADO_USE_CASES,
  estadoAuthorizationFromRequest,
  type EstadoFindOneByIdInputDto,
  EstadoFindOneByIdInputDtoSchema,
  type IEstadoUseCasesPort
} from "@/features";
import { type BaseAppRoute, Inject, Injectable, RequestRepresentationDtoSchema } from "@/shared";

export type EstadoFindOneByIdRequestDto = Type.Static<typeof EstadoFindOneByIdRoute.requestSchema>;

@Injectable("Singleton")
export class EstadoFindOneByIdRoute implements BaseAppRoute {
  static requestSchema = Type.Interface([RequestRepresentationDtoSchema], {
    params: Type.Object({
      id: Type.Index(EstadoFindOneByIdInputDtoSchema, ["id"]),
    }),
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
