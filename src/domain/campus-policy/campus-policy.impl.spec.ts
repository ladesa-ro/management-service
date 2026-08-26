// src/domain/campus-policy/campus-policy.impl.spec.ts

import { ForbiddenException } from "@nestjs/common";
import { AccessContext } from "@/server/nest/access-context/access-context";
import { CampusPolicyImpl } from "./campus-policy.impl";

describe("CampusPolicyImpl", () => {
  const policy = new CampusPolicyImpl();

  it("permite quando campus coincidem", () => {
    const ctx = new AccessContext(null as any, null, "c1");
    expect(() => policy.enforce("c1", ctx)).not.toThrow();
  });

  it("ignora quando campus do recurso é undefined", () => {
    const ctx = new AccessContext(null as any, null, "c1");
    expect(() => policy.enforce(undefined, ctx)).not.toThrow();
    expect(() => policy.enforce(null, ctx)).not.toThrow();
  });

  it("lança ForbiddenException quando usuário sem campus", () => {
    const ctx = new AccessContext(null as any, null, null);
    expect(() => policy.enforce("c1", ctx)).toThrow(ForbiddenException);
  });

  it("lança ForbiddenException quando campuses divergem", () => {
    const ctx = new AccessContext(null as any, null, "c1");
    expect(() => policy.enforce("c2", ctx)).toThrow(ForbiddenException);
  });
});
