import { Controller, Get, Post, Patch, Delete, BadRequestException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import type { IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import type { IDomain } from "@/shared/tsp/schema/typings";
import { ProfessorIndisponibilidadeService } from "../domain/professor-indisponibilidade.service";


//evitei caracteres UTF-8
@ApiTags("indisponibilidades-professores")
@Controller("/indisponibilidades")
export class ProfessorIndisponibilidadeController {
  constructor(private readonly professorIndisponibilidadeService: ProfessorIndisponibilidadeService) {}

  @Get("/")
  async professorIndisponibilidadeList(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeList") dto: IAppRequest<"ProfessorIndisponibilidadeList">,
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as IDomain.ProfessorIndisponibilidadeListOutput;
    const idPerfil = (domain as any)["id_perfil_fk"];
    if (idPerfil) return this.professorIndisponibilidadeService.listByProfessor(idPerfil);
    throw new BadRequestException("id_perfil eh obrigatorio");
  }

  @Get("/:id")
  async professorIndisponibilidadeFindOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeFindOneById") dto: IAppRequest<"ProfessorIndisponibilidadeFindOneById">,
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as IDomain.ProfessorIndisponibilidadeFindOneOutput | any;
    return this.professorIndisponibilidadeService.findById(domain.id);
  }

  @Get("/professores/:id_perfil/indisponibilidades")
  async professorIndisponibilidadeListByProfessor(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeList") dto: IAppRequest<"ProfessorIndisponibilidadeList">,
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as any;
    return this.professorIndisponibilidadeService.listByProfessor(domain.id_perfil);
  }

  @Post("/professores/:id_perfil/indisponibilidades")
  async professorIndisponibilidadeCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeCreate") dto: IAppRequest<"ProfessorIndisponibilidadeCreate">,
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as IDomain.ProfessorIndisponibilidadeCreateInput & any;
    const idPerfil = (domain as any).id_perfil ?? (dto.body as any)?.id_perfil ?? (dto.path as any)?.id_perfil;
    return this.professorIndisponibilidadeService.create(idPerfil, domain);
  }

  @Patch("/indisponibilidades/:id")
  async professorIndisponibilidadeUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeUpdateOneById") dto: IAppRequest<"ProfessorIndisponibilidadeUpdateOneById">,
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as IDomain.ProfessorIndisponibilidadeUpdateInput & IDomain.ProfessorIndisponibilidadeUpdateInput & any;
    return this.professorIndisponibilidadeService.update(domain.id, domain);
  }

  @Delete("/indisponibilidades/:id")
  async professorIndisponibilidadeDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ProfessorIndisponibilidadeDeleteOneById") dto: IAppRequest<"ProfessorIndisponibilidadeDeleteOneById">,
  ) {
    const domain = requestRepresentationMergeToDomain(dto) as any;
    return this.professorIndisponibilidadeService.delete(domain.id);
  }
}
