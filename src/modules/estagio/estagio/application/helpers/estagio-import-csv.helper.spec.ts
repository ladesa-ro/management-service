import { describe, expect, it } from "vitest";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import {
  parseEstagioImportCsv,
  resolveEstagioImportCargaHoraria,
  resolveEstagioImportStatus,
} from "./estagio-import-csv.helper";

describe("parseEstagioImportCsv", () => {
  it("should parse the CSV row and normalize dates and identifiers", () => {
    const headers = [
      "#",
      "Estagiário",
      "Situação de Matrícula",
      "E-mail Pessoal do Estagiário",
      "E-mail Acadêmico do Estagiário",
      "Concedente",
      "Concedente CNPJ",
      "Concedente Endereço",
      "Concedente Bairro",
      "Concedente Cidade",
      "Nome do Supervisor",
      "E-mail do Supervisor",
      "Telefone do Supervisor",
      "Nome do Orientador",
      "Matrícula do Orientador",
      "E-mail do Orientador",
      "Data de Início",
      "Data Prevista de Fim",
      "Status",
      "Visitas Realizadas",
      "Visitas Justificadas",
      "Visitas a Vencer",
      "Visitas Não Realizadas",
      "Resumo de Pendências",
      "Data de Fim",
      "Tem aditivo?",
      "Tipos de Aditivo",
      "Encerramento por",
      "Motivação do Desligamento/ Encerramento",
      "Motivo da Rescisão",
      "Média das Notas de Avaliações Semestrais do Supervisor",
      "C.H. Final",
      "Período de Referência",
      "Período Mínimo para Estágio Obrigatório",
      "Período Mínimo para Estágio Não Obrigatório",
      "Foi/será contratado pela concedente?",
    ];

    const data = [
      "1",
      "Arthur Luiz Braun Krauser de Moura (2024102020023)",
      "Matriculado",
      "artluizkrauser@gmail.com",
      "krauser.m@estudante.ifro.edu.br",
      "INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIAS E TECNOLOGIA DE RONDONIA - IFRO",
      "10.817.343/0002-88",
      "Rua Rio Amazonas 151",
      "Jardim dos Migrantes",
      "JI-PARANÁ / RO",
      "Jefferson Antônio dos Santos",
      "jefferson.santos@ifro.edu.br",
      "699226-0959",
      "Emi Silva de Oliveira",
      "2291377",
      "emi.oliveira@ifro.edu.br",
      "20/04/2026",
      "22/06/2026",
      "Em Andamento/Em Fase Inicial",
      "0",
      "0",
      "1",
      "0",
      "Sem Pendências.",
      "-",
      "Não",
      "",
      "-",
      "-",
      "-",
      "-",
      "0",
      "3",
      "2",
      "1",
      "Não",
    ];

    // Build CSV with proper quoting for fields containing commas
    const csvLines = [
      headers.map((h) => (h.includes(",") ? `"${h}"` : h)).join(","),
      data.map((d) => (d.includes(",") ? `"${d}"` : d)).join(","),
    ].join("\n");

    const result = parseEstagioImportCsv(csvLines);

    expect(result.totalRows).toBe(1);
    expect(result.skipped).toHaveLength(0);
    expect(result.entries).toHaveLength(1);

    const entry = result.entries[0];
    expect(entry).toMatchObject({
      estagiarioNome: "Arthur Luiz Braun Krauser de Moura",
      estagiarioMatricula: "2024102020023",
      concedenteCnpj: "10.817.343/0002-88",
      dataInicio: "2026-04-20",
      dataPrevistaFim: "2026-06-22",
      dataFim: null,
      temAditivo: false,
      status: EstagioStatus.EM_ANDAMENTO,
    });

    expect(resolveEstagioImportCargaHoraria(entry)).toBe(3);
    expect(resolveEstagioImportStatus(entry, true)).toBe(EstagioStatus.EM_ANDAMENTO);
    expect(resolveEstagioImportStatus(entry, false)).toBe(EstagioStatus.EM_FASE_INICIAL);
  });

  it("should reject files without the required headers", () => {
    expect(() => parseEstagioImportCsv("Estagiário\nFulano")).toThrow(
      "CSV inválido: colunas obrigatórias ausentes",
    );
  });
});
