import { Injectable } from "@nestjs/common";
import { CampusApplicationService } from "@/features/campus";
import {
  campusAuthorizationFromRequest
} from "@/features/campus/presentation/rest/authz/campus-authorization.from-request";
import { CampusOperationsDoc } from "@/features/campus/presentation/rest/docs/campus.operations.doc";
import { CampusRestMapper } from "@/features/campus/presentation/rest/mappers/campus-rest.mapper";
import {
  CampusDeleteOneByIdRequestSchema
} from "@/features/campus/presentation/rest/schemas/campus-delete-one-by-id.request.schema";
import { IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

@Injectable()
export class CampusDeleteOneByIdRoute {
  static requestSchema = CampusDeleteOneByIdRequestSchema;

  static operation = {
    summary: CampusOperationsDoc.campusDeleteOneById.summary,
    description: CampusOperationsDoc.campusDeleteOneById.description,
    operationId: CampusOperationsDoc.campusDeleteOneById.operationId,
  };

  constructor(private campusApplicationService: CampusApplicationService) {
  }

  async handler(incomingRequest: IRequestRepresentation) {
    const request = await validateDto(CampusDeleteOneByIdRequestSchema, incomingRequest);

    const inputDto = CampusRestMapper.campusDeleteOneById.requestToDto(request);
    const authorizationPort = campusAuthorizationFromRequest();

    return this.campusApplicationService.campusDeleteOneById(authorizationPort, inputDto);
  }
}
