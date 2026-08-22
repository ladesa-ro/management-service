import { RRule } from "rrule";

export interface IResultadoDivisaoRegraRecorrencia {
  /** Regra da série original, truncada para terminar no dia anterior a `dataCorte`. */
  regraAntiga: string;
  /** Regra da nova série, começando em `dataCorte`, preservando o alcance original. */
  regraNova: string;
}

/**
 * Divide uma regra RRULE em duas na data de corte (RFC 5545 não tem um
 * operador nativo para isso — é a lógica por trás do "esta e as seguintes"
 * que Google Calendar e Outlook oferecem ao editar um evento recorrente).
 *
 * A regra antiga ganha `UNTIL` no dia anterior ao corte. A nova regra herda
 * o `UNTIL` original quando presente (o fim absoluto não muda), ou recalcula
 * `COUNT` como o número de ocorrências restantes a partir do corte quando a
 * regra original é limitada por contagem. Nenhuma das duas strings carrega
 * `DTSTART`: a data de início de cada série vive no campo `dataInicio`, não
 * na regra, seguindo a convenção já usada por `repeticao` no domínio.
 */
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
