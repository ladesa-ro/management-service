import { type INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { ICampusCreateCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-create.command.handler.interface";
import { ICampusDeleteCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-delete.command.handler.interface";
import { ICampusUpdateCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { ICampusListQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-list.query.handler.interface";
import { CampusRestController } from "@/modules/ambientes/campus/presentation.rest/campus.rest.controller";
import { createE2ETestApp, TEST_AUTH_TOKEN } from "./helpers/e2e-app.helper";
import { createTestDatedFields, createTestId } from "./helpers/factories";

describe("CampusRestController (e2e)", () => {
  let app: INestApplication;

  const sampleCampusId = createTestId();

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

  const listHandler = {
    execute: vi.fn().mockResolvedValue({
      meta: {
        itemsPerPage: 10,
        totalItems: 1,
        currentPage: 1,
        totalPages: 1,
        sortBy: [["nomeFantasia", "ASC"]],
      },
      data: [sampleCampus],
    }),
  };

  const findOneHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, query) => {
      if (query.id === sampleCampusId) {
        return sampleCampus;
      }
      return null;
    }),
  };

  const createHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, command) => {
      return {
        id: createTestId(),
        ...command,
        endereco: {
          ...sampleEndereco,
          id: createTestId(),
          ...command.endereco,
          cidade: sampleCidade,
        },
        ...createTestDatedFields(),
      };
    }),
  };

  const updateHandler = {
    execute: vi.fn().mockImplementation(async (_ctx, command) => {
      return {
        ...sampleCampus,
        ...command,
        endereco: sampleEndereco,
      };
    }),
  };

  const deleteHandler = {
    execute: vi.fn().mockResolvedValue(true),
  };

  beforeAll(async () => {
    app = await createE2ETestApp({
      controllers: [CampusRestController],
      providers: [
        { provide: ICampusListQueryHandler, useValue: listHandler },
        { provide: ICampusFindOneQueryHandler, useValue: findOneHandler },
        { provide: ICampusCreateCommandHandler, useValue: createHandler },
        { provide: ICampusUpdateCommandHandler, useValue: updateHandler },
        { provide: ICampusDeleteCommandHandler, useValue: deleteHandler },
      ],
    });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("GET /campi requires authentication (401)", async () => {
    await request(app.getHttpServer()).get("/campi").expect(401);
  });

  it("GET /campi returns list with authentication (200)", async () => {
    const res = await request(app.getHttpServer())
      .get("/campi")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("meta");
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].id).toBe(sampleCampusId);
    expect(res.body.data[0].nomeFantasia).toBe("Campus Ji-Paraná");
  });

  it("GET /campi/:id returns 404 when campus does not exist", async () => {
    const nonExistentId = createTestId();
    await request(app.getHttpServer())
      .get(`/campi/${nonExistentId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(404);
  });

  it("GET /campi/:id returns campus when found (200)", async () => {
    const res = await request(app.getHttpServer())
      .get(`/campi/${sampleCampusId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.body.id).toBe(sampleCampusId);
    expect(res.body.nomeFantasia).toBe("Campus Ji-Paraná");
    expect(res.body.cnpj).toBe("10817343000105");
  });

  it("POST /campi rejects invalid payload (422)", async () => {
    const res = await request(app.getHttpServer())
      .post("/campi")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send({ nomeFantasia: "Incompleto" })
      .expect(422);

    expect(res.body).toBeDefined();
    expect(res.body.statusCode).toBe(422);
  });

  it("POST /campi creates campus with valid payload (201)", async () => {
    const newCampusPayload = {
      nomeFantasia: "Campus Porto Velho Calama",
      razaoSocial: "IFRO Calama",
      apelido: "PVH-CALAMA",
      cnpj: "10817343000288",
      endereco: {
        cep: "76820-441",
        logradouro: "Av. Tiradentes",
        numero: 3001,
        bairro: "Industrial",
        complemento: null,
        pontoReferencia: null,
        cidade: { id: 1 },
      },
    };

    const res = await request(app.getHttpServer())
      .post("/campi")
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send(newCampusPayload)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.nomeFantasia).toBe("Campus Porto Velho Calama");
    expect(createHandler.execute).toHaveBeenCalled();
  });

  it("PATCH /campi/:id updates campus (200)", async () => {
    const updatePayload = {
      nomeFantasia: "Campus Ji-Paraná Atualizado",
    };

    const res = await request(app.getHttpServer())
      .patch(`/campi/${sampleCampusId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .send(updatePayload)
      .expect(200);

    expect(res.body.nomeFantasia).toBe("Campus Ji-Paraná Atualizado");
    expect(updateHandler.execute).toHaveBeenCalled();
  });

  it("DELETE /campi/:id deletes campus (200)", async () => {
    const res = await request(app.getHttpServer())
      .delete(`/campi/${sampleCampusId}`)
      .set("Authorization", `Bearer ${TEST_AUTH_TOKEN}`)
      .expect(200);

    expect(res.text).toBe("true");
    expect(deleteHandler.execute).toHaveBeenCalled();
  });
});
