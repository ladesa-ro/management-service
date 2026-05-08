import { describe, expect, it } from "vitest";
import { parseUsuarioImportCsv } from "./usuario-import-csv.helper";

describe("parseUsuarioImportCsv", () => {
  it("should parse quoted CSV rows and extract personal email", () => {
    const csv = [
      "#,Nome,Matrícula,Curso,Campus,Polo,Situação,E-mail Acadêmico,E-mail Pessoal,Ano/Periodo Letivo",
      '1,Ana Clara,202610200001,"Curso com, vírgula",JIPARANA,None,Matriculado,,ana.clara@gmail.com,2026.1',
    ].join("\n");

    const result = parseUsuarioImportCsv(csv);

    expect(result.totalRows).toBe(1);
    expect(result.skipped).toHaveLength(0);
    expect(result.entries).toEqual([
      {
        line: 2,
        nome: "Ana Clara",
        matricula: "202610200001",
        emailPessoal: "ana.clara@gmail.com",
        curso: "Curso com, vírgula",
        campus: "JIPARANA",
        situacao: "Matriculado",
      },
    ]);
  });

  it("should skip rows without e-mail pessoal", () => {
    const csv = [
      "#,Nome,Matrícula,Curso,Campus,Polo,Situação,E-mail Acadêmico,E-mail Pessoal,Ano/Periodo Letivo",
      "1,Bruno Lima,202610200002,Curso,JIPARANA,None,Matriculado,bruno@ifro.edu.br,,2026.1",
    ].join("\n");

    const result = parseUsuarioImportCsv(csv);

    expect(result.entries).toHaveLength(0);
    expect(result.skipped).toEqual([
      {
        line: 2,
        reason: "Linha sem e-mail pessoal obrigatório. Usuário ignorado.",
      },
    ]);
  });

  it("should fail when required headers are missing", () => {
    const csv = ["Nome,Matrícula,E-mail Acadêmico", "Ana,202610200001,ana@ifro.edu.br"].join("\n");

    expect(() => parseUsuarioImportCsv(csv)).toThrow(
      "CSV inválido: colunas obrigatórias ausentes (E-mail Pessoal).",
    );
  });
});
