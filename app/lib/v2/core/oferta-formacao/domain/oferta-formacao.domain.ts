import { Modalidade } from "../../modalidade/domain/modalidade.domain";

export class OfertaFormacao {
  id!: string;
  nome!: string;
  slug!: string;
  modalidade!: Modalidade;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
