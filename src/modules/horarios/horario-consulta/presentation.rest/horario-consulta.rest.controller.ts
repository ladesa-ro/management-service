import { Controller, Get, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/server/access-context";
import { IHorarioConsultaQueryHandler } from "../domain/queries";
import {
  HorarioMescladoQueryParamsRestDto,
  HorarioSemanalOutputRestDto,
} from "./horario-consulta.rest.dto";

@ApiTags("horarios")
@Controller("/horarios")
export class HorarioConsultaRestController {
  constructor(
    @DeclareDependency(IHorarioConsultaQueryHandler)
    private readonly queryHandler: IHorarioConsultaQueryHandler,
  ) {}

  @Get("/mesclado")
  @ApiOperation({
    summary: "Consulta horario mesclado de multiplas turmas",
    operationId: "horarioMesclado",
  })
  @ApiOkResponse({ type: HorarioSemanalOutputRestDto })
  @ApiForbiddenResponse()
  async mesclado(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() params: HorarioMescladoQueryParamsRestDto,
  ): Promise<HorarioSemanalOutputRestDto> {
    const turmaIds = params.ids
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    const professorIds = params.professorIds
      ? params.professorIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
      : undefined;
    return this.queryHandler.findHorarioMesclado(accessContext, {
      semana: params.semana,
      turmaIds,
      professorIds,
    });
  }
}
