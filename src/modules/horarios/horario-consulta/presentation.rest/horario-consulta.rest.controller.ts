import { Controller, Get, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/access-context";
import { HorarioMescladoQueryMetadata, IHorarioConsultaQueryHandler } from "../domain/queries";
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
  @ApiOperation(HorarioMescladoQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioSemanalOutputRestDto })
  @ApiForbiddenResponse()
  async mesclado(
    @AccessContextHttp() accessContext: IAccessContext,
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
