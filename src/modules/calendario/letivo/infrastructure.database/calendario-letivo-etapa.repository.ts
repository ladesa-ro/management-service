import { IsNull } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { ICalendarioLetivoEtapaRepository } from "@/modules/calendario/letivo/domain/repositories";
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

  async save(entity: CalendarioLetivoEtapaEntity): Promise<CalendarioLetivoEtapaEntity> {
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoEtapaEntity);
    return repo.save(entity);
  }
}
