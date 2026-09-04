import { type INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { ICursoCreateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { ICursoDeleteCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import { ICursoUpdateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import { ICursoUpdateImagemCapaCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-update-imagem-capa.command.handler.interface";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import { ICursoGetImagemCapaQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-get-imagem-capa.query.handler.interface";
import { ICursoListQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import { CursoRestController } from "@/modules/ensino/curso/presentation.rest/curso.rest.controller";
import { createE2ETestApp, TEST_AUTH_TOKEN } from "./helpers/e2e-app.helper";
import { createTestDatedFields, createTestId } from "./helpers/factories";

describe("CursoRestController (e2e)", () => {
  let app: INestApplication;

  const sampleCampusId = createTestId();
  const sampleOfertaFormacaoId = createTestId();
  const sampleCursoId = createTestId();

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

  const listHandler = {
    execute: vi.fn().mockResolvedValue({
      meta: {
        itemsPerPage: 10,
        totalItems: 1,
        currentPage: 1,
        totalPages: 1,
        sortBy: [["nome", "ASC"]],
      },
      data: [sampleCurso],
    }),
  };

  const findOneHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, query) => {
      if (query.id === sampleCursoId) {
        return sampleCurso;
      }
      return null;
    }),
  };

  const createHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, command) => {
      return {
        id: createTestId(),
        ...command,
        campus: sampleCampus,
        ofertaFormacao: undefined,
        imagemCapa: null,
        colecaoPadrao: null,
        periodos: [],
        ...createTestDatedFields(),
      };
    }),
  };

  const updateHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, command) => {
      return {
        ...sampleCurso,
        ...command,
        campus: sampleCampus,
      };
    }),
  };

  const deleteHandler = {
    execute: vi.fn().mockResolvedValue(true),
  };

  beforeAll(async () => {
    app = await createE2ETestApp({
      controllers: [CursoRestController],
      providers: [
        { provide: ICursoListQueryHandler, useValue: listHandler },
        { provide: ICursoFindOneQueryHandler, useValue: findOneHandler },
        { provide: ICursoCreateCommandHandler, useValue: createHandler },
        { provide: ICursoUpdateCommandHandler, useValue: updateHandler },
        { provide: ICursoDeleteCommandHandler, useValue: deleteHandler },
        { provide: ICursoGetImagemCapaQueryHandler, useValue: { execute: vi.fn() } },
        { provide: ICursoUpdateImagemCapaCommandHandler, useValue: { execute: vi.fn() } },
      ],
    });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("GET /cursos requires authentication (401)", async () => {
    await request(app.getHttpServer()).get("/cursos").expect(401);
  });

  it("GET /cursos returns list with authentication (200)", async () => {
    const res = await request(app.getHttpServer())
      .get("/cursos")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("meta");
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].id).toBe(sampleCursoId);
    expect(res.body.data[0].nome).toBe("Técnico em Informática");
  });

  it("GET /cursos/:id returns 404 when curso does not exist", async () => {
    const nonExistentId = createTestId();
    await request(app.getHttpServer())
      .get(`/cursos/${nonExistentId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(404);
  });

  it("GET /cursos/:id returns curso when found (200)", async () => {
    const res = await request(app.getHttpServer())
      .get(`/cursos/${sampleCursoId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.body.id).toBe(sampleCursoId);
    expect(res.body.nome).toBe("Técnico em Informática");
    expect(res.body.nomeAbreviado).toBe("TINF");
  });

  it("POST /cursos rejects invalid payload (422)", async () => {
    const res = await request(app.getHttpServer())
      .post("/cursos")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send({ nome: "Incompleto" })
      .expect(422);

    expect(res.body).toBeDefined();
    expect(res.body.statusCode).toBe(422);
  });

  it("POST /cursos creates curso with valid payload (201)", async () => {
    const newCursoPayload = {
      nome: "Engenharia de Software",
      nomeAbreviado: "BES",
      quantidadePeriodos: 8,
      campus: { id: sampleCampusId },
      ofertaFormacao: { id: sampleOfertaFormacaoId },
    };

    const res = await request(app.getHttpServer())
      .post("/cursos")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send(newCursoPayload)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.nome).toBe("Engenharia de Software");
    expect(createHandler.execute).toHaveBeenCalled();
  });

  it("PATCH /cursos/:id updates curso (200)", async () => {
    const updatePayload = {
      nome: "Engenharia de Software Atualizada",
    };

    const res = await request(app.getHttpServer())
      .patch(`/cursos/${sampleCursoId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send(updatePayload)
      .expect(200);

    expect(res.body.nome).toBe("Engenharia de Software Atualizada");
    expect(updateHandler.execute).toHaveBeenCalled();
  });

  it("DELETE /cursos/:id deletes curso (200)", async () => {
    const res = await request(app.getHttpServer())
      .delete(`/cursos/${sampleCursoId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.text).toBe("true");
    expect(deleteHandler.execute).toHaveBeenCalled();
  });
});
