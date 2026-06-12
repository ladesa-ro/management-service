/**
 * Helper para parsear o relatório XLS exportado do SUAP.
 *
 * Colunas esperadas (baseadas no relatório padrão do SUAP):
 *   #, Matrícula, Nome, CPF, Campus, Código Curso, Data de Nascimento,
 *   Descrição do Curso, Email Acadêmico, Email Pessoal, Situação no Curso,
 *   Situação no Período, Telefone, Turma, Turno
 *
 * Regras de negócio:
 * - Alunos com situação "Transferido" (interno ou externo) são ignorados.
 * - O email do usuário é o email pessoal.
 * - O primeiro número de telefone da célula "Telefone" é usado.
 * - A turma é derivada do campo "Turma" (ex.: "20261.3.0202.97.1V - 3B" → período "3B").
 */

export interface UsuarioImportSuapXlsEntry {
  line: number;
  matricula: string;
  nome: string;
  emailPessoal: string;
  campus: string;
  codigoCurso: string;
  descricaoCurso: string;
  situacao: string;
  telefone: string | null;
  /** Período extraído da coluna Turma (ex: "3B", "1A") */
  periodo: string | null;
  /** Código/identificador da turma no SUAP (ex: "20261.3.0202.97.1V - 3B") */
  turmaOriginal: string | null;
}

export interface UsuarioImportSuapXlsSkippedRow {
  line: number;
  reason: string;
}

export interface UsuarioImportSuapXlsParseResult {
  totalRows: number;
  entries: UsuarioImportSuapXlsEntry[];
  skipped: UsuarioImportSuapXlsSkippedRow[];
}

/** Situações que indicam que o aluno foi transferido e não deve ser cadastrado. */
const SITUACOES_IGNORADAS = new Set([
  "transferido externo",
  "transferido interno",
  "cancelado",
  "cancelamento por desligamento",
]);

function normalizeHeader(value: string): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/[-_]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

/** Extrai o primeiro número de telefone de uma célula com múltiplos números separados por vírgula. */
function extractFirstPhone(value: string): string | null {
  if (!value) return null;
  const parts = value.split(",");
  const first = parts[0]?.trim();
  return first || null;
}

/**
 * Extrai o período da turma a partir do código completo.
 * Exemplo: "20261.3.0202.97.1V - 3B" → "3B"
 *          "20261.1.0202.97.2I - 1B" → "1B"
 */
function extractPeriodo(turmaValue: string): string | null {
  if (!turmaValue || turmaValue.trim() === "-") return null;
  // Padrão: "<codigo> - <periodo>" onde periodo é algo como "3B", "1A", "2A"
  const match = /[-–]\s*(\w+)\s*$/.exec(turmaValue.trim());
  return match?.[1] ?? null;
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

export function parseUsuarioImportSuapXls(content: string): UsuarioImportSuapXlsParseResult {
  const rows = parseCsvRows(content);

  if (rows.length === 0) {
    return { totalRows: 0, entries: [], skipped: [] };
  }

  const headers = rows[0].map(normalizeHeader);

  const matriculaIndex = headers.indexOf("matricula");
  const nomeIndex = headers.indexOf("nome");
  const campusIndex = headers.indexOf("campus");
  const codigoCursoIndex = headers.indexOf("codigocurso");
  const descricaoCursoIndex = headers.indexOf("descricaodocurso");
  const emailPessoalIndex = headers.indexOf("emailpessoal");
  const situacaoCursoIndex = headers.indexOf("situacaonocurso");
  const telefoneIndex = headers.indexOf("telefone");
  const turmaIndex = headers.indexOf("turma");

  const missingHeaders = [
    matriculaIndex === -1 ? "Matrícula" : null,
    nomeIndex === -1 ? "Nome" : null,
    campusIndex === -1 ? "Campus" : null,
    emailPessoalIndex === -1 ? "Email Pessoal" : null,
    situacaoCursoIndex === -1 ? "Situação no Curso" : null,
  ].filter((value): value is string => value !== null);

  if (missingHeaders.length > 0) {
    throw new Error(
      `Arquivo inválido: colunas obrigatórias ausentes (${missingHeaders.join(", ")}).`,
    );
  }

  const entries: UsuarioImportSuapXlsEntry[] = [];
  const skipped: UsuarioImportSuapXlsSkippedRow[] = [];

  for (let index = 1; index < rows.length; index += 1) {
    const row = rows[index];
    const line = index + 1;

    const matricula = getCell(row, matriculaIndex);
    const nome = getCell(row, nomeIndex);
    const campus = getCell(row, campusIndex);
    const emailPessoal = getCell(row, emailPessoalIndex);
    const situacao = getCell(row, situacaoCursoIndex);
    const codigoCurso = codigoCursoIndex >= 0 ? getCell(row, codigoCursoIndex) : "";
    const descricaoCurso = descricaoCursoIndex >= 0 ? getCell(row, descricaoCursoIndex) : "";
    const telefoneRaw = telefoneIndex >= 0 ? getCell(row, telefoneIndex) : "";
    const turmaOriginal = turmaIndex >= 0 ? getCell(row, turmaIndex) : "";

    // Pula linhas completamente vazias
    if (!matricula && !nome) {
      continue;
    }

    // Valida campos obrigatórios
    if (!matricula || !nome) {
      skipped.push({ line, reason: "Matrícula ou nome ausentes." });
      continue;
    }

    if (!emailPessoal) {
      skipped.push({ line, reason: `Aluno ${matricula} sem e-mail pessoal. Ignorado.` });
      continue;
    }

    // Ignora alunos transferidos ou cancelados
    const situacaoNorm = situacao.toLowerCase().trim();
    if (SITUACOES_IGNORADAS.has(situacaoNorm)) {
      skipped.push({ line, reason: `Aluno ${matricula} com situação "${situacao}". Ignorado.` });
      continue;
    }

    const telefone = extractFirstPhone(telefoneRaw);
    const periodo = extractPeriodo(turmaOriginal);

    entries.push({
      line,
      matricula,
      nome,
      emailPessoal,
      campus,
      codigoCurso,
      descricaoCurso,
      situacao,
      telefone,
      periodo,
      turmaOriginal: turmaOriginal || null,
    });
  }

  return {
    totalRows: rows.length - 1,
    entries,
    skipped,
  };
}
