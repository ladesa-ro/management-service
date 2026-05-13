import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";

export interface EstagioImportCsvEntry {
  line: number;
  estagiarioNome: string;
  estagiarioMatricula: string | null;
  estagiarioEmailPessoal: string | null;
  estagiarioEmailAcademico: string | null;
  situacaoMatricula: string | null;
  concedente: string | null;
  concedenteCnpj: string | null;
  concedenteEndereco: string | null;
  concedenteBairro: string | null;
  concedenteCidade: string | null;
  nomeSupervisor: string | null;
  emailSupervisor: string | null;
  telefoneSupervisor: string | null;
  nomeOrientador: string | null;
  matriculaOrientador: string | null;
  emailOrientador: string | null;
  nomeAgenteIntegracao: string | null;
  cnpjAgenteIntegracao: string | null;
  curso: string | null;
  campus: string | null;
  dataInicio: string | null;
  dataPrevistaFim: string | null;
  nomeSeguradora: string | null;
  numeroApoliceSeguro: string | null;
  status: string | null;
  visitasRealizadas: number | null;
  visitasJustificadas: number | null;
  visitasAVencer: number | null;
  visitasNaoRealizadas: number | null;
  resumoPendencias: string | null;
  dataFim: string | null;
  temAditivo: boolean | null;
  tiposAditivo: string | null;
  encerramentoPor: string | null;
  motivacaoDesligamento: string | null;
  motivoRescisao: string | null;
  mediaNotasSupervisor: number | null;
  cargaHorariaFinal: number | null;
  periodoReferencia: number | null;
  periodoMinimoObrigatorio: number | null;
  periodoMinimoNaoObrigatorio: number | null;
  foiOuSeraContratado: boolean | null;
}

export interface EstagioImportCsvSkippedRow {
  line: number;
  reason: string;
}

export interface EstagioImportCsvParseResult {
  totalRows: number;
  entries: EstagioImportCsvEntry[];
  skipped: EstagioImportCsvSkippedRow[];
}

function normalizeHeader(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function parseCsvRows(content: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  const text = content.replace(/^\uFEFF/, "");

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inQuotes) {
      if (char === '"') {
        const nextChar = text[index + 1];

        if (nextChar === '"') {
          currentField += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        currentField += char;
      }

      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ",") {
      currentRow.push(currentField);
      currentField = "";
      continue;
    }

    if (char === "\n") {
      currentRow.push(currentField);
      rows.push(currentRow);
      currentRow = [];
      currentField = "";
      continue;
    }

    if (char === "\r") {
      continue;
    }

    currentField += char;
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

function getCell(row: string[], index: number): string {
  return (row[index] ?? "").trim();
}

function findHeaderIndex(headers: string[], headerName: string): number {
  return headers.indexOf(headerName);
}

function toNullIfEmpty(value: string): string | null {
  if (!value || value === "-") return null;
  return value;
}

function toNumberOrNull(value: string): number | null {
  if (!value || value === "-") return null;

  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

function toBooleanOrNull(value: string): boolean | null {
  const normalized = normalizeText(value);

  if (!normalized || normalized === "-") return null;
  if (["sim", "s", "true", "1", "yes", "y"].includes(normalized)) return true;
  if (["nao", "não", "n", "false", "0"].includes(normalized)) return false;

  return null;
}

function parseDate(value: string): string | null {
  const normalized = value.trim();

  if (!normalized || normalized === "-") return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return normalized;
  }

  const match = normalized.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

function parseEstagiarioField(value: string): { nome: string; matricula: string | null } {
  const trimmed = value.trim();

  const parenStart = trimmed.lastIndexOf("(");
  const parenEnd = trimmed.lastIndexOf(")");

  if (parenStart !== -1 && parenEnd === trimmed.length - 1 && parenEnd > parenStart) {
    const nome = trimmed.slice(0, parenStart).trim();
    const matricula = trimmed.slice(parenStart + 1, parenEnd).trim();
    return {
      nome,
      matricula: matricula && matricula !== "-" ? matricula : null,
    };
  }

  return { nome: trimmed, matricula: null };
}

function isValidEmail(email: string | null): email is string {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function normalizePhoneNumber(value: string): string | null {
  const normalized = value.trim();
  if (!normalized || normalized === "-") return null;
  // Remove common characters used in phone formatting
  return normalized.replace(/[\s\-()]/g, "");
}

function normalizeSupervisorName(value: string): string | null {
  const normalized = value.trim();
  if (!normalized || normalized === "-") return null;
  // Convert to title case
  return normalized
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseStatus(value: string): EstagioStatus | null {
  const normalized = normalizeText(value);

  if (!normalized || normalized === "-") return null;
  if (normalized.includes("em andamento")) return EstagioStatus.EM_ANDAMENTO;
  if (normalized.includes("em fase inicial")) return EstagioStatus.EM_FASE_INICIAL;
  if (normalized.includes("rescind")) return EstagioStatus.RESCINDIDO;
  if (normalized.includes("pendencia")) return EstagioStatus.COM_PENDENCIA;
  if (normalized.includes("encerr")) return EstagioStatus.ENCERRADO;
  if (normalized.includes("apto")) return EstagioStatus.APTO_PARA_ENCERRAMENTO;

  return null;
}

function _resolveCargaHoraria(entry: EstagioImportCsvEntry): number {
  const values = [
    entry.cargaHorariaFinal,
    entry.periodoReferencia,
    entry.periodoMinimoObrigatorio,
    entry.periodoMinimoNaoObrigatorio,
  ];

  for (const value of values) {
    if (typeof value === "number" && Number.isInteger(value) && value > 0) {
      return value;
    }
  }

  return 1;
}

export function parseEstagioImportCsv(content: string): EstagioImportCsvParseResult {
  const rows = parseCsvRows(content);

  if (rows.length === 0) {
    return { totalRows: 0, entries: [], skipped: [] };
  }

  const headers = rows[0].map(normalizeHeader);

  const headerIndexes = {
    estagiario: findHeaderIndex(headers, "estagiario"),
    situacaoMatricula: findHeaderIndex(headers, "situacaodematricula"),
    emailPessoalEstagiario: findHeaderIndex(headers, "emailpessoaldoestagiario"),
    emailAcademicoEstagiario: findHeaderIndex(headers, "emailacademicodoestagiario"),
    concedente: findHeaderIndex(headers, "concedente"),
    concedenteCnpj: findHeaderIndex(headers, "concedentecnpj"),
    concedenteEndereco: findHeaderIndex(headers, "concedentendereco"),
    concedenteBairro: findHeaderIndex(headers, "concedentebairro"),
    concedenteCidade: findHeaderIndex(headers, "concedentecidade"),
    nomeSupervisor: findHeaderIndex(headers, "nomedosupervisor"),
    emailSupervisor: findHeaderIndex(headers, "emaildosupervisor"),
    telefoneSupervisor: findHeaderIndex(headers, "telefonedosupervisor"),
    nomeOrientador: findHeaderIndex(headers, "nomedoorientador"),
    matriculaOrientador: findHeaderIndex(headers, "matriculadoorientador"),
    emailOrientador: findHeaderIndex(headers, "emaildoorientador"),
    nomeAgenteIntegracao: findHeaderIndex(headers, "nomedoagentedeintegracao"),
    cnpjAgenteIntegracao: findHeaderIndex(headers, "cnpjdoagentedeintegracao"),
    dataInicio: findHeaderIndex(headers, "datadeinicio"),
    dataPrevistaFim: findHeaderIndex(headers, "dataprevistadefim"),
    nomeSeguradora: findHeaderIndex(headers, "nomedaseguradora"),
    numeroApoliceSeguro: findHeaderIndex(headers, "numerodaapolicedoseguro"),
    status: findHeaderIndex(headers, "status"),
    visitasRealizadas: findHeaderIndex(headers, "visitasrealizadas"),
    visitasJustificadas: findHeaderIndex(headers, "visitasjustificadas"),
    visitasAVencer: findHeaderIndex(headers, "visitasavencer"),
    visitasNaoRealizadas: findHeaderIndex(headers, "visitasnaorealizadas"),
    resumoPendencias: findHeaderIndex(headers, "resumodependencias"),
    dataFim: findHeaderIndex(headers, "datadefim"),
    temAditivo: findHeaderIndex(headers, "temaditivo"),
    tiposAditivo: findHeaderIndex(headers, "tiposdeaditivo"),
    encerramentoPor: findHeaderIndex(headers, "encerramentopor"),
    motivacaoDesligamento: findHeaderIndex(headers, "motivacaodesligamentoencerramento"),
    motivoRescisao: findHeaderIndex(headers, "motivodarescisao"),
    mediaNotasSupervisor: findHeaderIndex(
      headers,
      "mediadasnotasdeavaliacoessemestraisdosupervisor",
    ),
    cargaHorariaFinal: findHeaderIndex(headers, "chfinal"),
    periodoReferencia: findHeaderIndex(headers, "periododereferencia"),
    periodoMinimoObrigatorio: findHeaderIndex(headers, "periodominimoparaestagioobrigatorio"),
    periodoMinimoNaoObrigatorio: findHeaderIndex(headers, "periodominimoparaestagionaobrigatorio"),
    curso: findHeaderIndex(headers, "curso"),
    campus: findHeaderIndex(headers, "campus"),
    foiOuSeraContratado: findHeaderIndex(headers, "foiseracontratadapelaconcedente"),
  };

  const missingHeaders = [
    headerIndexes.estagiario === -1 ? "Estagiário" : null,
    headerIndexes.concedente === -1 ? "Concedente" : null,
    headerIndexes.concedenteCnpj === -1 ? "Concedente CNPJ" : null,
    headerIndexes.matriculaOrientador === -1 ? "Matrícula do Orientador" : null,
    headerIndexes.dataInicio === -1 ? "Data de Início" : null,
    headerIndexes.dataPrevistaFim === -1 ? "Data Prevista de Fim" : null,
    headerIndexes.status === -1 ? "Status" : null,
  ].filter((value): value is string => value !== null);

  if (missingHeaders.length > 0) {
    throw new Error(`CSV inválido: colunas obrigatórias ausentes (${missingHeaders.join(", ")}).`);
  }

  const entries: EstagioImportCsvEntry[] = [];
  const skipped: EstagioImportCsvSkippedRow[] = [];

  for (let index = 1; index < rows.length; index += 1) {
    const row = rows[index];
    const line = index + 1;

    const estagiario = parseEstagiarioField(getCell(row, headerIndexes.estagiario));
    const concedente = toNullIfEmpty(getCell(row, headerIndexes.concedente));
    const concedenteCnpj = toNullIfEmpty(getCell(row, headerIndexes.concedenteCnpj));

    if (!estagiario.nome && !concedente && !concedenteCnpj) {
      continue;
    }

    if (!estagiario.nome) {
      skipped.push({ line, reason: "Linha sem nome do estagiário." });
      continue;
    }

    if (!concedente || !concedenteCnpj) {
      skipped.push({ line, reason: "Linha sem dados mínimos do concedente." });
      continue;
    }

    entries.push({
      line,
      estagiarioNome: estagiario.nome,
      estagiarioMatricula: estagiario.matricula,
      estagiarioEmailPessoal: toNullIfEmpty(getCell(row, headerIndexes.emailPessoalEstagiario)),
      estagiarioEmailAcademico: toNullIfEmpty(getCell(row, headerIndexes.emailAcademicoEstagiario)),
      situacaoMatricula: toNullIfEmpty(getCell(row, headerIndexes.situacaoMatricula)),
      concedente,
      concedenteCnpj,
      concedenteEndereco: toNullIfEmpty(getCell(row, headerIndexes.concedenteEndereco)),
      concedenteBairro: toNullIfEmpty(getCell(row, headerIndexes.concedenteBairro)),
      concedenteCidade: toNullIfEmpty(getCell(row, headerIndexes.concedenteCidade)),
      nomeSupervisor: toNullIfEmpty(getCell(row, headerIndexes.nomeSupervisor)),
      emailSupervisor: toNullIfEmpty(getCell(row, headerIndexes.emailSupervisor)),
      telefoneSupervisor: toNullIfEmpty(getCell(row, headerIndexes.telefoneSupervisor)),
      nomeOrientador: toNullIfEmpty(getCell(row, headerIndexes.nomeOrientador)),
      matriculaOrientador: toNullIfEmpty(getCell(row, headerIndexes.matriculaOrientador)),
      emailOrientador: toNullIfEmpty(getCell(row, headerIndexes.emailOrientador)),
      nomeAgenteIntegracao: toNullIfEmpty(getCell(row, headerIndexes.nomeAgenteIntegracao)),
      cnpjAgenteIntegracao: toNullIfEmpty(getCell(row, headerIndexes.cnpjAgenteIntegracao)),
      curso: toNullIfEmpty(getCell(row, headerIndexes.curso)),
      campus: toNullIfEmpty(getCell(row, headerIndexes.campus)),
      dataInicio: parseDate(getCell(row, headerIndexes.dataInicio)),
      dataPrevistaFim: parseDate(getCell(row, headerIndexes.dataPrevistaFim)),
      nomeSeguradora: toNullIfEmpty(getCell(row, headerIndexes.nomeSeguradora)),
      numeroApoliceSeguro: toNullIfEmpty(getCell(row, headerIndexes.numeroApoliceSeguro)),
      status: parseStatus(getCell(row, headerIndexes.status)),
      visitasRealizadas: toNumberOrNull(getCell(row, headerIndexes.visitasRealizadas)),
      visitasJustificadas: toNumberOrNull(getCell(row, headerIndexes.visitasJustificadas)),
      visitasAVencer: toNumberOrNull(getCell(row, headerIndexes.visitasAVencer)),
      visitasNaoRealizadas: toNumberOrNull(getCell(row, headerIndexes.visitasNaoRealizadas)),
      resumoPendencias: toNullIfEmpty(getCell(row, headerIndexes.resumoPendencias)),
      dataFim: parseDate(getCell(row, headerIndexes.dataFim)),
      temAditivo: toBooleanOrNull(getCell(row, headerIndexes.temAditivo)),
      tiposAditivo: toNullIfEmpty(getCell(row, headerIndexes.tiposAditivo)),
      encerramentoPor: toNullIfEmpty(getCell(row, headerIndexes.encerramentoPor)),
      motivacaoDesligamento: toNullIfEmpty(getCell(row, headerIndexes.motivacaoDesligamento)),
      motivoRescisao: toNullIfEmpty(getCell(row, headerIndexes.motivoRescisao)),
      mediaNotasSupervisor: toNumberOrNull(getCell(row, headerIndexes.mediaNotasSupervisor)),
      cargaHorariaFinal: toNumberOrNull(getCell(row, headerIndexes.cargaHorariaFinal)),
      periodoReferencia: toNumberOrNull(getCell(row, headerIndexes.periodoReferencia)),
      periodoMinimoObrigatorio: toNumberOrNull(
        getCell(row, headerIndexes.periodoMinimoObrigatorio),
      ),
      periodoMinimoNaoObrigatorio: toNumberOrNull(
        getCell(row, headerIndexes.periodoMinimoNaoObrigatorio),
      ),
      foiOuSeraContratado: toBooleanOrNull(getCell(row, headerIndexes.foiOuSeraContratado)),
    });
  }

  return {
    totalRows: rows.length - 1,
    entries,
    skipped,
  };
}

export function resolveEstagioImportCargaHoraria(entry: EstagioImportCsvEntry): number {
  const values = [
    entry.cargaHorariaFinal,
    entry.periodoReferencia,
    entry.periodoMinimoObrigatorio,
    entry.periodoMinimoNaoObrigatorio,
  ];

  for (const value of values) {
    if (typeof value === "number" && Number.isInteger(value) && value > 0) {
      return value;
    }
  }

  return 1;
}

export function resolveEstagioImportStatus(
  entry: EstagioImportCsvEntry,
  hasEstagiario: boolean,
): EstagioStatus {
  if (entry.status === EstagioStatus.RESCINDIDO) return EstagioStatus.RESCINDIDO;
  if (entry.status === EstagioStatus.COM_PENDENCIA) return EstagioStatus.COM_PENDENCIA;
  if (entry.status === EstagioStatus.APTO_PARA_ENCERRAMENTO)
    return EstagioStatus.APTO_PARA_ENCERRAMENTO;

  if (entry.status === EstagioStatus.ENCERRADO) {
    return hasEstagiario && entry.dataFim ? EstagioStatus.ENCERRADO : EstagioStatus.EM_FASE_INICIAL;
  }

  if (entry.status === EstagioStatus.EM_ANDAMENTO) {
    return hasEstagiario && entry.dataInicio
      ? EstagioStatus.EM_ANDAMENTO
      : EstagioStatus.EM_FASE_INICIAL;
  }

  if (entry.dataInicio && hasEstagiario) {
    return EstagioStatus.EM_ANDAMENTO;
  }

  return EstagioStatus.EM_FASE_INICIAL;
}

/**
 * Resolve os dados do supervisor a partir da entrada parseada do CSV.
 * Valida e normaliza: nome, email e telefone.
 */
export function resolveEstagioImportSupervisor(entry: EstagioImportCsvEntry): {
  nomeSupervisor: string | undefined;
  emailSupervisor: string | undefined;
  telefoneSupervisor: string | undefined;
} {
  const nomeSupervisor = normalizeSupervisorName(entry.nomeSupervisor ?? "");
  const emailSupervisor = isValidEmail(entry.emailSupervisor) ? entry.emailSupervisor : undefined;
  const telefoneSupervisor = normalizePhoneNumber(entry.telefoneSupervisor ?? "");

  return {
    nomeSupervisor: nomeSupervisor ?? undefined,
    emailSupervisor,
    telefoneSupervisor: telefoneSupervisor ?? undefined,
  };
}

/**
 * Resolve os dados do orientador a partir da entrada parseada do CSV.
 * Retorna informações estruturadas sobre o orientador.
 */
export interface EstagioImportOrientadorInfo {
  matricula: string | null;
  nome: string | null;
  email: string | null;
}

export function resolveEstagioImportOrientador(
  entry: EstagioImportCsvEntry,
): EstagioImportOrientadorInfo {
  return {
    matricula: entry.matriculaOrientador,
    nome: entry.nomeOrientador ? normalizeSupervisorName(entry.nomeOrientador) : null,
    email: isValidEmail(entry.emailOrientador) ? entry.emailOrientador : null,
  };
}

/**
 * Resolve dados de estagiário com valores padrão (fallback) quando não informados.
 * Valores padrão utilizados:
 * - telefone: "00000000"
 * - dataNascimento: "2008-03-01" (01/03/2008)
 * - periodo: "2"
 */
export interface EstagioImportEstagiarioDefaultData {
  telefone: string;
  dataNascimento: string;
  periodo: string;
}

export function resolveEstagioImportEstagiarioDefaults(
  entry: EstagioImportCsvEntry,
): EstagioImportEstagiarioDefaultData {
  // Resolve telefone: usar email como fallback, ou padrão "00000000"
  // O telefone é crítico pois é obrigatório no estagiário
  const telefone = "00000000";

  // Resolve data de nascimento: usar padrão "2008-03-01" (01/03/2008)
  // Garante que todos os estagiários têm uma data válida
  const dataNascimento = "2008-03-01";

  // Resolve período: tenta usar dados do CSV, ou padrão "2"
  const periodoValue =
    entry.periodoReferencia ||
    entry.periodoMinimoObrigatorio ||
    entry.periodoMinimoNaoObrigatorio ||
    2;
  const periodo = String(periodoValue);

  return {
    telefone,
    dataNascimento,
    periodo,
  };
}

/**
 * Prepara dados de estagiário para criação, aplicando valores padrão quando necessário.
 * Útil para importações de CSV onde dados críticos podem estar faltando.
 */
export interface EstagiarioDataForCreation {
  telefone: string;
  dataNascimento: string;
  periodo: string;
  emailInstitucional?: string;
}

export function prepareEstagiarioDataForCreation(
  entry: EstagioImportCsvEntry,
): EstagiarioDataForCreation {
  const defaults = resolveEstagioImportEstagiarioDefaults(entry);

  return {
    telefone: defaults.telefone,
    dataNascimento: defaults.dataNascimento,
    periodo: defaults.periodo,
    emailInstitucional: entry.estagiarioEmailAcademico || undefined,
  };
}
