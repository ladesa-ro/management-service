import { Injectable } from "@nestjs/common";
import { CampusApplicationService } from "@/features/campus/application";
import {
  campusAuthorizationFromRequest
} from "@/features/campus/presentation/rest/authz/campus-authorization.from-request";
import { CampusOperationsDoc } from "@/features/campus/presentation/rest/docs/campus.operations.doc";
import { CampusRestMapper } from "@/features/campus/presentation/rest/mappers";
import { CampusCreateRequestSchema } from "@/features/campus/presentation/rest/schemas";
import { IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

@Injectable()
export class CampusCreateRoute {
  static requestSchema = CampusCreateRequestSchema;

  static operation = {
    summary: CampusOperationsDoc.campusCreate.summary,
    description: CampusOperationsDoc.campusCreate.description,
    operationId: CampusOperationsDoc.campusCreate.operationId,
  };

  constructor(private campusApplicationService: CampusApplicationService) {
  }

  async handler(incomingRequest: IRequestRepresentation) {
    const validatedRequest = await validateDto(CampusCreateRequestSchema, incomingRequest);

    const inputDto = CampusRestMapper.campusCreate.requestToDto(validatedRequest);
    const authorizationPort = campusAuthorizationFromRequest();

    return this.campusApplicationService.campusCreate(authorizationPort, inputDto);
  }
}
