import { Body, Controller, Param, Post } from "@nestjs/common";
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
  CandidaturaConvocarCommandMetadata,
  ICandidaturaConvocarCommandHandler,
} from "../domain/commands/candidatura-convocar.command.handler.interface";
import {
  CandidaturaCreateCommandMetadata,
  ICandidaturaCreateCommandHandler,
} from "../domain/commands/candidatura-create.command.handler.interface";
import {
  CandidaturaConvocarInputRestDto,
  EstagioCandidaturaOutputRestDto,
} from "./estagio-candidatura.rest.dto";

@ApiTags("estagios-candidaturas")
@Controller("/estagios")
export class EstagioCandidaturaRestController {
  constructor(@Dep(IContainer) private readonly container: IContainer) {}

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
    description: "Apenas CIEC ou coordenadores autorizados podem convocar candidatos",
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
}
