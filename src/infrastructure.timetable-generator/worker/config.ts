function obrigatorio(nome: string): string {
  const valor = process.env[nome];

  if (!valor) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${nome}`);
  }

  return valor;
}

function inteiro(nome: string, padrao: number): number {
  const valor = process.env[nome];

  if (!valor) {
    return padrao;
  }

  const numero = Number.parseInt(valor, 10);

  if (Number.isNaN(numero) || numero <= 0) {
    throw new Error(
      `Variável de ambiente ${nome} precisa ser um inteiro positivo, recebido: ${valor}`,
    );
  }

  return numero;
}

function urlDoBanco(): string {
  return process.env.QUEUE_DATABASE_URL || obrigatorio("DATABASE_URL");
}

export const config = {
  bancoUrl: urlDoBanco(),
  schema: process.env.QUEUE_SCHEMA ?? "bullmq",
  fila: process.env.QUEUE_TIMETABLE_GENERATE ?? "timetable-generate",
  binario: process.env.TIMETABLE_WORKER_BINARY ?? "/opt/ladesa/ladesa-timetable-generator",
  orcamentoSolverSegundos: inteiro("TIMETABLE_WORKER_SOLVER_BUDGET_SECONDS", 55),
  tempoLimiteProcessoSegundos: inteiro("TIMETABLE_WORKER_PROCESS_TIMEOUT_SECONDS", 58),
  concorrencia: inteiro("TIMETABLE_WORKER_CONCURRENCY", 1),
} as const;
