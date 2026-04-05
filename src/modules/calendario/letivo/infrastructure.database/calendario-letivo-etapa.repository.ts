import { In, IsNull } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { ICalendarioLetivoEtapa } from "@/modules/calendario/letivo/domain/calendario-letivo-etapa.types";
import type {
  ICalendarioLetivoEtapaRepository,
  IOfertaFormacaoPeriodoEtapaSnapshot,
} from "@/modules/calendario/letivo/domain/repositories";
import { OfertaFormacaoPeriodoEtapaEntity } from "@/modules/ensino/oferta-formacao/infrastructure.database/typeorm/oferta-formacao-periodo-etapa.typeorm.entity";
import { getNowISO } from "@/utils/date";
import { CalendarioLetivoEtapaEntity } from "./typeorm/calendario-letivo-etapa.typeorm.entity";

@Impl()
export class CalendarioLetivoEtapaTypeOrmRepositoryAdapter
  implements ICalendarioLetivoEtapaRepository
{
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findByCalendarioLetivoId(
    calendarioLetivoId: string,
  ): Promise<CalendarioLetivoEtapaEntity[]> {
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoEtapaEntity);
    return repo.find({
      where: {
        calendarioLetivo: { id: calendarioLetivoId },
        dateDeleted: IsNull(),
      },
      relations: ["ofertaFormacaoPeriodoEtapa"],
      order: { dataInicio: "ASC" },
    });
  }

  async findByCalendarioLetivoIds(
    calendarioLetivoIds: string[],
  ): Promise<CalendarioLetivoEtapaEntity[]> {
    if (calendarioLetivoIds.length === 0) return [];

    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoEtapaEntity);
    return repo.find({
      where: {
        calendarioLetivo: { id: In(calendarioLetivoIds) },
        dateDeleted: IsNull(),
      },
      relations: ["ofertaFormacaoPeriodoEtapa", "calendarioLetivo"],
      order: { dataInicio: "ASC" },
    });
  }

  async findOfertaFormacaoPeriodoEtapaSnapshot(
    id: string,
  ): Promise<IOfertaFormacaoPeriodoEtapaSnapshot | null> {
    const repo = this.appTypeormConnection.getRepository(OfertaFormacaoPeriodoEtapaEntity);

    const etapa = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: ["ofertaFormacaoPeriodo"],
    });

    if (!etapa) return null;

    return {
      nome: etapa.nome,
      cor: etapa.cor,
      ordem: etapa.ordem,
      numeroPeriodo: etapa.ofertaFormacaoPeriodo.numeroPeriodo,
    };
  }

  async softDeleteByCalendarioLetivoId(calendarioLetivoId: string): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoEtapaEntity);
    await repo
      .createQueryBuilder()
      .update(CalendarioLetivoEtapaEntity)
      .set({ dateDeleted: getNowISO() })
      .where("id_calendario_letivo_fk = :calendarioLetivoId AND date_deleted IS NULL", {
        calendarioLetivoId,
      })
      .execute();
  }

  async save(entity: Partial<ICalendarioLetivoEtapa>): Promise<ICalendarioLetivoEtapa> {
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoEtapaEntity);
    return repo.save(entity as CalendarioLetivoEtapaEntity);
  }
}
