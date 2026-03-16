import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

export interface IGerarHorarioCreateCommand {
  dataInicio: string;
  dataTermino?: string;
}

export interface IGerarHorarioCreateCommandHandler {
  execute(accessContext: AccessContext | null, command: IGerarHorarioCreateCommand): Promise<GerarHorarioEntity>;
}

export const IGerarHorarioCreateCommandHandler = Symbol("IGerarHorarioCreateCommandHandler");
