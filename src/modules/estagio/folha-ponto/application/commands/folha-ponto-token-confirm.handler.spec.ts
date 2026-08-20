import { ConflictException, NotFoundException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { FolhaPontoStatus } from "../../domain/folha-ponto";
import { FolhaPontoTokenTipo } from "../../domain/folha-ponto-token";
import { FolhaPontoTokenConfirmHandler } from "./folha-ponto-token-confirm.handler";

describe("FolhaPontoTokenConfirmHandler", () => {
  const folhaPontoId = "018f9e6b-1234-7890-abcd-ef1234567890";
  const tokenId = "test-token-uuid-1234";

  const createMockFolhaPontoEntity = (status: FolhaPontoStatus = FolhaPontoStatus.PENDING) => ({
    id: folhaPontoId,
    estagio: { id: "018f9e6b-0000-7890-abcd-000000000000" },
    data: "2026-08-24",
    horaInicio: "15:30",
    horaFim: "16:30",
    quantidadeHoras: 1,
    observacoes: null,
    status,
    dataSolicitacao: new Date().toISOString(),
    dataAprovacao: null,
    dataRejeicao: null,
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    dateDeleted: null,
  });

  const createMockTokenEntity = (
    tipo: FolhaPontoTokenTipo = FolhaPontoTokenTipo.APROVACAO,
    options: { usedAt?: string | null; expiresAt?: string } = {},
  ) => {
    const future = new Date();
    future.setHours(future.getHours() + 72);

    return {
      id: tokenId,
      folhaPontoId,
      folhaPonto: { id: folhaPontoId },
      tipo,
      expiresAt: options.expiresAt ?? future.toISOString(),
      usedAt: options.usedAt ?? null,
      ipAddress: null,
      userAgent: null,
      dateCreated: new Date().toISOString(),
    };
  };

  const createMockTransactionManager = (tokenEntity: any, folhaPontoEntity: any) => {
    const tokenRepo = {
      findOne: vi.fn().mockResolvedValue(tokenEntity),
      update: vi.fn().mockResolvedValue({ affected: 1 }),
    };
    const folhaPontoRepo = {
      findOne: vi.fn().mockResolvedValue(folhaPontoEntity),
      save: vi.fn().mockImplementation((entity) => Promise.resolve(entity)),
    };

    const manager = {
      getRepository: vi.fn((entityClass) => {
        if (entityClass.name === "FolhaPontoTokenTypeormEntity") return tokenRepo;
        if (entityClass.name === "FolhaPontoTypeormEntity") return folhaPontoRepo;
        return null;
      }),
    };

    const dataSource = {
      transaction: vi.fn(async (cb: (m: any) => Promise<any>) => cb(manager)),
    };

    return { manager, dataSource, tokenRepo, folhaPontoRepo };
  };

  it("deve confirmar aprovação com sucesso, atualizar o token e invalidar os demais tokens", async () => {
    const tokenEntity = createMockTokenEntity(FolhaPontoTokenTipo.APROVACAO);
    const folhaPontoEntity = createMockFolhaPontoEntity(FolhaPontoStatus.PENDING);
    const { dataSource, tokenRepo, folhaPontoRepo } = createMockTransactionManager(
      tokenEntity,
      folhaPontoEntity,
    );

    const handler = new FolhaPontoTokenConfirmHandler({} as any, {} as any, dataSource as any);

    const result = await handler.confirmar(tokenId, "127.0.0.1", "Test-Agent");

    expect(result.acao).toBe(FolhaPontoTokenTipo.APROVACAO);
    expect(result.folhaPontoId).toBe(folhaPontoId);
    expect(result.folhaPonto.status).toBe(FolhaPontoStatus.APPROVED);

    // Verifica que folha de ponto foi salva com status APPROVED
    expect(folhaPontoRepo.save).toHaveBeenCalledTimes(1);

    // Verifica que o token atual foi marcado como usado
    expect(tokenRepo.update).toHaveBeenCalledWith(
      { id: tokenId },
      expect.objectContaining({
        ipAddress: "127.0.0.1",
        userAgent: "Test-Agent",
        usedAt: expect.any(String),
      }),
    );

    // Verifica que os tokens irmãos foram invalidados em cascata
    expect(tokenRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({
        folhaPontoId,
        usedAt: expect.anything(),
      }),
      expect.objectContaining({
        userAgent: "System Cascade Invalidation",
        usedAt: expect.any(String),
      }),
    );
  });

  it("deve confirmar rejeição com sucesso e atualizar status para REJECTED", async () => {
    const tokenEntity = createMockTokenEntity(FolhaPontoTokenTipo.REJEICAO);
    const folhaPontoEntity = createMockFolhaPontoEntity(FolhaPontoStatus.PENDING);
    const { dataSource } = createMockTransactionManager(tokenEntity, folhaPontoEntity);

    const handler = new FolhaPontoTokenConfirmHandler({} as any, {} as any, dataSource as any);

    const result = await handler.confirmar(tokenId, "127.0.0.1", "Test-Agent");

    expect(result.acao).toBe(FolhaPontoTokenTipo.REJEICAO);
    expect(result.folhaPonto.status).toBe(FolhaPontoStatus.REJECTED);
  });

  it("deve confirmar cancelamento com sucesso e atualizar status para CANCELLED", async () => {
    const tokenEntity = createMockTokenEntity(FolhaPontoTokenTipo.CANCELAMENTO);
    const folhaPontoEntity = createMockFolhaPontoEntity(FolhaPontoStatus.PENDING);
    const { dataSource } = createMockTransactionManager(tokenEntity, folhaPontoEntity);

    const handler = new FolhaPontoTokenConfirmHandler({} as any, {} as any, dataSource as any);

    const result = await handler.confirmar(tokenId, "127.0.0.1", "Test-Agent");

    expect(result.acao).toBe(FolhaPontoTokenTipo.CANCELAMENTO);
    expect(result.folhaPonto.status).toBe(FolhaPontoStatus.CANCELLED);
  });

  it("deve lançar NotFoundException quando o token não existe", async () => {
    const { dataSource } = createMockTransactionManager(null, null);

    const handler = new FolhaPontoTokenConfirmHandler({} as any, {} as any, dataSource as any);

    await expect(handler.confirmar("inexistente", null, null)).rejects.toThrow(NotFoundException);
  });

  it("deve lançar ConflictException quando o token já foi utilizado", async () => {
    const tokenEntity = createMockTokenEntity(FolhaPontoTokenTipo.APROVACAO, {
      usedAt: new Date().toISOString(),
    });
    const { dataSource } = createMockTransactionManager(tokenEntity, null);

    const handler = new FolhaPontoTokenConfirmHandler({} as any, {} as any, dataSource as any);

    await expect(handler.confirmar(tokenId, null, null)).rejects.toThrow(ConflictException);
  });

  it("deve lançar ConflictException quando o token expirou", async () => {
    const past = new Date();
    past.setHours(past.getHours() - 100);
    const tokenEntity = createMockTokenEntity(FolhaPontoTokenTipo.APROVACAO, {
      expiresAt: past.toISOString(),
    });
    const { dataSource } = createMockTransactionManager(tokenEntity, null);

    const handler = new FolhaPontoTokenConfirmHandler({} as any, {} as any, dataSource as any);

    await expect(handler.confirmar(tokenId, null, null)).rejects.toThrow(ConflictException);
  });
});
