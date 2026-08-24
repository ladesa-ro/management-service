import { describe, expect, it } from "vitest";
import { createTestId } from "@/test/helpers";
import {
  type IAcessoParaResolucao,
  resolverPapelEfetivo,
} from "./calendario-colecao-acesso-resolver";

describe("resolverPapelEfetivo (domain, pure function)", () => {
  const dono = createTestId();
  const outro = createTestId();
  const campusAtivo = createTestId();
  const campusInativo = createTestId();

  function acessoUsuario(
    papel: IAcessoParaResolucao["papel"],
    usuarioId: string,
  ): IAcessoParaResolucao {
    return { escopo: "USUARIO", papel, usuarioId, campusId: null };
  }

  function acessoCampus(
    papel: IAcessoParaResolucao["papel"],
    campusId: string,
  ): IAcessoParaResolucao {
    return { escopo: "CAMPUS", papel, usuarioId: null, campusId };
  }

  function acessoPublico(papel: IAcessoParaResolucao["papel"]): IAcessoParaResolucao {
    return { escopo: "PUBLICO", papel, usuarioId: null, campusId: null };
  }

  const baseParams = {
    colecaoDonoId: dono,
    acessos: [] as IAcessoParaResolucao[],
    usuarioId: outro,
    isSuperUser: false,
    camposAtivosDoUsuario: [campusAtivo],
  };

  it("returns EDITOR immediately for a superuser, regardless of everything else", () => {
    const result = resolverPapelEfetivo({
      ...baseParams,
      isSuperUser: true,
      acessos: [],
      usuarioId: outro,
    });
    expect(result).toBe("EDITOR");
  });

  it("returns EDITOR for a superuser even if they would otherwise have no access", () => {
    const result = resolverPapelEfetivo({
      colecaoDonoId: dono,
      acessos: [],
      usuarioId: createTestId(),
      isSuperUser: true,
      camposAtivosDoUsuario: [],
    });
    expect(result).toBe("EDITOR");
  });

  it("returns EDITOR for the dono, even with no grants", () => {
    const result = resolverPapelEfetivo({ ...baseParams, usuarioId: dono, acessos: [] });
    expect(result).toBe("EDITOR");
  });

  it("returns null when not superuser, not dono, and there are no grants at all", () => {
    const result = resolverPapelEfetivo({ ...baseParams, acessos: [] });
    expect(result).toBeNull();
  });

  describe("escopo USUARIO", () => {
    for (const papel of ["OCUPACAO", "LEITOR", "EDITOR"] as const) {
      it(`grants ${papel} when there is a matching USUARIO-scoped acesso`, () => {
        const result = resolverPapelEfetivo({
          ...baseParams,
          acessos: [acessoUsuario(papel, outro)],
        });
        expect(result).toBe(papel);
      });
    }

    it("does not grant access when the USUARIO-scoped acesso targets a different user", () => {
      const result = resolverPapelEfetivo({
        ...baseParams,
        acessos: [acessoUsuario("EDITOR", createTestId())],
      });
      expect(result).toBeNull();
    });
  });

  describe("escopo CAMPUS", () => {
    for (const papel of ["OCUPACAO", "LEITOR", "EDITOR"] as const) {
      it(`grants ${papel} when there is a matching CAMPUS-scoped acesso for an active campus`, () => {
        const result = resolverPapelEfetivo({
          ...baseParams,
          acessos: [acessoCampus(papel, campusAtivo)],
        });
        expect(result).toBe(papel);
      });
    }

    it("does not grant access when the CAMPUS-scoped acesso targets a campus the user is not active in", () => {
      const result = resolverPapelEfetivo({
        ...baseParams,
        acessos: [acessoCampus("EDITOR", campusInativo)],
      });
      expect(result).toBeNull();
    });

    it("does not grant access when the user has no active campus at all", () => {
      const result = resolverPapelEfetivo({
        ...baseParams,
        camposAtivosDoUsuario: [],
        acessos: [acessoCampus("EDITOR", campusAtivo)],
      });
      expect(result).toBeNull();
    });
  });

  describe("escopo PUBLICO", () => {
    for (const papel of ["OCUPACAO", "LEITOR", "EDITOR"] as const) {
      it(`grants ${papel} to anyone via a PUBLICO acesso`, () => {
        const result = resolverPapelEfetivo({
          ...baseParams,
          acessos: [acessoPublico(papel)],
        });
        expect(result).toBe(papel);
      });
    }
  });

  describe("most permissive wins across simultaneous grants", () => {
    it("USUARIO=OCUPACAO + CAMPUS=LEITOR + PUBLICO=EDITOR -> EDITOR", () => {
      const result = resolverPapelEfetivo({
        ...baseParams,
        acessos: [
          acessoUsuario("OCUPACAO", outro),
          acessoCampus("LEITOR", campusAtivo),
          acessoPublico("EDITOR"),
        ],
      });
      expect(result).toBe("EDITOR");
    });

    it("USUARIO=EDITOR + PUBLICO=OCUPACAO -> EDITOR (usuario wins over publico)", () => {
      const result = resolverPapelEfetivo({
        ...baseParams,
        acessos: [acessoUsuario("EDITOR", outro), acessoPublico("OCUPACAO")],
      });
      expect(result).toBe("EDITOR");
    });

    it("CAMPUS=EDITOR + PUBLICO=LEITOR -> EDITOR (campus wins over publico)", () => {
      const result = resolverPapelEfetivo({
        ...baseParams,
        acessos: [acessoCampus("EDITOR", campusAtivo), acessoPublico("LEITOR")],
      });
      expect(result).toBe("EDITOR");
    });

    it("PUBLICO=EDITOR + USUARIO=OCUPACAO -> EDITOR (publico can be the most permissive)", () => {
      const result = resolverPapelEfetivo({
        ...baseParams,
        acessos: [acessoPublico("EDITOR"), acessoUsuario("OCUPACAO", outro)],
      });
      expect(result).toBe("EDITOR");
    });

    it("two USUARIO-scoped grants for the same user (defensive) -> highest wins", () => {
      const result = resolverPapelEfetivo({
        ...baseParams,
        acessos: [acessoUsuario("OCUPACAO", outro), acessoUsuario("LEITOR", outro)],
      });
      expect(result).toBe("LEITOR");
    });

    it("dono with only an OCUPACAO grant elsewhere still resolves to EDITOR (dono status wins)", () => {
      const result = resolverPapelEfetivo({
        ...baseParams,
        usuarioId: dono,
        acessos: [acessoPublico("OCUPACAO")],
      });
      expect(result).toBe("EDITOR");
    });

    it("irrelevant grants (other users, inactive campus) are ignored alongside a matching one", () => {
      const result = resolverPapelEfetivo({
        ...baseParams,
        acessos: [
          acessoUsuario("EDITOR", createTestId()),
          acessoCampus("EDITOR", campusInativo),
          acessoUsuario("LEITOR", outro),
        ],
      });
      expect(result).toBe("LEITOR");
    });
  });

  it("superuser ignores every other grant and stays EDITOR", () => {
    const result = resolverPapelEfetivo({
      colecaoDonoId: dono,
      usuarioId: outro,
      isSuperUser: true,
      camposAtivosDoUsuario: [],
      acessos: [acessoUsuario("OCUPACAO", outro)],
    });
    expect(result).toBe("EDITOR");
  });
});
