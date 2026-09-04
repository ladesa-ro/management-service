import { type INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { IHorarioConsultaQueryHandler } from "@/modules/calendario/horario-consulta";
import { ITurmaCreateCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-create.command.handler.interface";
import { ITurmaDeleteCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-delete.command.handler.interface";
import { ITurmaUpdateCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import { ITurmaUpdateImagemCapaCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-update-imagem-capa.command.handler.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { ITurmaGetImagemCapaQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-get-imagem-capa.query.handler.interface";
import { ITurmaListQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
import { ITurmaListEstagiariosQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-list-estagiarios.query.handler.interface";
import { TurmaRestController } from "@/modules/ensino/turma/presentation.rest/turma.rest.controller";
import { createE2ETestApp, TEST_AUTH_TOKEN } from "./helpers/e2e-app.helper";
import { createTestDatedFields, createTestId } from "./helpers/factories";

describe("TurmaRestController (e2e)", () => {
  let app: INestApplication;

  const sampleCampusId = createTestId();
  const sampleCursoId = createTestId();
  const sampleTurmaId = createTestId();

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

  const sampleCurso = {
    id: sampleCursoId,
    nome: "Técnico em Informática",
    nomeAbreviado: "TINF",
    quantidadePeriodos: 6,
    campus: sampleCampus,
    ofertaFormacao: undefined,
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

  const listHandler = {
    execute: vi.fn().mockResolvedValue({
      meta: {
        itemsPerPage: 10,
        totalItems: 1,
        currentPage: 1,
        totalPages: 1,
        sortBy: [["periodo", "ASC"]],
      },
      data: [sampleTurma],
    }),
  };

  const findOneHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, query) => {
      if (query.id === sampleTurmaId) {
        return sampleTurma;
      }
      return null;
    }),
  };

  const createHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, command) => {
      return {
        id: createTestId(),
        ...command,
        curso: sampleCurso,
        ambientePadraoAula: null,
        imagemCapa: null,
        ...createTestDatedFields(),
      };
    }),
  };

  const updateHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, command) => {
      return {
        ...sampleTurma,
        ...command,
        curso: sampleCurso,
      };
    }),
  };

  const deleteHandler = {
    execute: vi.fn().mockResolvedValue(true),
  };

  beforeAll(async () => {
    app = await createE2ETestApp({
      controllers: [TurmaRestController],
      providers: [
        { provide: ITurmaListQueryHandler, useValue: listHandler },
        { provide: ITurmaFindOneQueryHandler, useValue: findOneHandler },
        { provide: ITurmaCreateCommandHandler, useValue: createHandler },
        { provide: ITurmaUpdateCommandHandler, useValue: updateHandler },
        { provide: ITurmaDeleteCommandHandler, useValue: deleteHandler },
        { provide: ITurmaGetImagemCapaQueryHandler, useValue: { execute: vi.fn() } },
        { provide: ITurmaUpdateImagemCapaCommandHandler, useValue: { execute: vi.fn() } },
        { provide: IHorarioConsultaQueryHandler, useValue: { execute: vi.fn() } },
        { provide: ITurmaListEstagiariosQueryHandler, useValue: { execute: vi.fn() } },
      ],
    });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("GET /turmas requires authentication (401)", async () => {
    await request(app.getHttpServer()).get("/turmas").expect(401);
  });

  it("GET /turmas returns list with authentication (200)", async () => {
    const res = await request(app.getHttpServer())
      .get("/turmas")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("meta");
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].id).toBe(sampleTurmaId);
    expect(res.body.data[0].periodo).toBe("1");
  });

  it("GET /turmas/:id returns 404 when turma does not exist", async () => {
    const nonExistentId = createTestId();
    await request(app.getHttpServer())
      .get(`/turmas/${nonExistentId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(404);
  });

  it("GET /turmas/:id returns turma when found (200)", async () => {
    const res = await request(app.getHttpServer())
      .get(`/turmas/${sampleTurmaId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.body.id).toBe(sampleTurmaId);
    expect(res.body.periodo).toBe("1");
    expect(res.body.nome).toBe("1A");
  });

  it("POST /turmas rejects invalid payload (422)", async () => {
    const res = await request(app.getHttpServer())
      .post("/turmas")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send({ periodo: "1" }) // missing curso
      .expect(422);

    expect(res.body).toBeDefined();
    expect(res.body.statusCode).toBe(422);
  });

  it("POST /turmas creates turma with valid payload (201)", async () => {
    const newTurmaPayload = {
      periodo: "2",
      nome: "2B",
      curso: { id: sampleCursoId },
      numeroEstimadoAlunos: 30,
    };

    const res = await request(app.getHttpServer())
      .post("/turmas")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send(newTurmaPayload)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.periodo).toBe("2");
    expect(createHandler.execute).toHaveBeenCalled();
  });

  it("PATCH /turmas/:id updates turma (200)", async () => {
    const updatePayload = {
      periodo: "3",
      nome: "3A",
    };

    const res = await request(app.getHttpServer())
      .patch(`/turmas/${sampleTurmaId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send(updatePayload)
      .expect(200);

    expect(res.body.periodo).toBe("3");
    expect(updateHandler.execute).toHaveBeenCalled();
  });

  it("DELETE /turmas/:id deletes turma (200)", async () => {
    const res = await request(app.getHttpServer())
      .delete(`/turmas/${sampleTurmaId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.text).toBe("true");
    expect(deleteHandler.execute).toHaveBeenCalled();
  });
});
