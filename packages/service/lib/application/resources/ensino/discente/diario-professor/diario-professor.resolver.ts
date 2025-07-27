import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DiarioProfessorService } from "./diario-professor.service";

@Resolver()
export class DiarioProfessorResolver {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  async diarioProfessorFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DiarioProfessorFindAll") dto: IAppRequest<"DiarioProfessorFindAll">) {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }

  async diarioProfessorFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DiarioProfessorFindOneById") dto: IAppRequest<"DiarioProfessorFindOneById">,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  async diarioProfessorCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DiarioProfessorCreate") dto: IAppRequest<"DiarioProfessorCreate">) {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }

  async diarioProfessorUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DiarioProfessorUpdate") dto: IAppRequest<"DiarioProfessorUpdate">) {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, dto);
  }

  async diarioProfessorDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DiarioProfessorDeleteOneById") dto: IAppRequest<"DiarioProfessorDeleteOneById">) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}
