import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { TurmaDisponibilidadeService } from "./domain/turma-disponibilidade.service";

@ApiTags("turmas-disponibilidades")
@Controller("/turmas-disponibilidades")
export class TurmaDisponibilidadeController {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {
  }

  @Get("/")
  async turmaDisponibilidadeFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDisponibilidadeList") dto: IAppRequest<"TurmaDisponibilidadeList">) {
    const domain: IDomain.TurmaDisponibilidadeListInput = requestRepresentationMergeToDomain(dto);
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, domain);
  }

  @Get("/:id")
  async turmaDisponibilidadeFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDisponibilidadeFindById") dto: IAppRequest<"TurmaDisponibilidadeFindOneById">) {
    const domain: IDomain.TurmaDisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async turmaDisponibilidadeCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDisponibilidadeCreate") dto: IAppRequest<"TurmaDisponibilidadeCreate">) {
    const domain: IDomain.TurmaDisponibilidadeCreateInput = requestRepresentationMergeToDomain(dto);
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, domain);
  }

  @Patch("/:id")
  async turmaDisponibilidadeUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDisponibilidadeUpdate") dto: IAppRequest<"TurmaDisponibilidadeUpdateOneById">) {
    const domain: IDomain.TurmaDisponibilidadeUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async turmaDisponibilidadeDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDisponibilidadeDeleteOneById") dto: IAppRequest<"TurmaDisponibilidadeDeleteOneById">) {
    const domain: IDomain.TurmaDisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, domain);
  }
}
