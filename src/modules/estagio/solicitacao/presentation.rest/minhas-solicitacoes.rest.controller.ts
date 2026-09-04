import { Controller, Delete, Get, Param } from "@nestjs/common";
import {
  ApiConflictResponse,
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
import { IEstagioSolicitacaoCancelarCommandHandler } from "../domain/commands";
import { IMinhasSolicitacoesListQueryHandler } from "../domain/queries";
import { EstagioSolicitacaoOutputRestDto } from "./estagio-solicitacao.rest.dto";

@ApiTags("estagios-minhas-solicitacoes")
@Controller("/minhas-solicitacoes")
export class MinhasSolicitacoesRestController {
  constructor(@Dep(IContainer) private readonly container: IContainer) {}

  @Get()
  @ApiOperation({
    summary: "Listar minhas solicitações de estágio",
    description:
      "Retorna o histórico e status de todas as solicitações de estágio (internas e externas) submetidas pelo estudante autenticado.",
  })
  @ApiOkResponse({
    description: "Lista de solicitações do estudante",
    type: [EstagioSolicitacaoOutputRestDto],
  })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiForbiddenResponse({ description: "Usuário não possui perfil de aluno/estagiário" })
  async list(
    @AccessContextHttp() accessContext: IAccessContext,
  ): Promise<EstagioSolicitacaoOutputRestDto[]> {
    const handler = this.container.get<IMinhasSolicitacoesListQueryHandler>(
      IMinhasSolicitacoesListQueryHandler,
    );
    const results = await handler.execute(accessContext);
    return results as unknown as EstagioSolicitacaoOutputRestDto[];
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Cancelar solicitação de estágio",
    description:
      "Permite ao estudante cancelar uma solicitação que ainda esteja com status PENDENTE ou EM_ANALISE.",
  })
  @ApiParam({ name: "id", description: "ID da solicitação a ser cancelada", format: "uuid" })
  @ApiOkResponse({
    description: "Solicitação cancelada com sucesso",
    type: EstagioSolicitacaoOutputRestDto,
  })
  @ApiUnauthorizedResponse({ description: "Usuário não autenticado" })
  @ApiForbiddenResponse({ description: "A solicitação pertence a outro estudante" })
  @ApiNotFoundResponse({ description: "Solicitação não encontrada" })
  @ApiConflictResponse({
    description: "Solicitações já analisadas (deferidas/indeferidas) não podem ser canceladas",
  })
  async cancelar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") id: string,
  ): Promise<EstagioSolicitacaoOutputRestDto> {
    const handler = this.container.get<IEstagioSolicitacaoCancelarCommandHandler>(
      IEstagioSolicitacaoCancelarCommandHandler,
    );
    const result = await handler.execute(accessContext, { id });
    return result as unknown as EstagioSolicitacaoOutputRestDto;
  }
}
