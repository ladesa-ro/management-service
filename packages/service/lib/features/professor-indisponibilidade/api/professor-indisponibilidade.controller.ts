import { Controller, Get, Post, Patch, Delete, BadRequestException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import type { IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import type { IDomain } from "@/shared/tsp/schema/typings";
import { ProfessorIndisponibilidadeService } from "../domain/professor-indisponibilidade.service";

@ApiTags("indisponibilidades-professores")
@Controller("/indisponibilidades")
export class ProfessorIndisponibilidadeController {
  constructor(private readonly professorIndisponibilidadeService: ProfessorIndisponibilidadeService) {}

  @Get("/")
  async professorIndisponibilidadeList(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeList") dto: IAppRequest<"ProfessorIndisponibilidadeList">
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as any;
    return this.professorIndisponibilidadeService.indisponibilidadeFindAll(accessContext, domain);
  }

  @Get("/:id")
  async professorIndisponibilidadeFindOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeFindOneById") dto: IAppRequest<"ProfessorIndisponibilidadeFindOneById">
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as any;
    return this.professorIndisponibilidadeService.indisponibilidadeFindByIdStrict(accessContext, domain.id);
  }

@Get("/professores/:id_perfil")
async professorIndisponibilidadeListByProfessor(
  @AccessContextHttp() accessContext: AccessContext,
  @AppRequest("ProfessorIndisponibilidadeList") dto: IAppRequest<"ProfessorIndisponibilidadeList">
) {
  const idPerfil = dto.path; 
  if (!idPerfil) throw new BadRequestException();
  return this.professorIndisponibilidadeService.listByProfessor(accessContext, idPerfil);
}

@Post("/professores/:id_perfil")
async professorIndisponibilidadeCreate(
  @AccessContextHttp() accessContext: AccessContext,
  @AppRequest("ProfessorIndisponibilidadeCreate") dto: IAppRequest<"ProfessorIndisponibilidadeCreate">
) {
  const domain = requestRepresentationMergeToDomain(dto) as IDomain.ProfessorIndisponibilidadeCreateInput & any;
  const idPerfil = dto.path; 
  if (!idPerfil) throw new BadRequestException();
  return this.professorIndisponibilidadeService.createForProfessor(accessContext, idPerfil, domain);
}

  @Patch("/:id")
  async professorIndisponibilidadeUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeUpdateOneById") dto: IAppRequest<"ProfessorIndisponibilidadeUpdateOneById">
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as IDomain.ProfessorIndisponibilidadeUpdateInput & any;
    if (!domain.id) throw new BadRequestException();
    return this.professorIndisponibilidadeService.indisponibilidadeUpdate(accessContext, domain.id, domain);
  }

  @Delete("/:id")
  async professorIndisponibilidadeDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeDeleteOneById") dto: IAppRequest<"ProfessorIndisponibilidadeDeleteOneById">
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as any;
    if (!domain.id) throw new BadRequestException();
    return this.professorIndisponibilidadeService.indisponibilidadeDelete(accessContext, domain.id);
  }
}
