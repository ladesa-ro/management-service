import { describe, expect, it, vi } from "vitest";
import { FolhaPontoTokenTipo } from "../domain/folha-ponto-token";
import { FolhaPontoTokenRestController } from "./folha-ponto-token.rest.controller";

describe("FolhaPontoTokenRestController", () => {
  const mockFolhaPonto = {
    id: "018f9e6b-1234-7890-abcd-ef1234567890",
    data: "2026-08-24",
    horaInicio: "15:30",
    horaFim: "16:30",
    quantidadeHoras: 1,
  };

  const mockToken = {
    id: "test-token-uuid-1234",
    tipo: FolhaPontoTokenTipo.APROVACAO,
    folhaPonto: { id: mockFolhaPonto.id },
  };

  const createMockResponse = () => {
    const headers: Record<string, string> = {};
    return {
      setHeader: vi.fn((key: string, value: string) => {
        headers[key] = value;
      }),
      headers,
    };
  };

  it("GET: deve renderizar tela de confirmação com botão de ação (sem consumir token)", async () => {
    const mockHandler = {
      validar: vi.fn().mockResolvedValue({
        token: mockToken,
        folhaPonto: mockFolhaPonto,
      }),
    };

    const controller = new FolhaPontoTokenRestController(mockHandler as any, {} as any);

    const html = await controller.exibirConfirmacao("test-uuid-aprovacao");

    expect(html).toContain("Aprovar Folha de Ponto");
    expect(html).toContain("2026-08-24");
    expect(html).toContain("15:30 até 16:30");
    expect(html).toContain("1h");
    expect(html).toContain("Confirmar Aprovação");
    expect(html).toContain('<form method="POST"');
    expect(mockHandler.validar).toHaveBeenCalledWith("test-uuid-aprovacao");
  });

  it("GET: deve renderizar tela de erro quando o token é inválido ou expirado", async () => {
    const mockHandler = {
      validar: vi
        .fn()
        .mockRejectedValue(new Error("Este link expirou e não pode mais ser utilizado.")),
    };

    const controller = new FolhaPontoTokenRestController(mockHandler as any, {} as any);

    const html = await controller.exibirConfirmacao("test-uuid-expirado");

    expect(html).toContain("Link Inválido ou Expirado");
    expect(html).toContain("Este link expirou e não pode mais ser utilizado.");
  });

  it("POST (browser/HTML): deve confirmar a ação e retornar a página de sucesso", async () => {
    const mockHandler = {
      confirmar: vi.fn().mockResolvedValue({
        acao: FolhaPontoTokenTipo.APROVACAO,
        folhaPontoId: mockFolhaPonto.id,
        folhaPonto: mockFolhaPonto,
      }),
    };

    const controller = new FolhaPontoTokenRestController(mockHandler as any, {} as any);
    const mockReq = { ip: "127.0.0.1", headers: { "user-agent": "Mozilla/5.0" } };
    const mockRes = createMockResponse();

    const html = await controller.confirmar("test-uuid-post", mockReq as any, mockRes as any);

    expect(html).toContain("Folha de Ponto Aprovada");
    expect(html).toContain("A folha de ponto foi aprovada com sucesso");
    expect(mockRes.setHeader).toHaveBeenCalledWith("Content-Type", "text/html; charset=utf-8");
  });

  it("POST (API/JSON): deve confirmar a ação e retornar JSON", async () => {
    const mockHandler = {
      confirmar: vi.fn().mockResolvedValue({
        acao: FolhaPontoTokenTipo.APROVACAO,
        folhaPontoId: mockFolhaPonto.id,
        folhaPonto: mockFolhaPonto,
      }),
    };

    const controller = new FolhaPontoTokenRestController(mockHandler as any, {} as any);
    const mockReq = {
      ip: "127.0.0.1",
      headers: { "user-agent": "PostmanRuntime", accept: "application/json" },
    };
    const mockRes = createMockResponse();

    const result = await controller.confirmar(
      "test-uuid-post-json",
      mockReq as any,
      mockRes as any,
    );

    expect(result).toEqual({
      sucesso: true,
      acao: FolhaPontoTokenTipo.APROVACAO,
      folhaPontoId: mockFolhaPonto.id,
    });
  });
});
