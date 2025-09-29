import { Injectable } from "@nestjs/common";
import { CampusApplicationService, CampusUpdateOneByIdRequestSchema } from "@/features/campus";
import {
  campusAuthorizationFromRequest
} from "@/features/campus/presentation/rest/authz/campus-authorization.from-request";
import { CampusOperationsDoc } from "@/features/campus/presentation/rest/docs/campus.operations.doc";
import { CampusRestMapper } from "@/features/campus/presentation/rest/mappers";
import { IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

@Injectable()
export class CampusUpdateOneByIdRoute {
  static requestSchema = CampusUpdateOneByIdRequestSchema;

  static operation = {
    summary: CampusOperationsDoc.campusUpdateOneById.summary,
    description: CampusOperationsDoc.campusUpdateOneById.description,
    operationId: CampusOperationsDoc.campusUpdateOneById.operationId,
  };

  constructor(private campusApplicationService: CampusApplicationService) {
  }

  async handler(incomingRequest: IRequestRepresentation) {
    const validatedRequest = await validateDto(CampusUpdateOneByIdRequestSchema, incomingRequest);

    const inputDto = CampusRestMapper.campusUpdateOneById.requestToDto(validatedRequest);
    const authorizationPort = campusAuthorizationFromRequest();

    return this.campusApplicationService.campusUpdateOneById(authorizationPort, inputDto);
  }
}
