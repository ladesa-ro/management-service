import { FindOneQuery, SharedFields } from "@/domain/abstractions";

export const CalendarioIndisponibilidadeAmbienteFindOneQueryFields = {
  id: SharedFields.idUuid,
};

export class CalendarioIndisponibilidadeAmbienteFindOneQuery extends FindOneQuery {}
