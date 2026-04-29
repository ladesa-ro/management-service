export interface EstagiarioImportCsvEntry {
  line: number;
  nome: string;
  matricula: string;
  emailPessoal?: string;
  emailAcademico?: string;
  periodoReferencia?: string;
  curso?: string;
  campus?: string;
  telefoneEstagiario?: string;
  dataNascimento?: string;
  // Empresa/Concedente fields
  concedenteNome?: string;
  concedenteCnpj?: string;
  concedenteEndereco?: string;
  concedenteBairro?: string;
  concedenteCidade?: string;
  // Supervisor fields
  supervisorNome?: string;
  supervisorEmail?: string;
  supervisorTelefone?: string;
  // Orientador fields (resolved by matricula)
  orientadorMatricula?: string;
  // Estagio fields
  cargaHoraria?: string;
  dataInicio?: string;
  dataFim?: string;
  status?: string;
}

export interface EstagiarioImportCsvSkippedRow {
  line: number;
  reason: string;
}

export interface EstagiarioImportCsvParseResult {
  totalRows: number;
  entries: EstagiarioImportCsvEntry[];
  skipped: EstagiarioImportCsvSkippedRow[];
}

function normalizeHeader(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^0-9a-zA-Z]/g, "")   // limpa resto
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

    if (char === "\r") continue;

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

function extractNameAndMatricula(field: string): { nome: string; matricula: string } {
  const m = field.match(/^(.*)\(([^)]+)\)\s*$/);
  if (m) {
    return { nome: m[1].trim(), matricula: m[2].trim() };
  }
  return { nome: field.trim(), matricula: "" };
}

/**
 * Map CSV status text to domain EstagioStatus enum values.
 * CSV examples: "Em Andamento/Em Fase Inicial", "Rescindido", "Com Pendência", "Encerrado"
 * Domain enum: EM_FASE_INICIAL, EM_ANDAMENTO, RESCINDIDO, COM_PENDENCIA, ENCERRADO, APTO_PARA_ENCERRAMENTO
 */
function mapCsvStatusToEnum(csvStatus: string): string {
  if (!csvStatus) return "";
  const normalized = csvStatus.trim().toUpperCase();

  // Map CSV status variations to domain enum
  if (normalized.includes("RESCINDIDO")) return "RESCINDIDO";
  if (normalized.includes("ENCERRADO")) return "ENCERRADO";
  if (normalized.includes("PENDENCIA") || normalized.includes("COM_PENDENCIA")) return "COM_PENDENCIA";
  if (normalized.includes("APTO")) return "APTO_PARA_ENCERRAMENTO";
  if (normalized.includes("ANDAMENTO")) return "EM_ANDAMENTO";
  if (normalized.includes("INICIAL") || normalized.includes("FASE")) return "EM_FASE_INICIAL";

  // Default to initial phase
  return "EM_FASE_INICIAL";
}

export function parseEstagiariosCsv(content: string): EstagiarioImportCsvParseResult {
  const rows = parseCsvRows(content);
  if (rows.length === 0) return { totalRows: 0, entries: [], skipped: [] };

  const headers = rows[0].map(normalizeHeader);

  const findIndex = (candidates: string[]) => {
    for (const cand of candidates) {
      const idx = headers.findIndex((h) => h.includes(cand));
      if (idx !== -1) return idx;
    }
    return -1;
  };

  const nomeIndex = findIndex(["estagiario", "estudante"]);
  const emailPessoalIndex = findIndex(["emailpessoal"]);
  const emailAcademicoIndex = findIndex(["emailacademico"]);
  const periodoReferenciaIndex = findIndex(["periododereferencia", "periodoreferencia"]);
  const cursoIndex = findIndex(["curso"]);
  const campusIndex = findIndex(["campus"]);
  const concedenteIndex = findIndex(["concedente"]);
  const concedenteCnpjIndex = findIndex(["concedentecnpj", "cnpj"]);
  const concedenteEnderecoIndex = findIndex(["concedenteendereco", "endereco"]);
  const concedenteBairroIndex = findIndex(["concedentebairro", "bairro"]);
  const concedenteCidadeIndex = findIndex(["concedentecidade", "cidade"]);
  const supervisorNomeIndex = findIndex(["nomesupervisor", "supervisornome"]);
  const supervisorEmailIndex = findIndex(["emailsupervisor", "supervisoremail"]);
  const supervisorTelefoneIndex = findIndex(["telefonesupervisor", "supervisortelefone"]);
  const orientadorMatriculaIndex = findIndex(["matriculadorientador", "matricula_orientador"]);
  const cargaHorariaIndex = findIndex(["chfinal", "cargahoraria"]);
  const dataInicioIndex = findIndex(["datainicio", "data_inicio"]);
  const dataFimIndex = findIndex(["datafim", "data_fim", "data_prevista_fim"]);
  const statusIndex = findIndex(["status"]);

  const entries: EstagiarioImportCsvEntry[] = [];
  const skipped: EstagiarioImportCsvSkippedRow[] = [];

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const line = i + 1;

    const nomeField = nomeIndex !== -1 ? getCell(row, nomeIndex) : "";
    const { nome, matricula } = extractNameAndMatricula(nomeField || "");
    const emailPessoal = emailPessoalIndex !== -1 ? getCell(row, emailPessoalIndex) : "";
    const emailAcademico = emailAcademicoIndex !== -1 ? getCell(row, emailAcademicoIndex) : "";
    const periodoReferencia = periodoReferenciaIndex !== -1 ? getCell(row, periodoReferenciaIndex) : "";
    const curso = cursoIndex !== -1 ? getCell(row, cursoIndex) : "";
    const campus = campusIndex !== -1 ? getCell(row, campusIndex) : "";
    const concedenteNome = concedenteIndex !== -1 ? getCell(row, concedenteIndex) : "";
    const concedenteCnpj = concedenteCnpjIndex !== -1 ? getCell(row, concedenteCnpjIndex) : "";
    const concedenteEndereco = concedenteEnderecoIndex !== -1 ? getCell(row, concedenteEnderecoIndex) : "";
    const concedenteBairro = concedenteBairroIndex !== -1 ? getCell(row, concedenteBairroIndex) : "";
    const concedenteCidade = concedenteCidadeIndex !== -1 ? getCell(row, concedenteCidadeIndex) : "";
    const supervisorNome = supervisorNomeIndex !== -1 ? getCell(row, supervisorNomeIndex) : "";
    const supervisorEmail = supervisorEmailIndex !== -1 ? getCell(row, supervisorEmailIndex) : "";
    const supervisorTelefone = supervisorTelefoneIndex !== -1 ? getCell(row, supervisorTelefoneIndex) : "";
    const orientadorMatricula = orientadorMatriculaIndex !== -1 ? getCell(row, orientadorMatriculaIndex) : "";
    const cargaHoraria = cargaHorariaIndex !== -1 ? getCell(row, cargaHorariaIndex) : "";
    const dataInicio = dataInicioIndex !== -1 ? getCell(row, dataInicioIndex) : "";
    const dataFim = dataFimIndex !== -1 ? getCell(row, dataFimIndex) : "";
    const statusRaw = statusIndex !== -1 ? getCell(row, statusIndex) : "";
    const status = mapCsvStatusToEnum(statusRaw);

    if (!nome && !matricula && !emailPessoal && !emailAcademico) continue;

    if (!nome || !matricula) {
      skipped.push({ line, reason: "Linha sem nome ou matrícula do estagiário" });
      continue;
    }

    entries.push({
      line,
      nome,
      matricula,
      emailPessoal,
      emailAcademico,
      periodoReferencia,
      curso,
      campus,
      telefoneEstagiario: "",
      dataNascimento: "",
      concedenteNome,
      concedenteCnpj,
      concedenteEndereco,
      concedenteBairro,
      concedenteCidade,
      supervisorNome,
      supervisorEmail,
      supervisorTelefone,
      orientadorMatricula,
      cargaHoraria,
      dataInicio,
      dataFim,
      status,
    });
  }

  return { totalRows: entries.length, entries, skipped };
}
