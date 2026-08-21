import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import type { Request, Response } from "express";
import { IConfigService } from "@/infrastructure.config";
import { Public } from "@/server/nest/auth";
import { FolhaPontoTokenConfirmHandler } from "../application/commands/folha-ponto-token-confirm.handler";
import { FolhaPontoTokenTipo } from "../domain/folha-ponto-token";

// ---------------------------------------------------------------------------
// Helpers de renderização HTML
// ---------------------------------------------------------------------------

type PageConfig = {
  emoji: string;
  titulo: string;
  descricao: string;
  corPrimaria: string;
  corFundo: string;
  data?: string;
  horaInicio?: string;
  horaFim?: string;
  quantidadeHoras?: number;
  nomeEstagiario?: string;
  botaoTexto?: string;
};

function formatarHoras(horas: number): string {
  const h = Math.floor(horas);
  const m = Math.round((horas - h) * 60);
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${m.toString().padStart(2, "0")}min`;
}

function renderizarPagina(cfg: PageConfig): string {
  const detalhesFolha =
    cfg.data && cfg.horaInicio && cfg.horaFim
      ? `
        <div class="card">
          <div class="card-row"><span class="label">📅 Data</span><span>${cfg.data}</span></div>
          <div class="card-row"><span class="label">⏰ Horário</span><span>${cfg.horaInicio} até ${cfg.horaFim}</span></div>
          <div class="card-row"><span class="label">⌚ Total</span><span>${formatarHoras(cfg.quantidadeHoras ?? 0)}</span></div>
          ${cfg.nomeEstagiario ? `<div class="card-row"><span class="label">👤 Estagiário</span><span>${cfg.nomeEstagiario}</span></div>` : ""}
        </div>`
      : "";

  const botaoAcao = cfg.botaoTexto
    ? `
      <form method="POST" style="margin-top: 1.5rem;">
        <button type="submit" class="btn-confirmar">${cfg.botaoTexto}</button>
      </form>`
    : `<div class="badge">Ladesa</div>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${cfg.titulo} — Folha de Ponto</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: ${cfg.corFundo};
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .container {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,.10);
      max-width: 420px;
      width: 100%;
      padding: 2.5rem 2rem;
      text-align: center;
    }
    .emoji { font-size: 4rem; line-height: 1; margin-bottom: 1rem; }
    h1 { font-size: 1.5rem; font-weight: 700; color: ${cfg.corPrimaria}; margin-bottom: .5rem; }
    .descricao { color: #555; font-size: 0.95rem; margin-bottom: 1.25rem; line-height: 1.5; }
    .card {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 1rem 1.25rem;
      text-align: left;
      margin-top: .5rem;
    }
    .card-row {
      display: flex;
      justify-content: space-between;
      padding: .4rem 0;
      font-size: .93rem;
      border-bottom: 1px solid #eee;
      gap: .5rem;
    }
    .card-row:last-child { border-bottom: none; }
    .label { color: #888; white-space: nowrap; }
    .btn-confirmar {
      display: block;
      width: 100%;
      background: ${cfg.corPrimaria};
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 0.95rem 1.5rem;
      font-size: 1.05rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,.12);
      transition: opacity .15s ease, transform .1s ease;
    }
    .btn-confirmar:hover { opacity: .92; transform: translateY(-1px); }
    .btn-confirmar:active { transform: translateY(0); }
    .badge {
      display: inline-block;
      margin-top: 1.5rem;
      background: ${cfg.corPrimaria};
      color: #fff;
      border-radius: 999px;
      padding: .35rem 1.1rem;
      font-size: .85rem;
      font-weight: 600;
      letter-spacing: .03em;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">${cfg.emoji}</div>
    <h1>${cfg.titulo}</h1>
    <p class="descricao">${cfg.descricao}</p>
    ${detalhesFolha}
    ${botaoAcao}
  </div>
</body>
</html>`;
}

// Configurações para a tela de confirmação (GET - antes de clicar)
const TELAS_SOLICITACAO: Record<
  FolhaPontoTokenTipo,
  Omit<PageConfig, "data" | "horaInicio" | "horaFim" | "quantidadeHoras">
> = {
  [FolhaPontoTokenTipo.APROVACAO]: {
    emoji: "📋",
    titulo: "Aprovar Folha de Ponto",
    descricao: "Revise os detalhes abaixo e confirme a aprovação do registro de ponto.",
    corPrimaria: "#16a34a",
    corFundo: "#f0fdf4",
    botaoTexto: "✅ Confirmar Aprovação",
  },
  [FolhaPontoTokenTipo.REJEICAO]: {
    emoji: "📋",
    titulo: "Rejeitar Folha de Ponto",
    descricao: "Revise os detalhes abaixo e confirme a rejeição do registro de ponto.",
    corPrimaria: "#dc2626",
    corFundo: "#fef2f2",
    botaoTexto: "❌ Confirmar Rejeição",
  },
  [FolhaPontoTokenTipo.CANCELAMENTO]: {
    emoji: "📋",
    titulo: "Cancelar Solicitação",
    descricao: "Revise os detalhes abaixo e confirme o cancelamento do registro de ponto.",
    corPrimaria: "#9333ea",
    corFundo: "#faf5ff",
    botaoTexto: "↩️ Confirmar Cancelamento",
  },
};

// Configurações para a tela de sucesso (POST - após clicar no botão)
const TELAS_SUCESSO: Record<
  FolhaPontoTokenTipo,
  Omit<PageConfig, "data" | "horaInicio" | "horaFim" | "quantidadeHoras">
> = {
  [FolhaPontoTokenTipo.APROVACAO]: {
    emoji: "✅",
    titulo: "Folha de Ponto Aprovada",
    descricao: "A folha de ponto foi aprovada com sucesso. O estagiário será notificado.",
    corPrimaria: "#16a34a",
    corFundo: "#f0fdf4",
  },
  [FolhaPontoTokenTipo.REJEICAO]: {
    emoji: "❌",
    titulo: "Folha de Ponto Rejeitada",
    descricao: "A folha de ponto foi rejeitada. O estagiário será notificado.",
    corPrimaria: "#dc2626",
    corFundo: "#fef2f2",
  },
  [FolhaPontoTokenTipo.CANCELAMENTO]: {
    emoji: "↩️",
    titulo: "Folha de Ponto Cancelada",
    descricao: "A solicitação da folha de ponto foi cancelada.",
    corPrimaria: "#9333ea",
    corFundo: "#faf5ff",
  },
};

const PAGINA_ERRO: Omit<PageConfig, "data" | "horaInicio" | "horaFim" | "quantidadeHoras"> = {
  emoji: "⚠️",
  titulo: "Link Inválido ou Expirado",
  descricao: "",
  corPrimaria: "#d97706",
  corFundo: "#fffbeb",
};

// ---------------------------------------------------------------------------
// Controller
// ---------------------------------------------------------------------------

@ApiTags("folha-ponto-tokens")
@Public()
@UseGuards(ThrottlerGuard)
@Controller("/folha-ponto/tokens")
export class FolhaPontoTokenRestController {
  constructor(
    private readonly confirmHandler: FolhaPontoTokenConfirmHandler,
    @Inject(IConfigService) readonly _configService: IConfigService,
  ) {}

  /**
   * Exibe a página de confirmação para o supervisor (GET).
   * Operação segura e idempotente: não consome o token nem altera o banco.
   * Evita que crawlers (como o preview de link do WhatsApp) executem ações acidentalmente.
   * GET /folha-ponto/tokens/:tokenId/confirmar
   */
  @Get("/:tokenId/confirmar")
  @HttpCode(200)
  @ApiOperation({
    operationId: "folhaPontoTokenExibirConfirmacao",
    summary: "Exibe tela de confirmação da folha de ponto para o supervisor",
  })
  @ApiOkResponse({
    description: "Página HTML com botão para confirmar ação ou objeto JSON de validação",
  })
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async exibirConfirmacao(
    @Param("tokenId", new ParseUUIDPipe()) tokenId: string,
    @Req() req?: Request,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<any> {
    const isJson = req?.headers?.accept?.includes("application/json") ?? false;

    try {
      const { token, folhaPonto } = await this.confirmHandler.validar(tokenId);

      if (isJson) {
        return {
          valido: true,
          tipo: token.tipo,
          folhaPonto: {
            data: folhaPonto.data,
            horaInicio: folhaPonto.horaInicio,
            horaFim: folhaPonto.horaFim,
            quantidadeHoras: folhaPonto.quantidadeHoras,
          },
        };
      }

      res?.setHeader?.("Content-Type", "text/html; charset=utf-8");
      res?.setHeader?.("Cache-Control", "no-store");
      const cfg = TELAS_SOLICITACAO[token.tipo];
      return renderizarPagina({
        ...cfg,
        data: folhaPonto.data,
        horaInicio: folhaPonto.horaInicio,
        horaFim: folhaPonto.horaFim,
        quantidadeHoras: folhaPonto.quantidadeHoras,
      });
    } catch (error: any) {
      if (isJson) {
        throw error;
      }

      res?.setHeader?.("Content-Type", "text/html; charset=utf-8");
      res?.setHeader?.("Cache-Control", "no-store");
      const mensagem: string = error?.message ?? "Ocorreu um erro ao processar este link.";
      return renderizarPagina({ ...PAGINA_ERRO, descricao: mensagem });
    }
  }

  /**
   * Confirma a ação do supervisor (POST).
   * Executa a mutação, consome o token e invalida os irmãos.
   * Se chamado por navegador (HTML), retorna a página de sucesso.
   * Se chamado programaticamente (JSON), retorna o payload JSON.
   * POST /folha-ponto/tokens/:tokenId/confirmar
   */
  @Post("/:tokenId/confirmar")
  @HttpCode(200)
  @ApiOperation({
    operationId: "folhaPontoTokenConfirmar",
    summary: "Confirma aprovação/rejeição/cancelamento da folha de ponto",
  })
  @ApiOkResponse({ description: "Ação confirmada com sucesso" })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async confirmar(
    @Param("tokenId", new ParseUUIDPipe()) tokenId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const ip = (req.ip as string) ?? null;
    const ua = (req.headers["user-agent"] as string) ?? null;
    const isJson = req.headers.accept?.includes("application/json") ?? false;

    try {
      const { acao, folhaPontoId, folhaPonto } = await this.confirmHandler.confirmar(
        tokenId,
        ip,
        ua,
      );

      if (isJson) {
        return { sucesso: true, acao, folhaPontoId };
      }

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");

      const cfg = TELAS_SUCESSO[acao];
      return renderizarPagina({
        ...cfg,
        data: folhaPonto.data,
        horaInicio: folhaPonto.horaInicio,
        horaFim: folhaPonto.horaFim,
        quantidadeHoras: folhaPonto.quantidadeHoras,
      });
    } catch (error: any) {
      if (isJson) {
        throw error;
      }

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      const mensagem: string = error?.message ?? "Ocorreu um erro ao processar este link.";
      return renderizarPagina({ ...PAGINA_ERRO, descricao: mensagem });
    }
  }
}
