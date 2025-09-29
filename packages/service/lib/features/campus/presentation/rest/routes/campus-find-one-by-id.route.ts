import { Injectable } from "@nestjs/common";
import { CampusApplicationService } from "@/features/campus";
import {
  campusAuthorizationFromRequest
} from "@/features/campus/presentation/rest/authz/campus-authorization.from-request";
import { CampusOperationsDoc } from "@/features/campus/presentation/rest/docs/campus.operations.doc";
import { CampusRestMapper } from "@/features/campus/presentation/rest/mappers/campus-rest.mapper";
import {
  CampusFindOneByIdRequestSchema
} from "@/features/campus/presentation/rest/schemas/campus-find-one-by-id.request.schema";
import { IRequestRepresentation } from "@/infrastructure/adapters/http/request-representation";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

@Injectable()
export class CampusFindOneByIdRoute {
  static requestSchema = CampusFindOneByIdRequestSchema;

  static operation = {
    summary: CampusOperationsDoc.campusFindOneById.summary,
    description: CampusOperationsDoc.campusFindOneById.description,
    operationId: CampusOperationsDoc.campusFindOneById.operationId,
  };

  constructor(private campusApplicationService: CampusApplicationService) {
  }

  async handler(incomingRequest: IRequestRepresentation) {
    const request = await validateDto(CampusFindOneByIdRequestSchema, incomingRequest);

    const inputDto = CampusRestMapper.campusFindOneById.requestToDto(request);
    const authorizationPort = campusAuthorizationFromRequest();

    return this.campusApplicationService.campusFindOneById(authorizationPort, inputDto);
  }
}
