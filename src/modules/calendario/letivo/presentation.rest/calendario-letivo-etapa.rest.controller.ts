import { Controller, Param, Post } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import { CalendarioLetivoDesativarCommandMetadata } from "../domain/calendario-letivo-etapa.operations";
import { ICalendarioLetivoRepository } from "../domain/repositories/calendario-letivo.repository.interface";
import { CalendarioLetivoFindOneInputRestDto } from "./calendario-letivo.rest.dto";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoDesativarRestController {
  constructor(
    @Dep(ICalendarioLetivoRepository)
    private readonly calendarioLetivoRepository: ICalendarioLetivoRepository,
  ) {}

  @Post("/:id/desativar")
  @ApiOperation(CalendarioLetivoDesativarCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async desativar(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
  ): Promise<boolean> {
    await this.calendarioLetivoRepository.softDeleteById(params.id);
    return true;
  }
}
