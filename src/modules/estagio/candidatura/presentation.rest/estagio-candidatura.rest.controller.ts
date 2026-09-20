import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
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
  CandidaturaCancelarCommandMetadata,
  ICandidaturaCancelarCommandHandler,
} from "../domain/commands/candidatura-cancelar.command.handler.interface";
import {
  CandidaturaConvocarCommandMetadata,
  ICandidaturaConvocarCommandHandler,
} from "../domain/commands/candidatura-convocar.command.handler.interface";
import {
  CandidaturaCreateCommandMetadata,
  ICandidaturaCreateCommandHandler,
} from "../domain/commands/candidatura-create.command.handler.interface";
import {
  FilaEsperaListQueryMetadata,
  IFilaEsperaListQueryHandler,
} from "../domain/queries/fila-espera-list.query.handler.interface";
import {
  CandidaturaCancelarInputRestDto,
  CandidaturaConvocarInputRestDto,
  EstagioCandidaturaOutputRestDto,
  FilaEsperaListInputRestDto,
  FilaEsperaListOutputRestDto,
} from "./estagio-candidatura.rest.dto";

@ApiTags("estagios-candidaturas")
@Controller("/estagios")
export class EstagioCandidaturaRestController {
  constructor(@Dep(IContainer) private readonly container: IContainer) {}

  @Get("/:estagioId/candidaturas")
  @ApiOperation(FilaEsperaListQueryMetadata.swaggerMetadata)
  @ApiParam({ name: "estagioId", description: "ID da vaga de estágio", format: "uuid" })
  @ApiOkResponse({
    description: "Lista de espera da vaga com ordem na fila e dados acadêmicos",
    type: FilaEsperaListOutputRestDto,
  })
  @ApiUnauthorizedResponse({ description: "Token de autenticação ausente ou inválido" })
  @ApiForbiddenResponse({
    description: "Apenas servidores da CIEC ou coordenadores autorizados podem visualizar a fila",
  })
  @ApiNotFoundResponse({ description: "Vaga de estágio não encontrada" })
  async findFila(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("estagioId") estagioId: string,
    @Query() dto: FilaEsperaListInputRestDto,
  ): Promise<FilaEsperaListOutputRestDto> {
    const handler = this.container.get<IFilaEsperaListQueryHandler>(IFilaEsperaListQueryHandler);
    const result = await handler.execute(accessContext, {
      estagioId,
      page: dto.page ? Number(dto.page) : 1,
      limit: dto.limit ? Number(dto.limit) : 20,
      situacao: dto.situacao ?? dto["filter.situacao"],
      "filter.situacao": dto["filter.situacao"] ?? dto.situacao,
    } as any);
    return result as FilaEsperaListOutputRestDto;
  }

  @Post("/:estagioId/candidaturas")
  @ApiOperation(CandidaturaCreateCommandMetadata.swaggerMetadata)
  @ApiParam({ name: "estagioId", description: "ID da vaga de estágio", format: "uuid" })
  @ApiCreatedResponse({
    description: "Candidatura registrada com sucesso na lista de espera",
    type: EstagioCandidaturaOutputRestDto,
  })
  @ApiUnauthorizedResponse({ description: "Token de autenticação ausente ou inválido" })
  @ApiForbiddenResponse({
    description: "Usuário autenticado não possui perfil de aluno/estagiário",
  })
  @ApiNotFoundResponse({ description: "Vaga de estágio não encontrada" })
  @ApiConflictResponse({
    description: "Aluno já possui candidatura ativa nesta vaga ou já possui estágio em andamento",
  })
  async candidatar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("estagioId") estagioId: string,
  ): Promise<EstagioCandidaturaOutputRestDto> {
    const handler = this.container.get<ICandidaturaCreateCommandHandler>(
      ICandidaturaCreateCommandHandler,
    );
    const result = await handler.execute(accessContext, { estagioId });
    return result as EstagioCandidaturaOutputRestDto;
  }

  @Post("/candidaturas/:candidaturaId/convocar")
  @ApiOperation(CandidaturaConvocarCommandMetadata.swaggerMetadata)
  @ApiParam({
    name: "candidaturaId",
    description: "ID da candidatura a ser convocada",
    format: "uuid",
  })
  @ApiOkResponse({
    description: "Candidato convocado com sucesso (situação alterada para OFFERED)",
    type: EstagioCandidaturaOutputRestDto,
  })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiForbiddenResponse({
    description: "Apenas servidores da CIEC ou coordenadores autorizados podem convocar candidatos",
  })
  @ApiNotFoundResponse({ description: "Candidatura não encontrada" })
  @ApiConflictResponse({ description: "Já existe uma oferta ativa para esta vaga" })
  async convocar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("candidaturaId") candidaturaId: string,
    @Body() dto: CandidaturaConvocarInputRestDto,
  ): Promise<EstagioCandidaturaOutputRestDto> {
    const handler = this.container.get<ICandidaturaConvocarCommandHandler>(
      ICandidaturaConvocarCommandHandler,
    );
    const result = await handler.execute(accessContext, {
      candidaturaId,
      diasValidade: dto.diasValidade,
    });
    return result as EstagioCandidaturaOutputRestDto;
  }

  @Delete("/candidaturas/:candidaturaId")
  @ApiOperation(CandidaturaCancelarCommandMetadata.swaggerMetadata)
  @ApiParam({
    name: "candidaturaId",
    description: "ID da candidatura a ser cancelada ou removida da fila",
    format: "uuid",
  })
  @ApiOkResponse({ description: "Candidatura cancelada com sucesso" })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiForbiddenResponse({
    description: "Usuário não possui permissão para cancelar esta candidatura",
  })
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
}
