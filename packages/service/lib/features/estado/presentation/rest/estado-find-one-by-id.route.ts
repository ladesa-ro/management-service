import { Injectable } from "@nestjs/common";
import { Type } from "@sinclair/typebox";
import { EstadoApplicationService } from "@/features/estado";
import { EstadoFindOneByIdInputDto, EstadoFindOneByIdInputSchema, IEstadoAuthorizationPort } from "@/features/estado/application";
import { EstadoOperations } from "@/features/estado/application/estado.operations";
import { IRequestRepresentation, RequestRepresentationSchema } from "@/infrastructure/adapters/http/request-representation";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

const estadoFindOneByIdRequestSchema = Type.Composite([
  RequestRepresentationSchema,
  Type.Object({
    params: Type.Object({
      id: Type.Index(EstadoFindOneByIdInputSchema, ["id"]),
    }),
  }),
]);

@Injectable()
export class EstadoFindOneByIdRoute {
  static requestSchema = estadoFindOneByIdRequestSchema;

  static operation = {
    summary: EstadoOperations.estadoFindOneById.summary,
    description: EstadoOperations.estadoFindOneById.description,
    operationId: EstadoOperations.estadoFindOneById.operationId,
  };

  constructor(private estadoApplicationService: EstadoApplicationService) {}

  async handler(incomingRequest: IRequestRepresentation) {
    console.log({ incomingRequest });
    const validatedRequest = await validateDto(estadoFindOneByIdRequestSchema, incomingRequest);

    const inputDto: EstadoFindOneByIdInputDto = {
      id: validatedRequest.params.id,
    };

    const authorizationPort: IEstadoAuthorizationPort = {
      canRead: async () => {
        return true;
      },
      getReadFilters: () => {
        return true;
      },
    };

    return this.estadoApplicationService.estadoFindOneById(authorizationPort, inputDto);
  }
}
