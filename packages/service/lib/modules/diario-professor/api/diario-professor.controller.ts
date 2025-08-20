import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiarioProfessorService } from "@/modules/diario-professor/domain/diario-professor.service";
import { AccessContext, AccessContextHttp, AppRequest, type IAppRequest, type IDomain, requestRepresentationMergeToDomain } from "@/shared";

@ApiTags("diarios-professores")
@Controller("/diarios-professores")
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  @Get("/")
  async diarioProfessorFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioProfessorList") dto: IAppRequest<"DiarioProfessorList">) {
    const domain: IDomain.DiarioProfessorListInput = requestRepresentationMergeToDomain(dto);
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, domain);
  }

  @Get("/:id")
  async diarioProfessorFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioProfessorFindOneById") dto: IAppRequest<"DiarioProfessorFindOneById">) {
    const domain: IDomain.DiarioProfessorFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async diarioProfessorCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioProfessorCreate") dto: IAppRequest<"DiarioProfessorCreate">) {
    const domain: IDomain.DiarioProfessorCreateInput = requestRepresentationMergeToDomain(dto);
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, domain);
  }

  @Patch("/:id")
  async diarioProfessorUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioProfessorUpdateOneById") dto: IAppRequest<"DiarioProfessorUpdateOneById">) {
    const domain: IDomain.DiarioProfessorFindOneInput & IDomain.DiarioProfessorUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async diarioProfessorDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioProfessorDeleteOneById") dto: IAppRequest<"DiarioProfessorDeleteOneById">) {
    const domain: IDomain.DiarioProfessorFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, domain);
  }
}
