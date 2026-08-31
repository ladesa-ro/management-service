import { Controller, Get, Param, Patch } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  NotificacaoContagemNaoLidasQueryMetadata,
  NotificacaoFindAllQueryMetadata,
  NotificacaoMarcarLidaCommandMetadata,
} from "../domain/notificacao.operations";
import {
  INotificacaoRepository,
  type INotificacaoRepository as INotificacaoRepositoryType,
} from "../domain/repositories/notificacao.repository.interface";

@ApiTags("notificacoes")
@Controller("/notificacoes")
export class NotificacaoRestController {
  constructor(
    @Dep(INotificacaoRepository)
    private readonly notificacaoRepository: INotificacaoRepositoryType,
  ) {}

  @Get("/")
  @ApiOperation(NotificacaoFindAllQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async findAll(@AccessContextHttp() accessContext: IAccessContext) {
    const usuarioId = accessContext.requestActor?.id;
    if (!usuarioId) {
      return { data: [] };
    }
    const entities = await this.notificacaoRepository.find({
      where: { usuario: { id: usuarioId } },
      order: { dateCreated: "DESC" },
    });
    return {
      data: entities.map((e) => ({
        id: e.id,
        titulo: e.titulo,
        conteudo: e.conteudo,
        lida: e.lida,
        idUsuarioFk: e.usuario?.id,
        dateCreated: e.dateCreated,
      })),
    };
  }

  @Get("/contagem-nao-lidas")
  @ApiOperation(NotificacaoContagemNaoLidasQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async contagemNaoLidas(@AccessContextHttp() accessContext: IAccessContext) {
    const usuarioId = accessContext.requestActor?.id;
    if (!usuarioId) {
      return { count: 0 };
    }
    const count = await this.notificacaoRepository.count({
      where: { lida: false, usuario: { id: usuarioId } },
    });
    return { count };
  }

  @Patch("/:id/lida")
  @ApiOperation(NotificacaoMarcarLidaCommandMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async marcarLida(@AccessContextHttp() accessContext: IAccessContext, @Param("id") id: string) {
    const usuarioId = accessContext.requestActor?.id;
    if (!usuarioId) {
      ensureExists(null, "Notificacao", id);
    }
    const entity = await this.notificacaoRepository.findOneBy({
      id,
      usuario: { id: usuarioId },
    });
    ensureExists(entity, "Notificacao", id);
    entity.lida = true;
    await this.notificacaoRepository.save(entity);
    return { success: true };
  }
}
