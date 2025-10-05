import { Type } from "typebox";
import { type EstadoFindOneByIdInputDto, EstadoFindOneByIdInputDtoSchema, type EstadoFindOneByIdRequestDto, estadoAuthorizationFromRequest } from "@/features";
import { type RequestRepresentationDto, RequestRepresentationDtoSchema, validateDto } from "@/shared";

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
    const authorizationPort = estadoAuthorizationFromRequest();

    const request = await validateDto(EstadoFindOneByIdRoute.requestSchema, incomingRequest);
    const dto = EstadoFindOneByIdRoute.requestToDto(request);

    return this.estadoApplicationService.estadoFindOneById(authorizationPort, dto);
  }
}
