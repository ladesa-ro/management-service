import { Controller, Get, Param, Post } from "@nestjs/common";
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
import {
  EmpresaScoreRecalculateCommandMetadata,
  IEmpresaScoreRecalculateCommandHandler,
} from "../domain/commands";
import {
  EmpresaScoreFindOneQueryMetadata,
  IEmpresaScoreFindOneQueryHandler,
} from "../domain/queries";
import { EmpresaScoreFindOneOutputRestDto } from "./empresa-score.rest.dto";
import { EmpresaScoreRestMapper } from "./empresa-score.rest.mapper";

@ApiTags("empresas-score")
@Controller("/empresas")
export class EmpresaScoreRestController {
  constructor(
    @Dep(IEmpresaScoreFindOneQueryHandler)
    private readonly findOneHandler: IEmpresaScoreFindOneQueryHandler,
    @Dep(IEmpresaScoreRecalculateCommandHandler)
    private readonly recalculateHandler: IEmpresaScoreRecalculateCommandHandler,
  ) {}

  @Get("/:id/score")
  @ApiOperation(EmpresaScoreFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EmpresaScoreFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getScore(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") empresaId: string,
  ): Promise<EmpresaScoreFindOneOutputRestDto> {
    const queryResult = await this.findOneHandler.execute(accessContext, { empresaId });
    return EmpresaScoreRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/:id/score/recalcular")
  @ApiOperation(EmpresaScoreRecalculateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EmpresaScoreFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async recalculateScore(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") empresaId: string,
  ): Promise<EmpresaScoreFindOneOutputRestDto> {
    const queryResult = await this.recalculateHandler.execute(accessContext, { empresaId });
    return EmpresaScoreRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
