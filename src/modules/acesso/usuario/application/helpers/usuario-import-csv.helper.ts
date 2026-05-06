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
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
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

export function parseUsuarioImportCsv(content: string): UsuarioImportCsvParseResult {
  const rows = parseCsvRows(content);

  if (rows.length === 0) {
    return { totalRows: 0, entries: [], skipped: [] };
  }

  const headers = rows[0].map(normalizeHeader);
  const nomeIndex = headers.indexOf("nome");
  const matriculaIndex = headers.indexOf("matricula");
  const emailPessoalIndex = headers.indexOf("emailpessoal");
  const cursoIndex = headers.indexOf("curso");
  const campusIndex = headers.indexOf("campus");
  const situacaoIndex = headers.indexOf("situacao");

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
