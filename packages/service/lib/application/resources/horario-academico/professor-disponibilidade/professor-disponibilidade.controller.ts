import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ProfessorDisponibilidadeService } from "./professor-disponibilidade.service";

@ApiTags("professores-disponibilidades")
@Controller("/professores-disponibilidades")
export class ProfessorDisponibilidadeController {
  constructor(private professorDisponibilidadeService: ProfessorDisponibilidadeService) {}

  //

  @Get("/")
  async professorDisponibilidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("ProfessorDisponibilidadeFindAll") dto: IAppRequest<"ProfessorDisponibilidadeFindAll">,
  ): Promise<LadesaTypings.ProfessorDisponibilidadeListOperationOutput["success"]> {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async professorDisponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("ProfessorDisponibilidadeFindById") dto: IAppRequest<"ProfessorDisponibilidadeFindById">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async professorDisponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("ProfessorDisponibilidadeCreate") dto: IAppRequest<"ProfessorDisponibilidadeCreate">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async professorDisponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("ProfessorDisponibilidadeUpdate") dto: IAppRequest<"ProfessorDisponibilidadeUpdate">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async professorDisponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("ProfessorDisponibilidadeDeleteOneById") dto: IAppRequest<"ProfessorDisponibilidadeDeleteOneById">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
