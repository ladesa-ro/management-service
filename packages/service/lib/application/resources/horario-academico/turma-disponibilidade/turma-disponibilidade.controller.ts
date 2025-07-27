import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@ApiTags("turmas-disponibilidades")
@Controller("/turmas-disponibilidades")
export class TurmaDisponibilidadeController {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  @Get("/")
  async turmaDisponibilidadeFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDisponibilidadeFindAll") dto: IAppRequest<"TurmaDisponibilidadeFindAll">) {
    const domain: IDomain.TurmaDisponibilidadeListInput = requestRepresentationMergeToDomain(dto);
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, domain);
  }

  @Get("/:id")
  async turmaDisponibilidadeFindById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("TurmaDisponibilidadeFindById") dto: IAppRequest<"TurmaDisponibilidadeFindById">,
  ) {
    const domain: IDomain.TurmaDisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async turmaDisponibilidadeCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDisponibilidadeCreate") dto: IAppRequest<"TurmaDisponibilidadeCreate">) {
    const domain: IDomain.TurmaDisponibilidadeCreateInput = requestRepresentationMergeToDomain(dto);
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, domain);
  }

  @Patch("/:id")
  async turmaDisponibilidadeUpdate(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("TurmaDisponibilidadeUpdate") dto: IAppRequest<"TurmaDisponibilidadeUpdate">,
  ) {
    const domain: IDomain.TurmaDisponibilidadeUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async turmaDisponibilidadeDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("TurmaDisponibilidadeDeleteOneById") dto: IAppRequest<"TurmaDisponibilidadeDeleteOneById">,
  ) {
    const domain: IDomain.TurmaDisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, domain);
  }
}
