import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import {
  createMockAgendamentoRepository,
  createMockColecaoSyncService,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoImportarIcsCommandHandlerImpl } from "./calendario-agendamento-importar-ics.command.handler";

function createHandler(
  overrides: {
    repository?: object;
    permissionChecker?: object;
    colecaoSyncService?: object;
  } = {},
) {
  const repository = overrides.repository ?? createMockAgendamentoRepository();
  const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
  const colecaoSyncService = overrides.colecaoSyncService ?? createMockColecaoSyncService();

  const handler = new CalendarioAgendamentoImportarIcsCommandHandlerImpl(
    repository as any,
    permissionChecker as any,
    colecaoSyncService as any,
  );

  return { handler, repository, permissionChecker, colecaoSyncService };
}

function icsComUmEvento(overridesLinhas: string[] = []): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "UID:evento-simples@teste",
    "DTSTART:20260315T140000",
    "DTEND:20260315T153000",
    "SUMMARY:Reuniao Importada",
    "DESCRIPTION:Motivo da reuniao",
    ...overridesLinhas,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

describe("CalendarioAgendamentoImportarIcsCommandHandler", () => {
  it("should create one agendamento per valid VEVENT", async () => {
    const repository = createMockAgendamentoRepository();
    const { handler } = createHandler({ repository });

    const result = await handler.execute(createTestAccessContext(), {
      conteudo: icsComUmEvento(),
    });

    expect(result.criados).toBe(1);
    expect(result.puladosPorUidDuplicado).toBe(0);
    expect(result.rejeitados).toHaveLength(0);
    expect(repository.save).toHaveBeenCalledOnce();

    const salvo = repository.save.mock.calls[0][0] as CalendarioAgendamento;
    expect(salvo.dataInicio).toBe("2026-03-15");
    expect(salvo.horarioInicio).toBe("14:00:00");
    expect(salvo.horarioFim).toBe("15:30:00");
    expect(salvo.motivo).toBe("Motivo da reuniao");

    expect(repository.saveMetadata).toHaveBeenCalledOnce();
    const metadataSalva = repository.saveMetadata.mock.calls[0][0];
    expect(metadataSalva.nome).toBe("Reuniao Importada");
  });

  it("should create the agendamento without turmas/perfis/ambientes (no academic links from .ics)", async () => {
    const repository = createMockAgendamentoRepository();
    const { handler } = createHandler({ repository });

    await handler.execute(createTestAccessContext(), { conteudo: icsComUmEvento() });

    const salvo = repository.save.mock.calls[0][0] as CalendarioAgendamento;
    expect(salvo.turmas).toEqual([]);
    expect(salvo.perfis).toEqual([]);
    expect(salvo.ambientes).toEqual([]);
    expect(salvo.diarios).toEqual([]);
  });

  it("should pass campus/colecao from the command through to created agendamentos", async () => {
    const repository = createMockAgendamentoRepository();
    const { handler } = createHandler({ repository });

    const campusId = createTestId();
    const colecaoId = createTestId();

    await handler.execute(createTestAccessContext(), {
      conteudo: icsComUmEvento(),
      campus: { id: campusId },
      colecao: { id: colecaoId },
    });

    const salvo = repository.save.mock.calls[0][0] as CalendarioAgendamento;
    expect(salvo.campus).toEqual({ id: campusId });
    expect(salvo.colecao).toEqual({ id: colecaoId });
  });

  it("should register a colecao sync change only when colecao is provided", async () => {
    const colecaoId = createTestId();
    const repository = createMockAgendamentoRepository();
    const colecaoSyncService = createMockColecaoSyncService();
    const { handler } = createHandler({ repository, colecaoSyncService });

    await handler.execute(createTestAccessContext(), {
      conteudo: icsComUmEvento(),
      colecao: { id: colecaoId },
    });

    expect(colecaoSyncService.registrarMudanca).toHaveBeenCalledWith({
      colecaoId,
      agendamentoId: expect.any(String),
      tipoOperacao: "importar-ics",
    });
  });

  it("should not register a colecao sync change without colecao", async () => {
    const repository = createMockAgendamentoRepository();
    const colecaoSyncService = createMockColecaoSyncService();
    const { handler } = createHandler({ repository, colecaoSyncService });

    await handler.execute(createTestAccessContext(), { conteudo: icsComUmEvento() });

    expect(colecaoSyncService.registrarMudanca).not.toHaveBeenCalled();
  });

  describe("idempotencia por UID", () => {
    it("should skip a VEVENT whose UID (a valid UUID) already exists as identificadorExterno", async () => {
      const uidExistente = createTestId();
      const repository = createMockAgendamentoRepository();
      repository.existsByIdentificadorExterno.mockResolvedValue(true);

      const { handler } = createHandler({ repository });

      const conteudo = icsComUmEvento([`UID:${uidExistente}`]).replace(
        "UID:evento-simples@teste\r\n",
        "",
      );

      const result = await handler.execute(createTestAccessContext(), { conteudo });

      expect(result.criados).toBe(0);
      expect(result.puladosPorUidDuplicado).toBe(1);
      expect(repository.save).not.toHaveBeenCalled();
    });

    it("should reuse the UID as identificadorExterno when it is a valid UUID and does not exist yet", async () => {
      const uidNovo = createTestId();
      const repository = createMockAgendamentoRepository();
      repository.existsByIdentificadorExterno.mockResolvedValue(false);

      const { handler } = createHandler({ repository });

      const conteudo = icsComUmEvento([`UID:${uidNovo}`]).replace(
        "UID:evento-simples@teste\r\n",
        "",
      );

      await handler.execute(createTestAccessContext(), { conteudo });

      const salvo = repository.save.mock.calls[0][0] as CalendarioAgendamento;
      expect(salvo.identificadorExterno).toBe(uidNovo);
    });

    it("should always create when the UID is not a valid UUID (e.g. an external calendar UID)", async () => {
      const repository = createMockAgendamentoRepository();
      const { handler } = createHandler({ repository });

      const result = await handler.execute(createTestAccessContext(), {
        conteudo: icsComUmEvento(),
      });

      expect(repository.existsByIdentificadorExterno).not.toHaveBeenCalled();
      expect(result.criados).toBe(1);
    });
  });

  describe("conteudo malformado", () => {
    it("should reject the whole request when BEGIN:VCALENDAR is missing", async () => {
      const { handler } = createHandler();

      await expect(
        handler.execute(createTestAccessContext(), { conteudo: "nao e um ics" }),
      ).rejects.toThrow(BadRequestException);
    });

    it("should report a malformed VEVENT as rejeitado without aborting the rest of the file", async () => {
      const repository = createMockAgendamentoRepository();
      const { handler } = createHandler({ repository });

      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "UID:sem-dtstart@teste",
        "SUMMARY:Sem data",
        "END:VEVENT",
        "BEGIN:VEVENT",
        "UID:com-dtstart@teste",
        "DTSTART:20260315T140000",
        "SUMMARY:Com data",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const result = await handler.execute(createTestAccessContext(), { conteudo });

      expect(result.criados).toBe(1);
      expect(result.rejeitados).toHaveLength(1);
      expect(result.rejeitados[0]!.uid).toBe("sem-dtstart@teste");
      expect(result.rejeitados[0]!.motivo).toMatch(/DTSTART/);
    });

    it("should reject a VEVENT whose DTEND is before its DTSTART (caught by domain validation)", async () => {
      const repository = createMockAgendamentoRepository();
      const { handler } = createHandler({ repository });

      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "UID:dtend-antes@teste",
        "DTSTART:20260315T140000",
        "DTEND:20260310T140000",
        "SUMMARY:Datas invertidas",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const result = await handler.execute(createTestAccessContext(), { conteudo });

      expect(result.criados).toBe(0);
      expect(result.rejeitados).toHaveLength(1);
      expect(result.rejeitados[0]!.uid).toBe("dtend-antes@teste");
      expect(repository.save).not.toHaveBeenCalled();
    });

    it("should report a save failure as rejeitado instead of aborting the batch", async () => {
      const repository = createMockAgendamentoRepository();
      repository.save.mockRejectedValueOnce(new Error("violação de FK: campus inexistente"));

      const { handler } = createHandler({ repository });

      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "UID:falha@teste",
        "DTSTART:20260315T140000",
        "SUMMARY:Vai falhar",
        "END:VEVENT",
        "BEGIN:VEVENT",
        "UID:sucesso@teste",
        "DTSTART:20260316T140000",
        "SUMMARY:Vai funcionar",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const result = await handler.execute(createTestAccessContext(), { conteudo });

      expect(result.criados).toBe(1);
      expect(result.rejeitados).toHaveLength(1);
      expect(result.rejeitados[0]!.uid).toBe("falha@teste");
      expect(result.rejeitados[0]!.motivo).toMatch(/campus inexistente/);
    });
  });

  it("should call ensureCanCreate with the command's colecao", async () => {
    const colecaoId = createTestId();
    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ permissionChecker });

    await handler.execute(createTestAccessContext(), {
      conteudo: icsComUmEvento(),
      colecao: { id: colecaoId },
    });

    expect(permissionChecker.ensureCanCreate).toHaveBeenCalledWith(expect.anything(), {
      dto: { colecao: { id: colecaoId } },
    });
  });
});
