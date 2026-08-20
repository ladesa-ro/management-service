import {
  Controller,
  Get,
  Header,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import type { Request } from "express";
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
    h1 { font-size: 1.6rem; font-weight: 700; color: ${cfg.corPrimaria}; margin-bottom: .5rem; }
    .descricao { color: #555; font-size: 1rem; margin-bottom: 1.5rem; line-height: 1.5; }
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
    <div class="badge">Ladesa</div>
  </div>
</body>
</html>`;
}

const PAGINAS: Record<
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
   * Confirma a ação do supervisor via link do WhatsApp.
   * Executa a ação imediatamente e retorna uma página HTML com o resultado.
   * Endpoint público — sem autenticação JWT.
   * GET /folha-ponto/tokens/:tokenId/confirmar
   */
  @Get("/:tokenId/confirmar")
  @HttpCode(200)
  @Header("Content-Type", "text/html; charset=utf-8")
  @Header("Cache-Control", "no-store")
  @ApiOperation({
    operationId: "folhaPontoTokenConfirmarViaLink",
    summary: "Confirma ação via link e retorna página HTML com o resultado",
  })
  @ApiOkResponse({ description: "Página HTML com resultado da ação" })
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async confirmarViaLink(
    @Param("tokenId", new ParseUUIDPipe()) tokenId: string,
    @Req() req: Request,
  ): Promise<string> {
    const ip = (req.ip as string) ?? null;
    const ua = (req.headers["user-agent"] as string) ?? null;

    try {
      const {
        acao,
        folhaPontoId: _id,
        folhaPonto,
      } = await this.confirmHandler.confirmar(tokenId, ip, ua);

      const cfg = PAGINAS[acao];
      return renderizarPagina({
        ...cfg,
        data: folhaPonto.data,
        horaInicio: folhaPonto.horaInicio,
        horaFim: folhaPonto.horaFim,
        quantidadeHoras: folhaPonto.quantidadeHoras,
      });
    } catch (error: any) {
      const mensagem: string = error?.message ?? "Ocorreu um erro ao processar este link.";
      return renderizarPagina({ ...PAGINA_ERRO, descricao: mensagem });
    }
  }

  /**
   * Confirma a ação do supervisor via POST (chamada programática).
   * Endpoint público — autenticação via token one-time.
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
  ): Promise<{ sucesso: boolean; acao: string; folhaPontoId: string }> {
    const ip = (req.ip as string) ?? null;
    const ua = (req.headers["user-agent"] as string) ?? null;

    const { acao, folhaPontoId } = await this.confirmHandler.confirmar(tokenId, ip, ua);

    return { sucesso: true, acao, folhaPontoId };
  }
}
