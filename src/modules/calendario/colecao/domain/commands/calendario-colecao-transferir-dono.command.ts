import { CalendarioColecaoFields } from "../calendario-colecao.fields";

export const CalendarioColecaoTransferirDonoCommandFields = {
  novoDonoId: CalendarioColecaoFields.novoDonoId,
};

export class CalendarioColecaoTransferirDonoCommand {
  novoDonoId!: string;
}
