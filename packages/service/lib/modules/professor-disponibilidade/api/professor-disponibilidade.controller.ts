import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { ProfessorDisponibilidadeService } from "../domain/professor-disponibilidade.service";

@ApiTags("professores-disponibilidades")
@Controller("/professores-disponibilidades")
export class ProfessorDisponibilidadeController {
  constructor(private professorDisponibilidadeService: ProfessorDisponibilidadeService) {}

  @Get("/")
  async professorDisponibilidadeFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ProfessorDisponibilidadeList") dto: IAppRequest<"ProfessorDisponibilidadeList">) {
    const domain: IDomain.ProfessorDisponibilidadeListInput = requestRepresentationMergeToDomain(dto);
    return this.professorDisponibilidadeService.professorDisponibilidadeFindAll(accessContext, domain);
  }

  @Get("/:id")
  async professorDisponibilidadeFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorDisponibilidadeFindOneById") dto: IAppRequest<"ProfessorDisponibilidadeFindOneById">,
  ) {
    const domain: IDomain.ProfessorDisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.professorDisponibilidadeService.professorDisponibilidadeFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async professorDisponibilidadeCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ProfessorDisponibilidadeCreate") dto: IAppRequest<"ProfessorDisponibilidadeCreate">) {
    const domain: IDomain.ProfessorDisponibilidadeCreateInput = requestRepresentationMergeToDomain(dto);
    return this.professorDisponibilidadeService.professorDisponibilidadeCreate(accessContext, domain);
  }

  @Patch("/:id")
  async professorDisponibilidadeUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorDisponibilidadeUpdateOneById") dto: IAppRequest<"ProfessorDisponibilidadeUpdateOneById">,
  ) {
    const domain: IDomain.ProfessorDisponibilidadeFindOneInput & IDomain.ProfessorDisponibilidadeUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.professorDisponibilidadeService.professorDisponibilidadeUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async professorDisponibilidadeDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorDisponibilidadeDeleteOneById") dto: IAppRequest<"ProfessorDisponibilidadeDeleteOneById">,
  ) {
    const domain: IDomain.ProfessorDisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.professorDisponibilidadeService.professorDisponibilidadeDeleteOneById(accessContext, domain);
  }
}
