export interface UsuarioImportCsvEntry {
  line: number;
  nome: string;
  matricula: string;
  emailPessoal: string;
  curso?: string;
  campus?: string;
  situacao?: string;
}

export interface UsuarioImportCsvSkippedRow {
  line: number;
  reason: string;
}

export interface UsuarioImportCsvParseResult {
  totalRows: number;
  entries: UsuarioImportCsvEntry[];
  skipped: UsuarioImportCsvSkippedRow[];
}

function normalizeHeader(value: string): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/\s+/g, "") // remove espaços
    .replace(/[-_]/g, "") // remove hífens e underscores
    .replace(/[^a-zA-Z0-9]/g, "") // remove outros caracteres especiais
    .toLowerCase();
}

function detectDelimiter(text: string): string {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return ",";
  const firstLine = lines[0];
  const countComma = (firstLine.match(/,/g) || []).length;
  const countSemicolon = (firstLine.match(/;/g) || []).length;
  const countTab = (firstLine.match(/\t/g) || []).length;
  if (countSemicolon > countComma && countSemicolon > countTab) return ";";
  if (countTab > countComma && countTab > countSemicolon) return "\t";
  return ",";
}

function parseCsvRows(content: string, customDelimiter?: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  const text = content.replace(/^\uFEFF/, "");
  const delimiter = customDelimiter || detectDelimiter(text);

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

    if (char === delimiter) {
      currentRow.push(currentField);
      currentField = "";
      continue;
    }

    if (char === "\n") {
      currentRow.push(currentField);
      if (currentRow.some((c) => c.trim().length > 0)) {
        rows.push(currentRow);
      }
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
    if (currentRow.some((c) => c.trim().length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

function getCell(row: string[], index: number): string {
  if (index === -1 || !row || index >= row.length) return "";
  return (row[index] ?? "").trim();
}

function findHeaderFlex(headers: string[], ...candidates: string[]): number {
  for (const candidate of candidates) {
    const norm = normalizeHeader(candidate);
    if (!norm) continue;
    const idx = headers.indexOf(norm);
    if (idx !== -1) return idx;
  }
  for (const candidate of candidates) {
    const norm = normalizeHeader(candidate);
    if (!norm) continue;
    const idx = headers.findIndex(
      (h) =>
        h.length > 0 &&
        (h.includes(norm) || (norm.length >= 4 && h.length >= 4 && norm.includes(h))),
    );
    if (idx !== -1) return idx;
  }
  return -1;
}

export function parseUsuarioImportCsv(content: string): UsuarioImportCsvParseResult {
  const rows = parseCsvRows(content);

  if (rows.length === 0) {
    return { totalRows: 0, entries: [], skipped: [] };
  }

  const headers = rows[0].map(normalizeHeader);
  const nomeIndex = findHeaderFlex(headers, "nome", "nomecompleto", "nomealuno", "nomeestudante");
  const matriculaIndex = findHeaderFlex(headers, "matricula", "matriculaaluno", "identificacao");
  const emailPessoalIndex = findHeaderFlex(headers, "emailpessoal", "emailsecundario");
  const cursoIndex = findHeaderFlex(headers, "curso", "nomecurso");
  const campusIndex = findHeaderFlex(headers, "campus", "unidade");
  const situacaoIndex = findHeaderFlex(headers, "situacao", "situacaomatricula");

  const missingHeaders = [
    nomeIndex === -1 ? "Nome" : null,
    matriculaIndex === -1 ? "Matrícula" : null,
    emailPessoalIndex === -1 ? "E-mail Pessoal" : null,
  ].filter((value): value is string => value !== null);

  if (missingHeaders.length > 0) {
    throw new Error(`CSV inválido: colunas obrigatórias ausentes (${missingHeaders.join(", ")}).`);
  }

  const entries: UsuarioImportCsvEntry[] = [];
  const skipped: UsuarioImportCsvSkippedRow[] = [];

  for (let index = 1; index < rows.length; index += 1) {
    const row = rows[index];
    const line = index + 1;

    const nome = getCell(row, nomeIndex);
    const matricula = getCell(row, matriculaIndex);
    const emailPessoal = getCell(row, emailPessoalIndex);
    const curso = getCell(row, cursoIndex);
    const campus = getCell(row, campusIndex);
    const situacao = getCell(row, situacaoIndex);

    if (!nome && !matricula && !emailPessoal) {
      continue;
    }

    if (!nome || !matricula) {
      skipped.push({
        line,
        reason: "Linha sem nome ou matrícula obrigatória.",
      });
      continue;
    }

    if (!emailPessoal) {
      skipped.push({
        line,
        reason: "Linha sem e-mail pessoal obrigatório. Usuário ignorado.",
      });
      continue;
    }

    entries.push({
      line,
      nome,
      matricula,
      emailPessoal,
      curso: curso || undefined,
      campus: campus || undefined,
      situacao: situacao || undefined,
    });
  }

  return {
    totalRows: rows.length - 1,
    entries,
    skipped,
  };
}
