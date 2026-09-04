import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
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
  IEstagioSolicitacaoDeferirCommandHandler,
  IEstagioSolicitacaoExternoCreateCommandHandler,
  IEstagioSolicitacaoIndeferirCommandHandler,
  IEstagioSolicitacaoInternoCreateCommandHandler,
} from "../domain/commands";
import {
  type EstagioSolicitacaoListQuery,
  IEstagioSolicitacaoListQueryHandler,
} from "../domain/queries";
import {
  EstagioSolicitacaoDeferirRestDto,
  EstagioSolicitacaoExternoCreateRestDto,
  EstagioSolicitacaoIndeferirRestDto,
  EstagioSolicitacaoInternoCreateRestDto,
  EstagioSolicitacaoListInputRestDto,
  EstagioSolicitacaoOutputRestDto,
} from "./estagio-solicitacao.rest.dto";

@ApiTags("estagios-solicitacoes")
@Controller("/solicitacoes-estagio")
export class EstagioSolicitacaoRestController {
  constructor(@Dep(IContainer) private readonly container: IContainer) {}

  @Post("/interno")
  @ApiOperation({
    summary: "Solicitar estágio interno",
    description:
      "Permite ao estudante solicitar a realização de um estágio interno dentro de um setor ou laboratório do campus com um orientador docente.",
  })
  @ApiCreatedResponse({
    description: "Solicitação interna registrada com sucesso",
    type: EstagioSolicitacaoOutputRestDto,
  })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiForbiddenResponse({ description: "Usuário não possui perfil de aluno/estagiário" })
  @ApiConflictResponse({ description: "Limite de solicitações em análise atingido" })
  async createInterno(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: EstagioSolicitacaoInternoCreateRestDto,
  ): Promise<EstagioSolicitacaoOutputRestDto> {
    const handler = this.container.get<IEstagioSolicitacaoInternoCreateCommandHandler>(
      IEstagioSolicitacaoInternoCreateCommandHandler,
    );
    const result = await handler.execute(accessContext, dto);
    return result as unknown as EstagioSolicitacaoOutputRestDto;
  }

  @Post("/externo")
  @ApiOperation({
    summary: "Solicitar estágio externo",
    description:
      "Permite ao estudante submeter uma proposta de estágio externo em empresa parceira. Não cria empresa nem estágio antes da análise da CIEC.",
  })
  @ApiCreatedResponse({
    description: "Solicitação externa registrada com sucesso para análise do CIEC",
    type: EstagioSolicitacaoOutputRestDto,
  })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiForbiddenResponse({ description: "Usuário não possui perfil de aluno/estagiário" })
  @ApiConflictResponse({ description: "Limite de solicitações em análise atingido" })
  async createExterno(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: EstagioSolicitacaoExternoCreateRestDto,
  ): Promise<EstagioSolicitacaoOutputRestDto> {
    const handler = this.container.get<IEstagioSolicitacaoExternoCreateCommandHandler>(
      IEstagioSolicitacaoExternoCreateCommandHandler,
    );
    const result = await handler.execute(accessContext, dto);
    return result as unknown as EstagioSolicitacaoOutputRestDto;
  }

  @Get()
  @ApiOperation({
    summary: "Listar solicitações de estágio (CIEC)",
    description:
      "Permite à equipe do CIEC ou coordenadores listarem todas as solicitações de estágio (internas e externas) com filtros.",
  })
  @ApiOkResponse({
    description: "Lista de solicitações retornada com sucesso",
    type: [EstagioSolicitacaoOutputRestDto],
  })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiForbiddenResponse({ description: "Acesso restrito ao CIEC e administradores" })
  async list(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() query: EstagioSolicitacaoListInputRestDto,
  ): Promise<EstagioSolicitacaoOutputRestDto[]> {
    const handler = this.container.get<IEstagioSolicitacaoListQueryHandler>(
      IEstagioSolicitacaoListQueryHandler,
    );
    const filter: EstagioSolicitacaoListQuery = {
      situacao: query["filter.situacao"] as any,
      tipo: query["filter.tipo"] as any,
      campusId: query["filter.campusId"],
    };
    const results = await handler.execute(accessContext, filter);
    return results as unknown as EstagioSolicitacaoOutputRestDto[];
  }

  @Post("/:id/deferir")
  @ApiOperation({
    summary: "Deferir solicitação de estágio",
    description:
      "Aprova a solicitação de estágio, vincula ou cadastra a empresa concedente e gera automaticamente o estágio de forma transacional.",
  })
  @ApiParam({ name: "id", description: "ID da solicitação de estágio", format: "uuid" })
  @ApiOkResponse({
    description: "Solicitação deferida e estágio gerado com sucesso",
    type: EstagioSolicitacaoOutputRestDto,
  })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiForbiddenResponse({ description: "Acesso restrito ao CIEC e administradores" })
  @ApiNotFoundResponse({ description: "Solicitação não encontrada" })
  @ApiConflictResponse({ description: "Solicitação já se encontra finalizada" })
  async deferir(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") id: string,
    @Body() dto: EstagioSolicitacaoDeferirRestDto,
  ): Promise<EstagioSolicitacaoOutputRestDto> {
    const handler = this.container.get<IEstagioSolicitacaoDeferirCommandHandler>(
      IEstagioSolicitacaoDeferirCommandHandler,
    );
    const result = await handler.execute(accessContext, { ...dto, id });
    return result as unknown as EstagioSolicitacaoOutputRestDto;
  }

  @Post("/:id/indeferir")
  @ApiOperation({
    summary: "Indeferir solicitação de estágio",
    description:
      "Rejeita a solicitação de estágio. Requer parecer explicativo obrigatório descrevendo o motivo do indeferimento.",
  })
  @ApiParam({ name: "id", description: "ID da solicitação de estágio", format: "uuid" })
  @ApiOkResponse({
    description: "Solicitação indeferida com sucesso",
    type: EstagioSolicitacaoOutputRestDto,
  })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiForbiddenResponse({ description: "Acesso restrito ao CIEC e administradores" })
  @ApiNotFoundResponse({ description: "Solicitação não encontrada" })
  @ApiConflictResponse({ description: "Solicitação já se encontra finalizada" })
  async indeferir(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") id: string,
    @Body() dto: EstagioSolicitacaoIndeferirRestDto,
  ): Promise<EstagioSolicitacaoOutputRestDto> {
    const handler = this.container.get<IEstagioSolicitacaoIndeferirCommandHandler>(
      IEstagioSolicitacaoIndeferirCommandHandler,
    );
    const result = await handler.execute(accessContext, { ...dto, id });
    return result as unknown as EstagioSolicitacaoOutputRestDto;
  }
}
