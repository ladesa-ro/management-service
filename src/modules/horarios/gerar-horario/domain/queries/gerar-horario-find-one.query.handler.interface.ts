import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

export interface IGerarHorarioFindOneQuery {
  id: string;
}

export interface IGerarHorarioFindOneQueryHandler {
  execute(accessContext: AccessContext | null, query: IGerarHorarioFindOneQuery): Promise<GerarHorarioEntity | null>;
}

export const IGerarHorarioFindOneQueryHandler = Symbol("IGerarHorarioFindOneQueryHandler");
