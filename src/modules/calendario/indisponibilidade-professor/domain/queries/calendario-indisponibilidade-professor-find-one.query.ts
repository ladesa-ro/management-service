import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const CalendarioIndisponibilidadeProfessorFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class CalendarioIndisponibilidadeProfessorFindOneQuery extends FindOneQuery {}
