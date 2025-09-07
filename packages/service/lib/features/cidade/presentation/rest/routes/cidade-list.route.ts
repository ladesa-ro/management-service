import { Injectable } from "@nestjs/common";
import { CidadeApplicationService, CidadeRestMapper } from "@/features/cidade";
import {
  cidadeAuthorizationFromRequest
} from "@/features/cidade/presentation/rest/authz/cidade-authorization.from-request";
import { CidadeOperationsDoc } from "@/features/cidade/presentation/rest/docs/cidade.operations.doc";
import { CidadeListRequestSchema } from "@/features/cidade/presentation/rest/schemas";
import { IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

@Injectable()
export class CidadeListRoute {
  static requestSchema = CidadeListRequestSchema;

  static operation = {
    summary: CidadeOperationsDoc.cidadeList.summary,
    description: CidadeOperationsDoc.cidadeList.description,
    operationId: CidadeOperationsDoc.cidadeList.operationId,
  };

  constructor(private cidadeApplicationService: CidadeApplicationService) {
  }

  async handler(incomingRequest: IRequestRepresentation) {
    const request = await validateDto(CidadeListRequestSchema, incomingRequest);

    const inputDto = CidadeRestMapper.cidadeList.requestToDto(request);
    const authorizationPort = cidadeAuthorizationFromRequest();

    return this.cidadeApplicationService.cidadeList(authorizationPort, inputDto);
  }
}
