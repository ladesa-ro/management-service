import { createPostgresBackend, Worker } from "bullmq";
import { config } from "./config";
import { executarGerador } from "./executar-gerador";

function log(nivel: "info" | "erro", mensagem: string, extra?: Record<string, unknown>): void {
  const linha = JSON.stringify({ horario: new Date().toISOString(), nivel, mensagem, ...extra });

  if (nivel === "erro") {
    console.error(linha);
    return;
  }

  console.log(linha);
}

const conexao = {
  connection: {
    connectionString: config.bancoUrl,
    schema: config.schema,
  },
};

const worker = new Worker(
  config.fila,
  async (job) => {
    const inicio = Date.now();
    log("info", "pedido recebido", { jobId: job.id });

    const resultado = await executarGerador(JSON.stringify(job.data));
    const duracaoMs = Date.now() - inicio;

    if (!resultado.ok) {
      log("erro", "geracao falhou", {
        jobId: job.id,
        motivo: resultado.motivo,
        detalhe: resultado.detalhe,
        duracaoMs,
      });
      throw new Error(`${resultado.motivo}: ${resultado.detalhe}`);
    }

    log("info", "geracao concluida", { jobId: job.id, duracaoMs });

    return JSON.parse(resultado.resposta) as unknown;
  },
  { ...conexao, concurrency: config.concorrencia },
  createPostgresBackend,
);

worker.on("ready", () => {
  log("info", "worker pronto", {
    fila: config.fila,
    schema: config.schema,
    binario: config.binario,
    orcamentoSolverSegundos: config.orcamentoSolverSegundos,
  });
});

worker.on("error", (falha) => {
  log("erro", "erro do worker", { detalhe: falha.message });
});

async function encerrar(sinal: string): Promise<void> {
  log("info", "encerrando", { sinal });
  await worker.close();
  process.exit(0);
}

process.on("SIGTERM", () => void encerrar("SIGTERM"));
process.on("SIGINT", () => void encerrar("SIGINT"));
