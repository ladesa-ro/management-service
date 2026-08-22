import { spawn } from "node:child_process";
import { config } from "./config";

export type ResultadoGerador =
  | { ok: true; resposta: string }
  | { ok: false; motivo: "timeout" | "falha"; detalhe: string; resposta: string | null };

export function executarGerador(pedidoJson: string): Promise<ResultadoGerador> {
  return new Promise((resolver) => {
    const processo = spawn(config.binario, [], {
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        ...process.env,
        TIMETABLE_SOLVER_BUDGET_SECONDS: String(config.orcamentoSolverSegundos),
      },
    });

    let saida = "";
    let erro = "";
    let encerrado = false;

    const relogio = setTimeout(() => {
      encerrado = true;
      processo.kill("SIGKILL");
      resolver({
        ok: false,
        motivo: "timeout",
        detalhe: `o gerador excedeu ${config.tempoLimiteProcessoSegundos}s e foi encerrado`,
        resposta: null,
      });
    }, config.tempoLimiteProcessoSegundos * 1000);

    processo.stdout.on("data", (pedaco) => {
      saida += pedaco.toString();
    });

    processo.stderr.on("data", (pedaco) => {
      erro += pedaco.toString();
    });

    processo.on("error", (falha) => {
      if (encerrado) return;
      clearTimeout(relogio);
      encerrado = true;
      resolver({ ok: false, motivo: "falha", detalhe: falha.message, resposta: null });
    });

    processo.on("close", (codigo) => {
      if (encerrado) return;
      clearTimeout(relogio);
      encerrado = true;

      if (codigo === 0) {
        resolver({ ok: true, resposta: saida });
        return;
      }

      resolver({
        ok: false,
        motivo: "falha",
        detalhe: erro.trim() || `o gerador saiu com código ${codigo}`,
        resposta: saida.trim() ? saida : null,
      });
    });

    processo.stdin.write(pedidoJson);
    processo.stdin.end();
  });
}
