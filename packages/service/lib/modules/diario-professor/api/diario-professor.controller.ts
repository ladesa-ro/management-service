import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { DiarioProfessorService } from "./domain/diario-professor.service";

@ApiTags("diarios-professores")
@Controller("/diarios-professores")
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {
  }

  @Get("/")
  async diarioProfessorFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioProfessorList") dto: IAppRequest<"DiarioProfessorList">) {
    const domain: IDomain.DiarioProfessorListInput = requestRepresentationMergeToDomain(dto);
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, domain);
  }

  @Get("/:id")
  async diarioProfessorFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioProfessorFindById") dto: IAppRequest<"DiarioProfessorFindOneById">) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, {id: dto.path.id});
  }

  @Post("/")
  async diarioProfessorCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioProfessorCreate") dto: IAppRequest<"DiarioProfessorCreate">) {
    const domain: IDomain.DiarioProfessorCreateInput = requestRepresentationMergeToDomain(dto);
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, domain);
  }

  @Patch("/:id")
  async diarioProfessorUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioProfessorUpdate") dto: IAppRequest<"DiarioProfessorUpdateOneById">) {
    const domain: IDomain.DiarioProfessorUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async diarioProfessorDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioProfessorDeleteOneById") dto: IAppRequest<"DiarioProfessorDeleteOneById">) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, {id: dto.path.id});
  }
}
