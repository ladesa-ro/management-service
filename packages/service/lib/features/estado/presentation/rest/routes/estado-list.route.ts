import { Injectable } from "@nestjs/common";
import { EstadoApplicationService } from "@/features/estado";
import {
  estadoAuthorizationFromRequest
} from "@/features/estado/presentation/rest/authz/estado-authorization.from-request";
import { EstadoOperationsDoc } from "@/features/estado/presentation/rest/docs/estado.operations.doc";
import { EstadoRestMapper } from "@/features/estado/presentation/rest/mappers";
import { EstadoListRequestSchema } from "@/features/estado/presentation/rest/schemas/estado-list.request.schema";
import { IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

@Injectable()
export class EstadoListRoute {
  static requestSchema = EstadoListRequestSchema;

  static operation = {
    summary: EstadoOperationsDoc.estadoList.summary,
    description: EstadoOperationsDoc.estadoList.description,
    operationId: EstadoOperationsDoc.estadoList.operationId,
  };

  constructor(private estadoApplicationService: EstadoApplicationService) {
  }

  async handler(incomingRequest: IRequestRepresentation) {
    const validatedRequest = await validateDto(EstadoListRequestSchema, incomingRequest);
    const inputDto = EstadoRestMapper.estadoList.requestToDto(validatedRequest);

    const authorizationPort = estadoAuthorizationFromRequest();
    return this.estadoApplicationService.estadoList(authorizationPort, inputDto);
  }
}
