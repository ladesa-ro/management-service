import { RRule } from "rrule";

export interface IResultadoDivisaoRegraRecorrencia {
  regraAntiga: string;
  regraNova: string;
}

export function dividirRegraRecorrencia(
  repeticao: string,
  dtstartOriginal: Date,
  dataCorte: Date,
): IResultadoDivisaoRegraRecorrencia {
  const opcoesBase = RRule.parseString(repeticao);

  const diaAnteriorAoCorte = new Date(dataCorte);
  diaAnteriorAoCorte.setUTCDate(diaAnteriorAoCorte.getUTCDate() - 1);

  const regraAntiga = RRule.optionsToString({
    ...opcoesBase,
    until: diaAnteriorAoCorte,
    count: undefined,
  });

  let countRestante: number | undefined;
  if (opcoesBase.count != null) {
    const regraCompleta = new RRule({ ...opcoesBase, dtstart: dtstartOriginal });
    countRestante = regraCompleta
      .all()
      .filter((ocorrencia) => ocorrencia.getTime() >= dataCorte.getTime()).length;
  }

  const regraNova = RRule.optionsToString({
    ...opcoesBase,
    count: countRestante,
  });

  return { regraAntiga, regraNova };
}
