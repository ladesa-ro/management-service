import { describe, expect, it, vi } from "vitest";
import { calendarioWsRoom } from "@/modules/acesso/notificacao/domain/calendario-ws-room.types";
import { createTestId } from "@/test/helpers";
import { CalendarioColecaoSyncService } from "./calendario-colecao-sync.service";

function createHandler(overrides: { queryResult?: Array<Record<string, unknown>> } = {}) {
  const appTypeormConnection = {
    query: vi.fn().mockResolvedValue(overrides.queryResult ?? [{ sync_token: 1 }]),
  };
  const gateway = {
    emitToRoom: vi.fn(),
  };

  const service = new CalendarioColecaoSyncService(appTypeormConnection as any, gateway as any);

  return { service, appTypeormConnection, gateway };
}

describe("CalendarioColecaoSyncService", () => {
  describe("registrarMudanca", () => {
    it("should increment the sync_token via SQL and return the new value", async () => {
      const colecaoId = createTestId();
      const { service, appTypeormConnection } = createHandler({
        queryResult: [{ sync_token: 7 }],
      });

      const result = await service.registrarMudanca({
        colecaoId,
        agendamentoId: createTestId(),
        tipoOperacao: "create",
      });

      expect(result).toBe(7);
      expect(appTypeormConnection.query).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE calendario_colecao SET sync_token = sync_token + 1"),
        [colecaoId],
      );
    });

    it("should emit the sync payload to the collection's WS room", async () => {
      const colecaoId = createTestId();
      const agendamentoId = createTestId();
      const { service, gateway } = createHandler({ queryResult: [{ sync_token: 3 }] });

      await service.registrarMudanca({
        colecaoId,
        agendamentoId,
        tipoOperacao: "update",
      });

      expect(gateway.emitToRoom).toHaveBeenCalledWith(calendarioWsRoom(colecaoId), {
        colecaoId,
        agendamentoId,
        tipoOperacao: "update",
        syncToken: 3,
      });
    });

    it("should default to 0 when the collection row is not found", async () => {
      const { service, gateway } = createHandler({ queryResult: [] });

      const result = await service.registrarMudanca({
        colecaoId: createTestId(),
        agendamentoId: createTestId(),
        tipoOperacao: "delete",
      });

      expect(result).toBe(0);
      expect(gateway.emitToRoom).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ syncToken: 0 }),
      );
    });
  });

  describe("obterSyncTokenAtual", () => {
    it("should return the current sync_token for the collection", async () => {
      const colecaoId = createTestId();
      const { service, appTypeormConnection } = createHandler({
        queryResult: [{ sync_token: 42 }],
      });

      const result = await service.obterSyncTokenAtual(colecaoId);

      expect(result).toBe(42);
      expect(appTypeormConnection.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT sync_token FROM calendario_colecao"),
        [colecaoId],
      );
    });

    it("should default to 0 when the collection row is not found", async () => {
      const { service } = createHandler({ queryResult: [] });

      const result = await service.obterSyncTokenAtual(createTestId());

      expect(result).toBe(0);
    });
  });
});
