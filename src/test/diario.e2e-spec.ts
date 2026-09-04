import { type INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { IDiarioBatchCreateCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-batch-create.command.handler.interface";
import { IDiarioCreateCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import { IDiarioDeleteCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import { IDiarioUpdateCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import { IDiarioUpdateImagemCapaCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-update-imagem-capa.command.handler.interface";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import { IDiarioGetImagemCapaQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-get-imagem-capa.query.handler.interface";
import { IDiarioListQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import { DiarioRestController } from "@/modules/ensino/diario/presentation.rest/diario.rest.controller";
import { createE2ETestApp, TEST_AUTH_TOKEN } from "./helpers/e2e-app.helper";
import { createTestDatedFields, createTestId } from "./helpers/factories";

describe("DiarioRestController (e2e)", () => {
  let app: INestApplication;

  const sampleCampusId = createTestId();
  const sampleCursoId = createTestId();
  const sampleTurmaId = createTestId();
  const sampleCalendarioId = createTestId();
  const sampleDisciplinaId = createTestId();
  const sampleDiarioId = createTestId();

  const sampleCidade = {
    id: 1,
    nome: "Ji-Paraná",
    estado: {
      id: 1,
      nome: "Rondônia",
      sigla: "RO",
      ...createTestDatedFields(),
    },
    ...createTestDatedFields(),
  };

  const sampleEndereco = {
    id: createTestId(),
    cep: "76900-000",
    logradouro: "Rua Rio Solimões",
    numero: 100,
    bairro: "Jardim dos Migrantes",
    complemento: null,
    pontoReferencia: null,
    cidade: sampleCidade,
    ...createTestDatedFields(),
  };

  const sampleCampus = {
    id: sampleCampusId,
    nomeFantasia: "Campus Ji-Paraná",
    razaoSocial: "Instituto Federal de Rondônia",
    apelido: "JIPA",
    cnpj: "10817343000105",
    endereco: sampleEndereco,
    ...createTestDatedFields(),
  };

  const sampleModalidade = {
    id: createTestId(),
    nome: "Presencial",
    slug: "presencial",
    ...createTestDatedFields(),
  };

  const sampleOfertaFormacao = {
    id: createTestId(),
    nome: "Integrado",
    slug: "integrado",
    duracaoPeriodoEmMeses: 6,
    modalidade: sampleModalidade,
    campus: sampleCampus,
    niveisFormacoes: [],
    periodos: [],
    imagemCapa: null,
    ...createTestDatedFields(),
  };

  const sampleCurso = {
    id: sampleCursoId,
    nome: "Técnico em Informática",
    nomeAbreviado: "TINF",
    quantidadePeriodos: 6,
    campus: sampleCampus,
    ofertaFormacao: sampleOfertaFormacao,
    imagemCapa: null,
    colecaoPadrao: null,
    periodos: [],
    ...createTestDatedFields(),
  };

  const sampleTurma = {
    id: sampleTurmaId,
    periodo: "1",
    nome: "1A",
    curso: sampleCurso,
    ambientePadraoAula: null,
    imagemCapa: null,
    numeroEstimadoAlunos: 35,
    ...createTestDatedFields(),
  };

  const sampleCalendarioLetivo = {
    id: sampleCalendarioId,
    nome: "Calendário 2026",
    ano: 2026,
    campus: sampleCampus,
    ofertaFormacao: sampleOfertaFormacao,
    situacao: "aberto",
    etapas: [],
    ...createTestDatedFields(),
  };

  const sampleDisciplina = {
    id: sampleDisciplinaId,
    nome: "Algoritmos e Estruturas de Dados",
    nomeAbreviado: "AED",
    cargaHoraria: 80,
    ...createTestDatedFields(),
  };

  const sampleDiario = {
    id: sampleDiarioId,
    ativo: true,
    calendarioLetivo: sampleCalendarioLetivo,
    turma: sampleTurma,
    disciplina: sampleDisciplina,
    ambientePadrao: null,
    imagemCapa: null,
    ...createTestDatedFields(),
  };

  const listHandler = {
    execute: vi.fn().mockResolvedValue({
      meta: {
        itemsPerPage: 10,
        totalItems: 1,
        currentPage: 1,
        totalPages: 1,
        sortBy: [["ativo", "DESC"]],
      },
      data: [sampleDiario],
    }),
  };

  const findOneHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, query) => {
      if (query.id === sampleDiarioId) {
        return sampleDiario;
      }
      return null;
    }),
  };

  const createHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, command) => {
      return {
        id: createTestId(),
        ...command,
        ativo: command.ativo ?? true,
        calendarioLetivo: sampleCalendarioLetivo,
        turma: sampleTurma,
        disciplina: sampleDisciplina,
        ambientePadrao: null,
        imagemCapa: null,
        ...createTestDatedFields(),
      };
    }),
  };

  const updateHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, command) => {
      return {
        ...sampleDiario,
        ...command,
        calendarioLetivo: sampleCalendarioLetivo,
        turma: sampleTurma,
        disciplina: sampleDisciplina,
      };
    }),
  };

  const deleteHandler = {
    execute: vi.fn().mockResolvedValue(true),
  };

  beforeAll(async () => {
    app = await createE2ETestApp({
      controllers: [DiarioRestController],
      providers: [
        { provide: IDiarioListQueryHandler, useValue: listHandler },
        { provide: IDiarioFindOneQueryHandler, useValue: findOneHandler },
        { provide: IDiarioCreateCommandHandler, useValue: createHandler },
        { provide: IDiarioBatchCreateCommandHandler, useValue: { execute: vi.fn() } },
        { provide: IDiarioUpdateCommandHandler, useValue: updateHandler },
        { provide: IDiarioDeleteCommandHandler, useValue: deleteHandler },
        { provide: IDiarioGetImagemCapaQueryHandler, useValue: { execute: vi.fn() } },
        { provide: IDiarioUpdateImagemCapaCommandHandler, useValue: { execute: vi.fn() } },
      ],
    });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("GET /diarios requires authentication (401)", async () => {
    await request(app.getHttpServer()).get("/diarios").expect(401);
  });

  it("GET /diarios returns list with authentication (200)", async () => {
    const res = await request(app.getHttpServer())
      .get("/diarios")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("meta");
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].id).toBe(sampleDiarioId);
    expect(res.body.data[0].ativo).toBe(true);
  });

  it("GET /diarios/:id returns 404 when diario does not exist", async () => {
    const nonExistentId = createTestId();
    await request(app.getHttpServer())
      .get(`/diarios/${nonExistentId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(404);
  });

  it("GET /diarios/:id returns diario when found (200)", async () => {
    const res = await request(app.getHttpServer())
      .get(`/diarios/${sampleDiarioId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.body.id).toBe(sampleDiarioId);
    expect(res.body.ativo).toBe(true);
    expect(res.body.disciplina.nome).toBe("Algoritmos e Estruturas de Dados");
  });

  it("POST /diarios rejects invalid payload (422)", async () => {
    const res = await request(app.getHttpServer())
      .post("/diarios")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send({ ativo: true }) // missing turma, disciplina, calendarioLetivo
      .expect(422);

    expect(res.body).toBeDefined();
    expect(res.body.statusCode).toBe(422);
  });

  it("POST /diarios creates diario with valid payload (201)", async () => {
    const newDiarioPayload = {
      ativo: true,
      calendarioLetivo: { id: sampleCalendarioId },
      turma: { id: sampleTurmaId },
      disciplina: { id: sampleDisciplinaId },
    };

    const res = await request(app.getHttpServer())
      .post("/diarios")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send(newDiarioPayload)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.ativo).toBe(true);
    expect(createHandler.execute).toHaveBeenCalled();
  });

  it("PATCH /diarios/:id updates diario (200)", async () => {
    const updatePayload = {
      ativo: false,
    };

    const res = await request(app.getHttpServer())
      .patch(`/diarios/${sampleDiarioId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send(updatePayload)
      .expect(200);

    expect(res.body.ativo).toBe(false);
    expect(updateHandler.execute).toHaveBeenCalled();
  });

  it("DELETE /diarios/:id deletes diario (200)", async () => {
    const res = await request(app.getHttpServer())
      .delete(`/diarios/${sampleDiarioId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.text).toBe("true");
    expect(deleteHandler.execute).toHaveBeenCalled();
  });
});
