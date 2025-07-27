import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@ApiTags("turmas-disponibilidades")
@Controller("/turmas-disponibilidades")
export class TurmaDisponibilidadeController {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  @Get("/")
  async turmaDisponibilidadeFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("TurmaDisponibilidadeFindAll") dto: IAppRequest<"TurmaDisponibilidadeFindAll">,
  ): Promise<LadesaTypings.TurmaDisponibilidadeListOperationOutput["success"]> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto);
  }

  @Get("/:id")
  async turmaDisponibilidadeFindById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("TurmaDisponibilidadeFindById") dto: IAppRequest<"TurmaDisponibilidadeFindById">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async turmaDisponibilidadeCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDisponibilidadeCreate") dto: IAppRequest<"TurmaDisponibilidadeCreate">) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }

  @Patch("/:id")
  async turmaDisponibilidadeUpdate(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("TurmaDisponibilidadeUpdate") dto: IAppRequest<"TurmaDisponibilidadeUpdate">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async turmaDisponibilidadeDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("TurmaDisponibilidadeDeleteOneById") dto: IAppRequest<"TurmaDisponibilidadeDeleteOneById">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
