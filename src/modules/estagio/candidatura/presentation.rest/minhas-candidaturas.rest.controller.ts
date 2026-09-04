import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiGoneResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, IContainer } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  CandidaturaAceitarCommandMetadata,
  ICandidaturaAceitarCommandHandler,
} from "../domain/commands/candidatura-aceitar.command.handler.interface";
import {
  CandidaturaCancelarCommandMetadata,
  ICandidaturaCancelarCommandHandler,
} from "../domain/commands/candidatura-cancelar.command.handler.interface";
import {
  IMinhasCandidaturasListQueryHandler,
  MinhasCandidaturasListQueryMetadata,
} from "../domain/queries/minhas-candidaturas-list.query.handler.interface";
import {
  CandidaturaCancelarInputRestDto,
  EstagioCandidaturaOutputRestDto,
  MinhasCandidaturasListInputRestDto,
  MinhasCandidaturasListOutputRestDto,
} from "./estagio-candidatura.rest.dto";

@ApiTags("minhas-candidaturas")
@Controller("/minhas-candidaturas")
export class MinhasCandidaturasRestController {
  constructor(@Dep(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation(MinhasCandidaturasListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({
    description: "Lista de candidaturas do aluno autenticado",
    type: MinhasCandidaturasListOutputRestDto,
  })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiForbiddenResponse({ description: "Usuário autenticado não possui perfil de aluno" })
  async findMinhasCandidaturas(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: MinhasCandidaturasListInputRestDto,
  ): Promise<MinhasCandidaturasListOutputRestDto> {
    const handler = this.container.get<IMinhasCandidaturasListQueryHandler>(
      IMinhasCandidaturasListQueryHandler,
    );
    const result = await handler.execute(accessContext, {
      page: dto.page ? Number(dto.page) : 1,
      limit: dto.limit ? Number(dto.limit) : 10,
      "filter.situacao": dto["filter.situacao"],
    } as any);
    return result as MinhasCandidaturasListOutputRestDto;
  }

  @Delete("/:candidaturaId")
  @ApiOperation(CandidaturaCancelarCommandMetadata.swaggerMetadata)
  @ApiParam({
    name: "candidaturaId",
    description: "ID da candidatura a ser cancelada",
    format: "uuid",
  })
  @ApiOkResponse({ description: "Candidatura cancelada com sucesso" })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiNotFoundResponse({ description: "Candidatura não encontrada" })
  async cancelar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("candidaturaId") candidaturaId: string,
    @Body() dto?: CandidaturaCancelarInputRestDto,
  ): Promise<{ message: string }> {
    const handler = this.container.get<ICandidaturaCancelarCommandHandler>(
      ICandidaturaCancelarCommandHandler,
    );
    await handler.execute(accessContext, {
      candidaturaId,
      motivo: dto?.motivo,
    });
    return { message: "Candidatura cancelada com sucesso" };
  }

  @Post("/:candidaturaId/aceitar")
  @ApiOperation(CandidaturaAceitarCommandMetadata.swaggerMetadata)
  @ApiParam({
    name: "candidaturaId",
    description: "ID da candidatura com oferta ativa",
    format: "uuid",
  })
  @ApiOkResponse({
    description: "Oferta aceita com sucesso. Estágio formalizado em fase inicial.",
    type: EstagioCandidaturaOutputRestDto,
  })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiNotFoundResponse({ description: "Candidatura não encontrada" })
  @ApiGoneResponse({ description: "O prazo de resposta desta oferta expirou (410 Gone)" })
  @ApiConflictResponse({
    description: "A vaga já foi preenchida ou não está mais disponível (409 Conflict)",
  })
  async aceitar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("candidaturaId") candidaturaId: string,
  ): Promise<EstagioCandidaturaOutputRestDto> {
    const handler = this.container.get<ICandidaturaAceitarCommandHandler>(
      ICandidaturaAceitarCommandHandler,
    );
    const result = await handler.execute(accessContext, { candidaturaId });
    return result as EstagioCandidaturaOutputRestDto;
  }
}
