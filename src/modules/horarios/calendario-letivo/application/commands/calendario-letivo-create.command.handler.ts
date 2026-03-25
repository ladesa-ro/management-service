import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo";
import type { CalendarioLetivoCreateCommand } from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-create.command";
import { ICalendarioLetivoCreateCommandHandler } from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-create.command.handler.interface";
import { ICalendarioLetivoPermissionChecker } from "../../domain/authorization";
import type { CalendarioLetivoFindOneQueryResult } from "../../domain/queries";
import { ICalendarioLetivoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CalendarioLetivoCreateCommandHandlerImpl
  implements ICalendarioLetivoCreateCommandHandler
{
  constructor(
    @DeclareDependency(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
    @DeclareDependency(ICalendarioLetivoPermissionChecker)
    private readonly permissionChecker: ICalendarioLetivoPermissionChecker,
    @DeclareDependency(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @DeclareDependency(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoCreateCommand,
  ): Promise<CalendarioLetivoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const campus = await this.campusFindOneHandler.execute(accessContext, { id: dto.campus.id });
    ensureExists(campus, Campus.entityName, dto.campus.id);

    let ofertaFormacaoRef: { id: string } | undefined;
    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute(accessContext, {
        id: dto.ofertaFormacao.id,
      });
      ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
      ofertaFormacaoRef = { id: ofertaFormacao.id };
    }

    const domain = CalendarioLetivo.create({
      nome: dto.nome,
      ano: dto.ano,
      campus: { id: campus.id },
      ofertaFormacao: ofertaFormacaoRef,
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, CalendarioLetivo.entityName, domain.id);

    return result;
  }
}
