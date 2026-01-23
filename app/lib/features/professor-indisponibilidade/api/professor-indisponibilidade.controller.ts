import { BadRequestException, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import type { IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { IDomain } from "@/shared/tsp/schema/typings";
import { ProfessorIndisponibilidadeService } from "../domain/professor-indisponibilidade.service";

@ApiTags("indisponibilidades-professores")
@Controller("/indisponibilidades")
export class ProfessorIndisponibilidadeController {
  constructor(private readonly professorIndisponibilidadeService: ProfessorIndisponibilidadeService) {}

  @Get("/list/:idPerfilFk")
  async professorIndisponibilidadeListById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ProfessorIndisponibilidadeList") dto: IAppRequest<"ProfessorIndisponibilidadeList">) {
    const domain = requestRepresentationMergeToDomain(dto) as any;
    return this.professorIndisponibilidadeService.ProfessorIndisponibilidadeListByPerfil(accessContext, domain.idPerfilFk);
  }

  @Get("/:id")
  async professorIndisponibilidadeFindOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeFindOneById") dto: IAppRequest<"ProfessorIndisponibilidadeFindOneById">,
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as IDomain.ProfessorIndisponibilidadeFindOneInput;
    return this.professorIndisponibilidadeService.indisponibilidadeFindByIdSimple(accessContext, domain.id);
  }

  @Post("/:id_perfil/create")
  async professorIndisponibilidadeCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ProfessorIndisponibilidadeCreate") dto: IAppRequest<"ProfessorIndisponibilidadeCreate">) {
    const domain: IDomain.ProfessorIndisponibilidadeCreateInput = requestRepresentationMergeToDomain(dto);
    return this.professorIndisponibilidadeService.createIndisponibilidade(accessContext, domain);
  }

  @Patch("/:id")
  async professorIndisponibilidadeUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeUpdateOneById") dto: IAppRequest<"ProfessorIndisponibilidadeUpdateOneById">,
  ) {
    const domain: IDomain.ProfessorIndisponibilidadeFindOneInput & IDomain.ProfessorIndisponibilidadeUpdateInput = requestRepresentationMergeToDomain(dto);

    return this.professorIndisponibilidadeService.indisponibilidadeUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async professorIndisponibilidadeDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeDeleteOneById") dto: IAppRequest<"ProfessorIndisponibilidadeDeleteOneById">,
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as any;
    if (!domain.id) throw new BadRequestException();
    return this.professorIndisponibilidadeService.indisponibilidadeDelete(accessContext, domain.id);
  }

  @Get("/rrule-indisponibilidade/:id")
  async professorIndisponibilidadeRRuleFindOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeRRuleFindOneById") dto: IAppRequest<"ProfessorIndisponibilidadeRRuleFindOneById">,
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as any;
    return this.professorIndisponibilidadeService.ProfessorIndisponibilidadeRRuleFindOneById(accessContext, domain.id);
  }
  
}
