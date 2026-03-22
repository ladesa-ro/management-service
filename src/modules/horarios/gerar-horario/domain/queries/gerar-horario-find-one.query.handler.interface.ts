import type { AccessContext } from "@/server/access-context";
import type { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

export interface IGerarHorarioFindOneQuery {
  id: string;
}

export const IGerarHorarioFindOneQueryHandler = Symbol("IGerarHorarioFindOneQueryHandler");

export interface IGerarHorarioFindOneQueryHandler {
  execute(
    accessContext: AccessContext | null,
    query: IGerarHorarioFindOneQuery,
  ): Promise<GerarHorarioEntity | null>;
}
