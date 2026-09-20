import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { IEstagioRepository } from "../domain/repositories";
import { EstagioRestController } from "./estagio.rest.controller";

describe("EstagioRestController - getCargaHoraria", () => {
  function createController(options: { estagio?: any; folhas?: any[] }) {
    const estagioRepo = {
      loadById: vi.fn().mockResolvedValue(options.estagio ?? null),
    };

    const folhaPontoRepo = {
      find: vi.fn().mockResolvedValue(options.folhas ?? []),
    };

    const appConnection = {
      getRepository: vi.fn().mockReturnValue(folhaPontoRepo),
    };

    const container = {
      get: vi.fn().mockImplementation((token: any) => {
        if (token === IEstagioRepository) return estagioRepo;
        if (token === IAppTypeormConnection) return appConnection;
        return null;
      }),
    };

    const pushService = {
      notificarEstagioFaseInicial: vi.fn(),
    };

    const controller = new EstagioRestController(container as any, pushService as any);

    return { controller, estagioRepo, folhaPontoRepo };
  }

  it("should correctly compute registered, approved, pending and remaining hours with fractions", async () => {
    const estagioId = createTestId();
    const estagio = {
      id: estagioId,
      cargaHoraria: 300,
      status: "EM_ANDAMENTO",
    };

    const folhas = [
      { id: "1", quantidadeHoras: 4.5, status: "APPROVED" },
      { id: "2", quantidadeHoras: 5.5, status: "APPROVED" },
      { id: "3", quantidadeHoras: 4.0, status: "PENDING" },
      { id: "4", quantidadeHoras: 2.0, status: "REJECTED" },
      { id: "5", quantidadeHoras: 3.0, status: "CANCELLED" },
    ];

    const { controller } = createController({ estagio, folhas });
    const accessContext = createTestAccessContext(createTestRequestActor({ id: "actor-1" }));

    const result = await controller.getCargaHoraria(accessContext, estagioId);

    expect(result.id).toBe(estagioId);
    expect(result.cargaHorariaPrevista).toBe(300);
    // Registradas não canceladas: 4.5 + 5.5 + 4.0 + 2.0 = 16
    expect(result.cargaHorariaRegistrada).toBe(16);
    // Aprovadas: 4.5 + 5.5 = 10
    expect(result.cargaHorariaComprovada).toBe(10);
    expect(result.cargaHorariaPendente).toBe(4);
    expect(result.cargaHorariaRejeitada).toBe(2);
    // Restante: 300 - 10 = 290
    expect(result.cargaHorariaRestante).toBe(290);
    // Percentual: (10 / 300) * 100 = 3.33%
    expect(result.percentualConcluido).toBe(3.33);
    expect(result.situacao).toBe("EM_ANDAMENTO");
    expect(result.totalRegistros).toBe(5);
    expect(result.totalAprovados).toBe(2);
    expect(result.totalPendentes).toBe(1);
    expect(result.totalRejeitados).toBe(1);
  });

  it("should mark situacao as CONCLUIDO when approved hours reach or exceed required hours", async () => {
    const estagioId = createTestId();
    const estagio = {
      id: estagioId,
      cargaHoraria: 100,
      status: "EM_ANDAMENTO",
    };

    const folhas = [
      { id: "1", quantidadeHoras: 60, status: "APPROVED" },
      { id: "2", quantidadeHoras: 40.5, status: "APPROVED" },
    ];

    const { controller } = createController({ estagio, folhas });
    const accessContext = createTestAccessContext(createTestRequestActor({ id: "actor-1" }));

    const result = await controller.getCargaHoraria(accessContext, estagioId);

    expect(result.cargaHorariaComprovada).toBe(100.5);
    expect(result.cargaHorariaRestante).toBe(0);
    expect(result.percentualConcluido).toBe(100);
    expect(result.situacao).toBe("CONCLUIDO");
  });

  it("should throw ResourceNotFoundError if estagio does not exist", async () => {
    const { controller } = createController({ estagio: null });
    const accessContext = createTestAccessContext(createTestRequestActor({ id: "actor-1" }));

    await expect(controller.getCargaHoraria(accessContext, createTestId())).rejects.toThrow(
      ResourceNotFoundError,
    );
  });
});
