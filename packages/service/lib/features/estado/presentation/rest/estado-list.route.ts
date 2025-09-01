import { Injectable } from "@nestjs/common";
import { EstadoApplicationService } from "@/features/estado";
import { EstadoListInputSchema, EstadoListSettings, IEstadoAuthorizationPort } from "@/features/estado/application";
import { EstadoOperations } from "@/features/estado/application/estado.operations";
import { IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { getListRequestSchema, requestListDtoToInputDto } from "@/shared";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

const estadoListRequestSchema = getListRequestSchema(EstadoListInputSchema, EstadoListSettings);

@Injectable()
export class EstadoListRoute {
  static requestSchema = estadoListRequestSchema;

  static operation = {
    summary: EstadoOperations.estadoList.summary,
    description: EstadoOperations.estadoList.description,
    operationId: EstadoOperations.estadoList.operationId,
  };

  constructor(private estadoApplicationService: EstadoApplicationService) {}

  async handler(incomingRequest: IRequestRepresentation) {
    const validatedRequest = await validateDto(estadoListRequestSchema, incomingRequest);

    const inputDto = requestListDtoToInputDto(validatedRequest);

    const authorizationPort: IEstadoAuthorizationPort = {
      canRead: async () => {
        return true;
      },
      getReadFilters: () => {
        return true;
      },
    };

    return this.estadoApplicationService.estadoList(authorizationPort, inputDto);
  }
}
