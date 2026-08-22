import { UnauthorizedException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioColecaoPermissionChecker } from "../../domain/authorization";
import { CalendarioColecao } from "../../domain/calendario-colecao";
import type { CalendarioColecaoCreateCommand } from "../../domain/commands/calendario-colecao-create.command";
import { ICalendarioColecaoCreateCommandHandler } from "../../domain/commands/calendario-colecao-create.command.handler.interface";
import type { CalendarioColecaoFindOneQueryResult } from "../../domain/queries/calendario-colecao-find-one.query.result";
import { ICalendarioColecaoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioColecaoCreateCommandHandlerImpl
  implements ICalendarioColecaoCreateCommandHandler
{
  constructor(
    @Dep(ICalendarioColecaoRepository)
    private readonly repository: ICalendarioColecaoRepository,
    @Dep(ICalendarioColecaoPermissionChecker)
    private readonly permissionChecker: ICalendarioColecaoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoCreateCommand,
  ): Promise<CalendarioColecaoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    if (!accessContext?.requestActor?.id) {
      throw new UnauthorizedException("É necessário estar autenticado para criar uma coleção.");
    }

    const domain = CalendarioColecao.create({
      dono: { id: accessContext.requestActor.id },
      campus: dto.campus,
      nome: dto.nome,
      cor: dto.cor,
      visibilidade: dto.visibilidade,
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, CalendarioColecao.entityName, domain.id);

    return result;
  }
}
