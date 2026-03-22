import { Controller, Get, Param, Patch } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/server/access-context";
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
    @DeclareDependency(INotificacaoRepository)
    private readonly notificacaoRepository: INotificacaoRepositoryType,
  ) {}

  @Get("/")
  @ApiOperation(NotificacaoFindAllQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async findAll(@AccessContextHttp() _accessContext: AccessContext) {
    const entities = await this.notificacaoRepository.find({
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
  async contagemNaoLidas(@AccessContextHttp() _accessContext: AccessContext) {
    const count = await this.notificacaoRepository.count({ where: { lida: false } });
    return { count };
  }

  @Patch("/:id/lida")
  @ApiOperation(NotificacaoMarcarLidaCommandMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async marcarLida(@AccessContextHttp() _accessContext: AccessContext, @Param("id") id: string) {
    const entity = await this.notificacaoRepository.findOneBy({ id });
    ensureExists(entity, "Notificacao", id);
    entity!.lida = true;
    await this.notificacaoRepository.save(entity!);
    return { success: true };
  }
}
