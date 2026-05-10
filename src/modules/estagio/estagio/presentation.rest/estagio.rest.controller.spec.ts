import { describe, expect, it, vi } from "vitest";
import { IUsuarioRepository } from "@/modules/acesso/usuario";
import { ICursoListQueryHandler } from "@/modules/ensino/curso";
import { IEmpresaRepository } from "@/modules/estagio/empresa";
import {
  IEstagiarioCreateCommandHandler,
  IEstagiarioRepository,
} from "@/modules/estagio/estagiario";
import { IEstagioCreateCommandHandler } from "@/modules/estagio/estagio/domain/commands";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { EstagioRestController } from "./estagio.rest.controller";

function createController(options?: {
  empresaRepository?: {
    findByCnpj: (cnpj: string) => Promise<{ id: string } | null>;
  };
}) {
  const createHandler = {
    execute: vi.fn().mockResolvedValue({ id: createTestId() }),
  };
  const empresaRepository = options?.empresaRepository ?? {
    findByCnpj: vi.fn().mockResolvedValue({ id: createTestId() }),
  };
  const usuarioRepository = {
    findByMatricula: vi.fn().mockImplementation(async (matricula: string) => {
      if (matricula === "2024102020023") {
        return { id: "usuario-estagiario-id" };
      }

      if (matricula === "2291377") {
        return { id: "usuario-orientador-id" };
      }

      return null;
    }),
  };
  const estagiarioRepository = {
    findByUsuarioId: vi.fn().mockImplementation(async (usuarioId: string) => {
      if (usuarioId === "usuario-estagiario-id") {
        return { id: "estagiario-id" };
      }

      return null;
    }),
  };

  const providers = new Map<any, any>([
    [IEstagioCreateCommandHandler, createHandler],
    [IEmpresaRepository, empresaRepository],
    [ICursoListQueryHandler, { execute: vi.fn().mockResolvedValue({ data: [] }) }],
    [
      IEstagiarioCreateCommandHandler,
      { execute: vi.fn().mockResolvedValue({ id: createTestId() }) },
    ],
    [IUsuarioRepository, usuarioRepository],
    [IEstagiarioRepository, estagiarioRepository],
  ]);

  const container = {
    get: vi.fn((token: any) => providers.get(token)),
  };

  const controller = new EstagioRestController(container as any);

  return {
    controller,
    container,
    createHandler,
    empresaRepository,
    usuarioRepository,
    estagiarioRepository,
  };
}

describe("EstagioRestController.importCsv", () => {
  it("should create estagio rows resolving user ids from matriculas", async () => {
    const {
      controller,
      createHandler,
      empresaRepository,
      usuarioRepository,
      estagiarioRepository,
    } = createController();
    const accessContext = createTestAccessContext();

    // Helper to properly quote CSV fields that may contain commas
    const quoteIfNeeded = (value: string) => (value.includes(",") ? `"${value}"` : value);

    const headers = [
      "#",
      "Estagiário",
      "Concedente",
      "Concedente CNPJ",
      "Nome do Supervisor",
      "E-mail do Supervisor",
      "Telefone do Supervisor",
      "Nome do Orientador",
      "Matrícula do Orientador",
      "Data de Início",
      "Data Prevista de Fim",
      "Status",
      "C.H. Final",
      "Período de Referência",
      "Período Mínimo para Estágio Obrigatório",
      "Período Mínimo para Estágio Não Obrigatório",
    ];

    const data = [
      "1",
      "Arthur Luiz Braun Krauser de Moura (2024102020023)",
      "Instituto Federal de Educacao",
      "10.817.343/0002-88",
      "Jefferson dos Santos",
      "jefferson.santos@ifro.edu.br",
      "699226-0959",
      "Emi Silva de Oliveira",
      "2291377",
      "20/04/2026",
      "22/06/2026",
      "Em Andamento/Em Fase Inicial",
      "20",
      "3",
      "2",
      "1",
    ];

    const csv = [headers.map(quoteIfNeeded).join(","), data.map(quoteIfNeeded).join(",")].join(
      "\n",
    );

    const result = await controller.importCsv(accessContext, {
      buffer: Buffer.from(csv, "utf8"),
    } as Express.Multer.File);

    expect(empresaRepository.findByCnpj).toHaveBeenCalledWith("10.817.343/0002-88");
    expect(usuarioRepository.findByMatricula).toHaveBeenCalledWith("2024102020023");
    expect(usuarioRepository.findByMatricula).toHaveBeenCalledWith("2291377");
    expect(estagiarioRepository.findByUsuarioId).toHaveBeenCalledWith("usuario-estagiario-id");
    expect(createHandler.execute).toHaveBeenCalledOnce();
    expect(createHandler.execute).toHaveBeenCalledWith(
      accessContext,
      expect.objectContaining({
        empresa: { id: expect.any(String) },
        estagiario: { id: "estagiario-id" },
        usuarioOrientador: { id: "usuario-orientador-id" },
        cargaHoraria: 20,
        dataInicio: "2026-04-20",
        dataFim: null,
        status: "EM_ANDAMENTO",
        nomeSupervisor: "Jefferson dos Santos",
        emailSupervisor: "jefferson.santos@ifro.edu.br",
        telefoneSupervisor: "699226-0959",
        horariosEstagio: [],
      }),
    );

    expect(result).toMatchObject({
      total: 1,
      created: 1,
      skipped: 0,
      failed: 0,
      items: [
        {
          line: 2,
          estagiarioNome: "Arthur Luiz Braun Krauser de Moura",
          estagiarioMatricula: "2024102020023",
          usuarioEstagiarioId: "usuario-estagiario-id",
          estagiarioId: "estagiario-id",
          usuarioOrientadorId: "usuario-orientador-id",
          status: "created",
        },
      ],
    });
  });

  it("should mark the row as failed when the company does not exist", async () => {
    const { controller, createHandler } = createController({
      empresaRepository: {
        findByCnpj: vi.fn().mockResolvedValue(null),
      },
    });
    const accessContext = createTestAccessContext();

    const quoteIfNeeded = (value: string) => (value.includes(",") ? `"${value}"` : value);

    const headers = [
      "#",
      "Estagiário",
      "Concedente",
      "Concedente CNPJ",
      "Matrícula do Orientador",
      "Data de Início",
      "Data Prevista de Fim",
      "Status",
      "C.H. Final",
      "Período de Referência",
      "Período Mínimo para Estágio Obrigatório",
      "Período Mínimo para Estágio Não Obrigatório",
    ];

    const data = [
      "1",
      "Arthur Luiz Braun Krauser de Moura (2024102020023)",
      "Empresa Fantasma",
      "99.999.999/9999-99",
      "2291377",
      "20/04/2026",
      "22/06/2026",
      "Em Andamento/Em Fase Inicial",
      "20",
      "3",
      "2",
      "1",
    ];

    const csv = [headers.map(quoteIfNeeded).join(","), data.map(quoteIfNeeded).join(",")].join(
      "\n",
    );

    const result = await controller.importCsv(accessContext, {
      buffer: Buffer.from(csv, "utf8"),
    } as Express.Multer.File);

    expect(createHandler.execute).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      total: 1,
      created: 0,
      skipped: 0,
      failed: 1,
      items: [
        {
          line: 2,
          estagiarioNome: "Arthur Luiz Braun Krauser de Moura",
          status: "failed",
          reason: "Empresa não encontrada para o CNPJ 99.999.999/9999-99.",
        },
      ],
    });
  });
});
