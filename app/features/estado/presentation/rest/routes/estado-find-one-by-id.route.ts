import { Type } from "typebox";
import { type EstadoFindOneByIdInputDto, EstadoFindOneByIdInputDtoSchema, estadoAuthorizationFromRequest } from "@/features";
import { type RequestRepresentationDto, RequestRepresentationDtoSchema, validateDto } from "@/shared";

export type EstadoFindOneByIdRequestDto = Type.Static<typeof EstadoFindOneByIdRoute.requestSchema>;

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

  constructor(private estadoApplicationService: EstadoApplicationService) {}

  async handler(incomingRequest: RequestRepresentationDto) {
    const request = await validateDto(EstadoFindOneByIdRoute.requestSchema, incomingRequest);
    const dto = EstadoFindOneByIdRoute.requestToDto(request);

    const authorizationPort = estadoAuthorizationFromRequest(request);

    return this.estadoApplicationService.estadoFindOneById(authorizationPort, dto);
  }
}
