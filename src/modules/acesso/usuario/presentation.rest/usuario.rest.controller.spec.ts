import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { UsuarioRestController } from "./usuario.rest.controller";

function createController() {
  const createHandler = {
    execute: vi.fn().mockResolvedValue({ id: createTestId() }),
  };
  const findByMatriculaHandler = {
    execute: vi.fn().mockResolvedValue(null),
  };
  const campusListHandler = { execute: vi.fn().mockResolvedValue({ data: [] }) };
  const definirPerfisAtivosHandler = { execute: vi.fn().mockResolvedValue({}) };

  const controller = new UsuarioRestController(
    {} as any,
    {} as any,
    {} as any,
    createHandler as any,
    findByMatriculaHandler as any,
    {} as any,
    {} as any,
    {} as any,
    {} as any,
    {} as any,
    {} as any,
    {} as any,
    {} as any,
    campusListHandler as any,
    definirPerfisAtivosHandler as any,
  );

  return { controller, createHandler, findByMatriculaHandler, definirPerfisAtivosHandler };
}

describe("UsuarioRestController.importCsv", () => {
  it("should create users using the personal e-mail column", async () => {
    const { controller, createHandler } = createController();
    const accessContext = createTestAccessContext();

    const csv = [
      "#,Nome,Matrícula,Curso,Campus,Polo,Situação,E-mail Acadêmico,E-mail Pessoal,Ano/Periodo Letivo",
      '1,Ana Clara,202610200001,"Curso com, vírgula",JIPARANA,None,Matriculado,ana@ifro.edu.br,ana.clara@gmail.com,2026.1',
    ].join("\n");

    const result = await controller.importCsv(accessContext, {
      buffer: Buffer.from(csv, "utf8"),
    } as Express.Multer.File);

    expect(createHandler.execute).toHaveBeenCalledOnce();
    expect(createHandler.execute).toHaveBeenCalledWith(accessContext, {
      nome: "Ana Clara",
      matricula: "202610200001",
      email: "ana.clara@gmail.com",
    });
    expect(result).toMatchObject({
      total: 1,
      created: 1,
      skipped: 0,
      failed: 0,
    });
  });

  it("should create profile when user already exists locally after create failure", async () => {
    const { controller, createHandler, findByMatriculaHandler, definirPerfisAtivosHandler } =
      createController();
    const accessContext = createTestAccessContext();
    const usuarioId = createTestId();

    createHandler.execute.mockRejectedValue(new Error("Erro ao cadastrar usuario."));
    findByMatriculaHandler.execute.mockResolvedValue({ id: usuarioId });

    const csv = [
      "#,Nome,Matrícula,Curso,Campus,Polo,Situação,E-mail Acadêmico,E-mail Pessoal,Ano/Periodo Letivo",
      '1,Ana Clara,202610200001,0202 - Técnico em Informática Integrado ao Ensino Médio (JI-PARANÁ),JIPARANA,None,Matriculado,ana@ifro.edu.br,ana.clara@gmail.com,2026.1',
    ].join("\n");

    const result = await controller.importCsv(accessContext, {
      buffer: Buffer.from(csv, "utf8"),
    } as Express.Multer.File);

    expect(findByMatriculaHandler.execute).toHaveBeenCalledWith(accessContext, {
      matricula: "202610200001",
    });
    expect(definirPerfisAtivosHandler.execute).toHaveBeenCalledOnce();
    expect(definirPerfisAtivosHandler.execute).toHaveBeenCalledWith(accessContext, {
      vinculos: [{ apelido: "Ana Clara", cargo: "aluno" }],
      usuario: { id: usuarioId },
    });
    expect(result).toMatchObject({
      total: 1,
      created: 1,
      skipped: 0,
      failed: 0,
    });
  });
});
