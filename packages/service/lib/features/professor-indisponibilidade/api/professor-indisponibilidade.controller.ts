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

@Get("/:id")
async professorIndisponibilidadeFindOneById(
  @AccessContextHttp() accessContext: AccessContext,
  @AppRequest("ProfessorIndisponibilidadeFindOneById") dto: IAppRequest<"ProfessorIndisponibilidadeFindOneById">,
) {
  const domain = requestRepresentationMergeToDomain(dto) as any;
  const id = (dto.path as any)?.id ?? domain?.id;
  if (!id) throw new BadRequestException();
  return this.professorIndisponibilidadeService.findById(id);
}

@Get("/professores/:id_perfil/indisponibilidades")
async professorIndisponibilidadeListByProfessor(
  @AccessContextHttp() accessContext: AccessContext,
  @AppRequest("ProfessorIndisponibilidadeList") dto: IAppRequest<"ProfessorIndisponibilidadeList">,
) {
  const domain = requestRepresentationMergeToDomain(dto) as any;
  const idPerfil = (dto.path as any)?.id_perfil ?? domain?.id_perfil ?? (domain as any)["filter.id_perfil_fk"];
  if (!idPerfil) throw new BadRequestException();
  return this.professorIndisponibilidadeService.listByProfessorSimple(idPerfil);
}
}
