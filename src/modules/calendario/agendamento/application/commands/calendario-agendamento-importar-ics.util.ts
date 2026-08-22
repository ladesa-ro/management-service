import { rrulestr } from "rrule";

/**
 * Espelha, na direção contrária, o que `calendario-agendamento-exportar-ics.query.handler.ts`
 * já faz: parseia o texto de um .ics (RFC 5545) em VEVENTs. Sem dependência
 * nova — RFC 5545 é texto simples, e o único ponto que se beneficia de uma
 * lib é a validação de RRULE, para a qual reaproveitamos `rrule` (já usada
 * na expansão de ocorrências).
 */

export interface IIcsVeventParseado {
  /** Posição (1-based) deste VEVENT no arquivo original — usada para reportar rejeições que só acontecem depois do parse (ex: falha ao salvar). */
  index: number;
  uid: string | null;
  summary: string | null;
  description: string | null;
  dataInicio: string;
  horarioInicio: string;
  dataFim: string;
  horarioFim: string;
  diaInteiro: boolean;
  rrule: string | null;
}

export interface IIcsVeventRejeitado {
  index: number;
  uid: string | null;
  motivo: string;
}

export interface IIcsParseResult {
  eventos: IIcsVeventParseado[];
  rejeitados: IIcsVeventRejeitado[];
}

interface IIcsPropriedade {
  params: string;
  value: string;
}

interface IIcsDataHora {
  data: string;
  horario: string;
  diaInteiro: boolean;
}

export function parseIcs(conteudo: string): IIcsParseResult {
  const linhas = unfoldLines(conteudo)
    .map((linha) => linha.trim())
    .filter((linha) => linha.length > 0);

  if (!linhas.some((linha) => linha.toUpperCase() === "BEGIN:VCALENDAR")) {
    throw new Error("Conteúdo não é um .ics válido: BEGIN:VCALENDAR não encontrado.");
  }

  const eventos: IIcsVeventParseado[] = [];
  const rejeitados: IIcsVeventRejeitado[] = [];

  let dentroDeEvento = false;
  let linhasDoEvento: string[] = [];
  let indiceEvento = 0;

  for (const linha of linhas) {
    const linhaUpper = linha.toUpperCase();

    if (linhaUpper === "BEGIN:VEVENT") {
      if (dentroDeEvento) {
        indiceEvento++;
        rejeitados.push({
          index: indiceEvento,
          uid: extrairUidBruto(linhasDoEvento),
          motivo: "VEVENT aninhado: BEGIN:VEVENT encontrado antes do END:VEVENT anterior.",
        });
      }
      dentroDeEvento = true;
      linhasDoEvento = [];
      continue;
    }

    if (linhaUpper === "END:VEVENT") {
      dentroDeEvento = false;
      indiceEvento++;
      try {
        eventos.push({ ...parseVevent(linhasDoEvento), index: indiceEvento });
      } catch (error) {
        rejeitados.push({
          index: indiceEvento,
          uid: extrairUidBruto(linhasDoEvento),
          motivo: error instanceof Error ? error.message : String(error),
        });
      }
      continue;
    }

    if (dentroDeEvento) {
      linhasDoEvento.push(linha);
    }
  }

  if (dentroDeEvento) {
    indiceEvento++;
    rejeitados.push({
      index: indiceEvento,
      uid: extrairUidBruto(linhasDoEvento),
      motivo: "VEVENT sem END:VEVENT correspondente.",
    });
  }

  return { eventos, rejeitados };
}

// Desdobra linhas quebradas em 75 octetos (RFC 5545 §3.1): uma linha de
// continuação começa com um espaço ou tab, que deve ser removido ao juntar
// de volta à linha lógica anterior.
function unfoldLines(conteudo: string): string[] {
  const linhasFisicas = conteudo.split(/\r\n|\r|\n/);
  const linhasLogicas: string[] = [];

  for (const linha of linhasFisicas) {
    if ((linha.startsWith(" ") || linha.startsWith("\t")) && linhasLogicas.length > 0) {
      linhasLogicas[linhasLogicas.length - 1] += linha.slice(1);
    } else {
      linhasLogicas.push(linha);
    }
  }

  return linhasLogicas;
}

function parsePropertyLine(linha: string): { name: string; prop: IIcsPropriedade } | null {
  const idx = linha.indexOf(":");
  if (idx === -1) return null;

  const rawName = linha.slice(0, idx);
  const value = linha.slice(idx + 1);
  const [name, ...paramParts] = rawName.split(";");

  return { name: name.toUpperCase(), prop: { params: paramParts.join(";"), value } };
}

function extrairUidBruto(linhasDoEvento: string[]): string | null {
  for (const linha of linhasDoEvento) {
    const parsed = parsePropertyLine(linha);
    if (parsed?.name === "UID") {
      return unescapeTexto(parsed.prop.value);
    }
  }
  return null;
}

function parseVevent(linhasDoEvento: string[]): Omit<IIcsVeventParseado, "index"> {
  const props = new Map<string, IIcsPropriedade>();
  for (const linha of linhasDoEvento) {
    const parsed = parsePropertyLine(linha);
    if (parsed) props.set(parsed.name, parsed.prop);
  }

  const dtstartProp = props.get("DTSTART");
  if (!dtstartProp) {
    throw new Error("DTSTART ausente.");
  }

  const dtstart = parseIcsDate(dtstartProp.value, dtstartProp.params);
  if (!dtstart) {
    throw new Error(`DTSTART com formato inválido: "${dtstartProp.value}".`);
  }

  const diaInteiro = dtstart.diaInteiro;
  const horarioInicio = diaInteiro ? "00:00:00" : dtstart.horario;

  let dataFim = dtstart.data;
  let horarioFim = diaInteiro ? "23:59:59" : dtstart.horario;

  const dtendProp = props.get("DTEND");
  if (dtendProp) {
    const dtend = parseIcsDate(dtendProp.value, dtendProp.params);
    if (!dtend) {
      throw new Error(`DTEND com formato inválido: "${dtendProp.value}".`);
    }
    dataFim = dtend.data;
    if (!diaInteiro) horarioFim = dtend.horario;
  }

  let rrule: string | null = null;
  const rruleProp = props.get("RRULE");
  if (rruleProp) {
    try {
      rrulestr(rruleProp.value, { dtstart: new Date(`${dtstart.data}T${dtstart.horario}Z`) });
    } catch {
      throw new Error(`RRULE inválida: "${rruleProp.value}".`);
    }
    rrule = rruleProp.value;
  }

  const uidProp = props.get("UID");
  const summaryProp = props.get("SUMMARY");
  const descriptionProp = props.get("DESCRIPTION");

  return {
    uid: uidProp ? unescapeTexto(uidProp.value) : null,
    summary: summaryProp ? unescapeTexto(summaryProp.value) : null,
    description: descriptionProp ? unescapeTexto(descriptionProp.value) : null,
    dataInicio: dtstart.data,
    horarioInicio,
    dataFim,
    horarioFim,
    diaInteiro,
    rrule,
  };
}

// Aceita AAAAMMDD (VALUE=DATE, dia inteiro) ou AAAAMMDDTHHMMSS[Z]. O "Z" (UTC)
// é apenas descartado — o resto do domínio já trata datas/horários como
// string local, sem conversão de fuso (mesma convenção usada na exportação).
function parseIcsDate(value: string, params: string): IIcsDataHora | null {
  const match = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})Z?)?$/);
  if (!match) return null;

  const [, ano, mes, dia, hora, minuto, segundo] = match;
  const data = `${ano}-${mes}-${dia}`;

  const ehDataApenas = hora === undefined || /VALUE=DATE(?!-TIME)/i.test(params);
  if (ehDataApenas) {
    return { data, horario: "00:00:00", diaInteiro: true };
  }

  return { data, horario: `${hora}:${minuto}:${segundo}`, diaInteiro: false };
}

// Inverso de `escaparTexto` em calendario-agendamento-exportar-ics.query.handler.ts:
// varredura em uma passada para não reprocessar sequências já desescapadas.
function unescapeTexto(valor: string): string {
  let resultado = "";

  for (let i = 0; i < valor.length; i++) {
    const char = valor[i];

    if (char === "\\" && i + 1 < valor.length) {
      const proximo = valor[i + 1];
      if (proximo === "n" || proximo === "N") {
        resultado += "\n";
        i++;
      } else if (proximo === "\\" || proximo === "," || proximo === ";") {
        resultado += proximo;
        i++;
      } else {
        resultado += char;
      }
    } else {
      resultado += char;
    }
  }

  return resultado;
}
