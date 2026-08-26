import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { createTestId } from "@/test/helpers";
import { CalendarioAgendamentoConflitoService } from "./calendario-agendamento-conflito.service";

function createMockRepository(conflicts: unknown[] = []) {
  return {
    findConflicting: vi.fn().mockResolvedValue(conflicts),
  };
}

function createPerfilResult(overrides: Record<string, unknown> = {}) {
  return {
    id: createTestId(),
    usuario: { id: createTestId(), nome: "Prof. Teste" },
    campus: { nomeFantasia: "Campus Teste" },
    ...overrides,
  };
}

const baseParams = {
  dataInicio: "2026-03-02",
  dataFim: null as string | null,
  horarioInicio: "08:00:00",
  horarioFim: "09:00:00",
  turmaIds: [] as string[],
  ambienteIds: [] as string[],
};

describe("CalendarioAgendamentoConflitoService", () => {
  it("does not call findConflicting when there are no recursos a verificar", async () => {
    const repository = createMockRepository();
    const perfilFindOneHandler = { execute: vi.fn() };
    const perfilFindAllActiveHandler = { execute: vi.fn() };
    const service = new CalendarioAgendamentoConflitoService(
      repository as any,
      perfilFindOneHandler as any,
      perfilFindAllActiveHandler as any,
    );

    await service.ensureSemConflito(null, { ...baseParams, perfilIds: [] });

    expect(repository.findConflicting).not.toHaveBeenCalled();
    expect(perfilFindOneHandler.execute).not.toHaveBeenCalled();
  });

  it("detects a conflict between the same usuario's perfis in different campi", async () => {
    const usuarioId = createTestId();
    const perfilCampusA = createPerfilResult({
      usuario: { id: usuarioId, nome: "Ana Professora" },
      campus: { nomeFantasia: "Campus A" },
    });
    const perfilCampusB = createPerfilResult({
      usuario: { id: usuarioId, nome: "Ana Professora" },
      campus: { nomeFantasia: "Campus B" },
    });

    const repository = createMockRepository([
      {
        id: createTestId(),
        identificadorExterno: "ext-1",
        recurso: "perfil",
        recursoId: perfilCampusB.id,
      },
    ]);
    const perfilFindOneHandler = { execute: vi.fn().mockResolvedValue(perfilCampusA) };
    const perfilFindAllActiveHandler = {
      execute: vi.fn().mockResolvedValue([perfilCampusA, perfilCampusB]),
    };

    const service = new CalendarioAgendamentoConflitoService(
      repository as any,
      perfilFindOneHandler as any,
      perfilFindAllActiveHandler as any,
    );

    let thrown: BadRequestException | undefined;
    try {
      await service.ensureSemConflito(null, { ...baseParams, perfilIds: [perfilCampusA.id] });
    } catch (error) {
      thrown = error as BadRequestException;
    }

    expect(thrown).toBeInstanceOf(BadRequestException);
    expect(thrown?.message).toContain("outro campus");
    expect(thrown?.message).toContain("Ana Professora");
    expect(thrown?.message).toContain("Campus B");

    expect(perfilFindAllActiveHandler.execute).toHaveBeenCalledWith(null, { usuarioId });
    expect(repository.findConflicting).toHaveBeenCalledWith(
      expect.objectContaining({
        perfilIds: expect.arrayContaining([perfilCampusA.id, perfilCampusB.id]),
      }),
    );
  });

  it("still detects a conflict on the exact same perfil (regression)", async () => {
    const usuarioId = createTestId();
    const perfil = createPerfilResult({ usuario: { id: usuarioId, nome: "Beto Professor" } });

    const repository = createMockRepository([
      {
        id: createTestId(),
        identificadorExterno: "ext-2",
        recurso: "perfil",
        recursoId: perfil.id,
      },
    ]);
    const perfilFindOneHandler = { execute: vi.fn().mockResolvedValue(perfil) };
    const perfilFindAllActiveHandler = { execute: vi.fn().mockResolvedValue([perfil]) };

    const service = new CalendarioAgendamentoConflitoService(
      repository as any,
      perfilFindOneHandler as any,
      perfilFindAllActiveHandler as any,
    );

    let thrown: BadRequestException | undefined;
    try {
      await service.ensureSemConflito(null, { ...baseParams, perfilIds: [perfil.id] });
    } catch (error) {
      thrown = error as BadRequestException;
    }

    expect(thrown).toBeInstanceOf(BadRequestException);
    expect(thrown?.message).toContain(`perfil (${perfil.id})`);
    expect(thrown?.message).not.toContain("outro campus");
  });

  it("does not flag perfis from different usuarios as conflicting (no false positive)", async () => {
    const perfilX = createPerfilResult({ usuario: { id: createTestId(), nome: "Usuario X" } });
    const perfilXIrmao = createPerfilResult({ usuario: perfilX.usuario });
    const perfilY = createPerfilResult({ usuario: { id: createTestId(), nome: "Usuario Y" } });

    const repository = createMockRepository([]);
    const perfilFindOneHandler = {
      execute: vi.fn().mockImplementation(async (_ctx: unknown, { id }: { id: string }) => {
        if (id === perfilX.id) return perfilX;
        if (id === perfilY.id) return perfilY;
        return null;
      }),
    };
    const perfilFindAllActiveHandler = {
      execute: vi
        .fn()
        .mockImplementation(async (_ctx: unknown, { usuarioId }: { usuarioId: string }) => {
          if (usuarioId === perfilX.usuario.id) return [perfilX, perfilXIrmao];
          if (usuarioId === perfilY.usuario.id) return [perfilY];
          return [];
        }),
    };

    const service = new CalendarioAgendamentoConflitoService(
      repository as any,
      perfilFindOneHandler as any,
      perfilFindAllActiveHandler as any,
    );

    await expect(
      service.ensureSemConflito(null, { ...baseParams, perfilIds: [perfilX.id, perfilY.id] }),
    ).resolves.toBeUndefined();

    const expandedPerfilIds = repository.findConflicting.mock.calls[0]![0].perfilIds as string[];
    expect(new Set(expandedPerfilIds)).toEqual(new Set([perfilX.id, perfilXIrmao.id, perfilY.id]));
  });

  it("distinguishes cross-campus perfil conflicts from other resources in the same message", async () => {
    const usuarioId = createTestId();
    const perfilCampusA = createPerfilResult({
      usuario: { id: usuarioId, nome: "Carla Professora" },
      campus: { nomeFantasia: "Campus A" },
    });
    const perfilCampusB = createPerfilResult({
      usuario: { id: usuarioId, nome: "Carla Professora" },
      campus: { nomeFantasia: "Campus B" },
    });
    const turmaId = createTestId();

    const repository = createMockRepository([
      {
        id: createTestId(),
        identificadorExterno: "ext-turma",
        recurso: "turma",
        recursoId: turmaId,
      },
      {
        id: createTestId(),
        identificadorExterno: "ext-perfil",
        recurso: "perfil",
        recursoId: perfilCampusB.id,
      },
    ]);
    const perfilFindOneHandler = { execute: vi.fn().mockResolvedValue(perfilCampusA) };
    const perfilFindAllActiveHandler = {
      execute: vi.fn().mockResolvedValue([perfilCampusA, perfilCampusB]),
    };

    const service = new CalendarioAgendamentoConflitoService(
      repository as any,
      perfilFindOneHandler as any,
      perfilFindAllActiveHandler as any,
    );

    let thrown: BadRequestException | undefined;
    try {
      await service.ensureSemConflito(null, {
        ...baseParams,
        turmaIds: [turmaId],
        perfilIds: [perfilCampusA.id],
      });
    } catch (error) {
      thrown = error as BadRequestException;
    }

    expect(thrown?.message).toContain(`turma (${turmaId})`);
    expect(thrown?.message).toContain("outro campus");
    expect(thrown?.message).toContain("Carla Professora");
  });

  it("passes the excludeIdentificadorExterno through to findConflicting", async () => {
    const repository = createMockRepository([]);
    const perfilFindOneHandler = { execute: vi.fn().mockResolvedValue(null) };
    const perfilFindAllActiveHandler = { execute: vi.fn().mockResolvedValue([]) };

    const service = new CalendarioAgendamentoConflitoService(
      repository as any,
      perfilFindOneHandler as any,
      perfilFindAllActiveHandler as any,
    );

    await service.ensureSemConflito(null, {
      ...baseParams,
      perfilIds: [],
      turmaIds: [createTestId()],
      excludeIdentificadorExterno: "ext-origem",
    });

    expect(repository.findConflicting).toHaveBeenCalledWith(
      expect.objectContaining({ excludeIdentificadorExterno: "ext-origem" }),
    );
  });
});
