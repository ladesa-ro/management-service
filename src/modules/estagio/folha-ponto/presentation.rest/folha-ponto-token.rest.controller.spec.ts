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

  it("deve renderizar página HTML de aprovação com sucesso", async () => {
    const mockHandler = {
      confirmar: vi.fn().mockResolvedValue({
        acao: FolhaPontoTokenTipo.APROVACAO,
        folhaPontoId: mockFolhaPonto.id,
        folhaPonto: mockFolhaPonto,
      }),
    };

    const controller = new FolhaPontoTokenRestController(mockHandler as any, {} as any);
    const mockReq = { ip: "127.0.0.1", headers: { "user-agent": "Mozilla/5.0" } };

    const html = await controller.confirmarViaLink("test-uuid-aprovacao", mockReq as any);

    expect(html).toContain("Folha de Ponto Aprovada");
    expect(html).toContain("2026-08-24");
    expect(html).toContain("15:30 até 16:30");
    expect(html).toContain("1h");
    expect(html).toContain("A folha de ponto foi aprovada com sucesso");
  });

  it("deve renderizar página HTML de rejeição com sucesso", async () => {
    const mockHandler = {
      confirmar: vi.fn().mockResolvedValue({
        acao: FolhaPontoTokenTipo.REJEICAO,
        folhaPontoId: mockFolhaPonto.id,
        folhaPonto: mockFolhaPonto,
      }),
    };

    const controller = new FolhaPontoTokenRestController(mockHandler as any, {} as any);
    const mockReq = { ip: "127.0.0.1", headers: { "user-agent": "Mozilla/5.0" } };

    const html = await controller.confirmarViaLink("test-uuid-rejeicao", mockReq as any);

    expect(html).toContain("Folha de Ponto Rejeitada");
    expect(html).toContain("A folha de ponto foi rejeitada");
  });

  it("deve renderizar página HTML de cancelamento com sucesso", async () => {
    const mockHandler = {
      confirmar: vi.fn().mockResolvedValue({
        acao: FolhaPontoTokenTipo.CANCELAMENTO,
        folhaPontoId: mockFolhaPonto.id,
        folhaPonto: mockFolhaPonto,
      }),
    };

    const controller = new FolhaPontoTokenRestController(mockHandler as any, {} as any);
    const mockReq = { ip: "127.0.0.1", headers: { "user-agent": "Mozilla/5.0" } };

    const html = await controller.confirmarViaLink("test-uuid-cancelamento", mockReq as any);

    expect(html).toContain("Folha de Ponto Cancelada");
    expect(html).toContain("A solicitação da folha de ponto foi cancelada");
  });

  it("deve renderizar página de erro amigável quando o token é inválido ou expirado", async () => {
    const mockHandler = {
      confirmar: vi.fn().mockRejectedValue(new Error("Este link já foi utilizado anteriormente.")),
    };

    const controller = new FolhaPontoTokenRestController(mockHandler as any, {} as any);
    const mockReq = { ip: "127.0.0.1", headers: { "user-agent": "Mozilla/5.0" } };

    const html = await controller.confirmarViaLink("test-uuid-invalido", mockReq as any);

    expect(html).toContain("Link Inválido ou Expirado");
    expect(html).toContain("Este link já foi utilizado anteriormente.");
  });

  it("deve confirmar ação via endpoint POST e retornar JSON", async () => {
    const mockHandler = {
      confirmar: vi.fn().mockResolvedValue({
        acao: FolhaPontoTokenTipo.APROVACAO,
        folhaPontoId: mockFolhaPonto.id,
        folhaPonto: mockFolhaPonto,
      }),
    };

    const controller = new FolhaPontoTokenRestController(mockHandler as any, {} as any);
    const mockReq = { ip: "127.0.0.1", headers: { "user-agent": "PostmanRuntime" } };

    const result = await controller.confirmar("test-uuid-post", mockReq as any);

    expect(result).toEqual({
      sucesso: true,
      acao: FolhaPontoTokenTipo.APROVACAO,
      folhaPontoId: mockFolhaPonto.id,
    });
  });
});
