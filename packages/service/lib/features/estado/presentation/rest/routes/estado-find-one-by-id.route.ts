import { Injectable } from "@nestjs/common";
import { EstadoApplicationService } from "@/features/estado";
import {
  estadoAuthorizationFromRequest
} from "@/features/estado/presentation/rest/authz/estado-authorization.from-request";
import { EstadoOperationsDoc } from "@/features/estado/presentation/rest/docs/estado.operations.doc";
import { EstadoRestMapper } from "@/features/estado/presentation/rest/mappers/estado-rest.mapper";
import {
  EstadoFindOneByIdRequestSchema
} from "@/features/estado/presentation/rest/schemas/estado-find-one-by-id.request.schema";
import { IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

@Injectable()
export class EstadoFindOneByIdRoute {
  static requestSchema = EstadoFindOneByIdRequestSchema;

  static operation = {
    summary: EstadoOperationsDoc.estadoFindOneById.summary,
    description: EstadoOperationsDoc.estadoFindOneById.description,
    operationId: EstadoOperationsDoc.estadoFindOneById.operationId,
  };

  constructor(private estadoApplicationService: EstadoApplicationService) {
  }

  async handler(incomingRequest: IRequestRepresentation) {
    const request = await validateDto(EstadoFindOneByIdRequestSchema, incomingRequest);

    const inputDto = EstadoRestMapper.estadoFindOneById.requestToDto(request);
    const authorizationPort = estadoAuthorizationFromRequest();

    return this.estadoApplicationService.estadoFindOneById(authorizationPort, inputDto);
  }
}
