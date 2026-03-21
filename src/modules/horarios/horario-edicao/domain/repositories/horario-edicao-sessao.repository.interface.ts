import type { HorarioEdicaoSessaoEntity } from "@/modules/horarios/horario-edicao/infrastructure.database/typeorm/horario-edicao-sessao.typeorm.entity";

export const IHorarioEdicaoSessaoRepository = Symbol("IHorarioEdicaoSessaoRepository");

export interface IHorarioEdicaoSessaoRepository {
  findById(id: string): Promise<HorarioEdicaoSessaoEntity | null>;
  save(entity: HorarioEdicaoSessaoEntity): Promise<HorarioEdicaoSessaoEntity>;
}
