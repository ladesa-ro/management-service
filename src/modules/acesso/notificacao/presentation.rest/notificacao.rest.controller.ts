import { Controller, Get, Param, Patch } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { NotificacaoEntity } from "../infrastructure.database/typeorm/notificacao.typeorm.entity";

@ApiTags("notificacoes")
@Controller("/notificacoes")
export class NotificacaoRestController {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista notificacoes do usuario autenticado",
    operationId: "notificacaoFindAll",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async findAll(@AccessContextHttp() _accessContext: AccessContext) {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    const entities = await repo.find({
      order: { dateCreated: "DESC" },
    });
    return {
      data: entities.map((e) => ({
        id: e.id,
        titulo: e.titulo,
        conteudo: e.conteudo,
        lida: e.lida,
        idUsuarioFk: e.idUsuarioFk,
        dateCreated: e.dateCreated,
      })),
    };
  }

  @Get("/contagem-nao-lidas")
  @ApiOperation({
    summary: "Conta notificacoes nao lidas",
    operationId: "notificacaoContagemNaoLidas",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async contagemNaoLidas(@AccessContextHttp() _accessContext: AccessContext) {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    const count = await repo.count({ where: { lida: false } });
    return { count };
  }

  @Patch("/:id/lida")
  @ApiOperation({ summary: "Marca notificacao como lida", operationId: "notificacaoMarcarLida" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async marcarLida(@AccessContextHttp() _accessContext: AccessContext, @Param("id") id: string) {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    const entity = await repo.findOneBy({ id });
    ensureExists(entity, "Notificacao", id);
    entity!.lida = true;
    await repo.save(entity!);
    return { success: true };
  }
}
