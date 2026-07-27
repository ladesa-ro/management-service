import { Controller, Get, HttpCode, Inject, Param, Post, Redirect, Req } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { Request } from "express";
import { IConfigService } from "@/infrastructure.config";
import { EnvKeys } from "@/infrastructure.config/env-keys";
import { FolhaPontoTokenConfirmHandler } from "../application/commands/folha-ponto-token-confirm.handler";

@ApiTags("folha-ponto-tokens")
@Controller("/folha-ponto/tokens")
export class FolhaPontoTokenRestController {
  private readonly frontendBaseUrl: string;

  constructor(
    private readonly confirmHandler: FolhaPontoTokenConfirmHandler,
    @Inject(IConfigService) private readonly configService: IConfigService,
  ) {
    this.frontendBaseUrl =
      this.configService.get<string>(EnvKeys.APP_PUBLIC_BASE_URL) ?? "http://localhost:3001";
  }

  /**
   * Valida o token e redireciona para a página de confirmação no frontend.
   * Endpoint público — sem autenticação JWT.
   * GET /folha-ponto/tokens/:tokenId/confirmar
   */
  @Get("/:tokenId/confirmar")
  @Redirect()
  @ApiOperation({
    operationId: "folhaPontoTokenValidar",
    summary: "Valida token e redireciona para confirmação",
  })
  @ApiOkResponse({ description: "Redirect para o frontend de confirmação" })
  async validar(@Param("tokenId") tokenId: string): Promise<{ url: string; statusCode: number }> {
    try {
      // Valida sem consumir o token
      const { token, folhaPonto } = await this.confirmHandler.validar(tokenId);

      // Redireciona para o frontend com os dados relevantes
      const redirectUrl = `${this.frontendBaseUrl}/folha-ponto/confirmar?token=${tokenId}&tipo=${token.tipo}&data=${folhaPonto.data}&inicio=${folhaPonto.horaInicio}&fim=${folhaPonto.horaFim}&horas=${folhaPonto.quantidadeHoras}`;
      return { url: redirectUrl, statusCode: 302 };
    } catch (error: any) {
      // Redireciona para página de erro no frontend
      const code = error?.status ?? 400;
      const msg = encodeURIComponent(error?.message ?? "Erro ao validar token");
      return {
        url: `${this.frontendBaseUrl}/folha-ponto/erro?code=${code}&msg=${msg}`,
        statusCode: 302,
      };
    }
  }

  /**
   * Confirma a ação do supervisor (POST do frontend).
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
  async confirmar(
    @Param("tokenId") tokenId: string,
    @Req() req: Request,
  ): Promise<{ sucesso: boolean; acao: string; folhaPontoId: string }> {
    const ip = (req.ip as string) ?? null;
    const ua = (req.headers["user-agent"] as string) ?? null;

    const { acao, folhaPontoId } = await this.confirmHandler.confirmar(tokenId, ip, ua);

    return { sucesso: true, acao, folhaPontoId };
  }
}
