import { Injectable } from "@nestjs/common";
import { CampusApplicationService } from "@/features/campus";
import {
  campusAuthorizationFromRequest
} from "@/features/campus/presentation/rest/authz/campus-authorization.from-request";
import { CampusOperationsDoc } from "@/features/campus/presentation/rest/docs/campus.operations.doc";
import { CampusRestMapper } from "@/features/campus/presentation/rest/mappers";
import { CampusListRequestSchema } from "@/features/campus/presentation/rest/schemas/campus-list.request.schema";
import { IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

@Injectable()
export class CampusListRoute {
  static requestSchema = CampusListRequestSchema;

  static operation = {
    summary: CampusOperationsDoc.campusList.summary,
    description: CampusOperationsDoc.campusList.description,
    operationId: CampusOperationsDoc.campusList.operationId,
  };

  constructor(private campusApplicationService: CampusApplicationService) {
  }

  async handler(incomingRequest: IRequestRepresentation) {
    const validatedRequest = await validateDto(CampusListRequestSchema, incomingRequest);

    const inputDto = CampusRestMapper.campusList.requestToDto(validatedRequest);
    const authorizationPort = campusAuthorizationFromRequest();

    return this.campusApplicationService.campusList(authorizationPort, inputDto);
  }
}
