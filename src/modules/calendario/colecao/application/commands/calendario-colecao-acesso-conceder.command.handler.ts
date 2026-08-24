import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { INotificacaoRepository } from "@/modules/acesso/notificacao/domain/repositories";
import { ICalendarioColecaoAcessoPermissionChecker } from "../../domain/authorization";
import { CalendarioColecao } from "../../domain/calendario-colecao";
import { CalendarioColecaoAcesso } from "../../domain/calendario-colecao-acesso";
import { CalendarioColecaoAcessoEscopo } from "../../domain/calendario-colecao-acesso.types";
import type { CalendarioColecaoAcessoConcederCommand } from "../../domain/commands/calendario-colecao-acesso-conceder.command";
import { ICalendarioColecaoAcessoConcederCommandHandler } from "../../domain/commands/calendario-colecao-acesso-conceder.command.handler.interface";
import type { CalendarioColecaoAcessoFindOneQueryResult } from "../../domain/queries/calendario-colecao-acesso-find-one.query.result";
import {
  ICalendarioColecaoAcessoRepository,
  ICalendarioColecaoRepository,
} from "../../domain/repositories";

@Impl()
export class CalendarioColecaoAcessoConcederCommandHandlerImpl
  implements ICalendarioColecaoAcessoConcederCommandHandler
{
  constructor(
    @Dep(ICalendarioColecaoAcessoRepository)
    private readonly repository: ICalendarioColecaoAcessoRepository,
    @Dep(ICalendarioColecaoRepository)
    private readonly colecaoRepository: ICalendarioColecaoRepository,
    @Dep(ICalendarioColecaoAcessoPermissionChecker)
    private readonly permissionChecker: ICalendarioColecaoAcessoPermissionChecker,
    @Dep(INotificacaoRepository)
    private readonly notificacaoRepository: INotificacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoAcessoConcederCommand,
  ): Promise<CalendarioColecaoAcessoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const colecao = await this.colecaoRepository.loadById(accessContext, dto.colecaoId);
    ensureExists(colecao, CalendarioColecao.entityName, dto.colecaoId);
    ensureActiveEntity(colecao, CalendarioColecao.entityName, dto.colecaoId);

    const domain = CalendarioColecaoAcesso.create({
      colecao: { id: dto.colecaoId },
      escopo: dto.escopo,
      usuario: dto.usuario,
      campus: dto.campus,
      papel: dto.papel,
    });

    await this.repository.save(domain);

    if (domain.escopo === CalendarioColecaoAcessoEscopo.USUARIO && domain.usuario) {
      await this.notificacaoRepository.save({
        titulo: "Acesso concedido",
        conteudo: `Você recebeu o papel ${domain.papel} na coleção "${colecao.nome}".`,
        lida: false,
        usuario: { id: domain.usuario.id },
      });
    }

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, CalendarioColecaoAcesso.entityName, domain.id);

    return result;
  }
}
