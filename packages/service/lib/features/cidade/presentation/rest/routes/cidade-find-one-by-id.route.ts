import { Injectable } from "@nestjs/common";
import { CidadeRestMapper } from "@/features/cidade";
import { CidadeFindOneByIdRequestSchema } from "@/features/cidade/presentation/rest/schemas";
import { IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";
import { CidadeApplicationService } from "../../../application/services/cidade.application-service";
import { cidadeAuthorizationFromRequest } from "../authz/cidade-authorization.from-request";
import { CidadeOperationsDoc } from "../docs/cidade.operations.doc";

@Injectable()
export class CidadeFindOneByIdRoute {
  static requestSchema = CidadeFindOneByIdRequestSchema;

  static operation = {
    summary: CidadeOperationsDoc.cidadeFindOneById.summary,
    description: CidadeOperationsDoc.cidadeFindOneById.description,
    operationId: CidadeOperationsDoc.cidadeFindOneById.operationId,
  };

  constructor(private cidadeApplicationService: CidadeApplicationService) {
  }

  async handler(incomingRequest: IRequestRepresentation) {
    const request = await validateDto(CidadeFindOneByIdRequestSchema, incomingRequest);

    const inputDto = CidadeRestMapper.cidadeFindOneById.requestToDto(request);
    const authorizationPort = cidadeAuthorizationFromRequest();

    return this.cidadeApplicationService.cidadeFindOneById(authorizationPort, inputDto);
  }
}
