import { Type } from "typebox";
import { ESTADO_USE_CASES, type EstadoFindOneByIdInputDto, EstadoFindOneByIdInputDtoSchema, estadoAuthorizationFromRequest, type IEstadoUseCasesPort } from "@/features";
import { Inject, Injectable, type RequestRepresentationDto, RequestRepresentationDtoSchema, validateDto } from "@/shared";

export type EstadoFindOneByIdRequestDto = Type.Static<typeof EstadoFindOneByIdRoute.requestSchema>;

@Injectable("Singleton")
export class EstadoFindOneByIdRoute {
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

  async handler(incomingRequest: RequestRepresentationDto) {
    const request = await validateDto(EstadoFindOneByIdRoute.requestSchema, incomingRequest);
    const dto = EstadoFindOneByIdRoute.requestToDto(request);

    const authorizationPort = estadoAuthorizationFromRequest(request);

    return this.estadoApplicationService.estadoFindOneById(authorizationPort, dto);
  }
}
