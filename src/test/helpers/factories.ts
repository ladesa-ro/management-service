import { v7 as uuidv7 } from "uuid";
import type { IAccessContext } from "@/domain/abstractions";
import type { IRequestActor } from "@/domain/abstractions/request-actor";

/**
 * Generates a valid UUID v7 for testing.
 */
export function createTestId(): string {
  return uuidv7();
}

/**
 * Generates a fixed ISO date string for deterministic tests.
 */
export function createTestDate(offset = 0): string {
  return new Date(Date.UTC(2026, 0, 1, 0, 0, 0, offset)).toISOString();
}

/**
 * Creates a mock IRequestActor for testing.
 */
export function createTestRequestActor(
  overrides: Partial<NonNullable<IRequestActor>> = {},
): NonNullable<IRequestActor> {
  return {
    id: createTestId(),
    nome: "Test User",
    matricula: "20260001",
    email: "test@example.com",
    isSuperUser: false,
    ...overrides,
  };
}

/**
 * Creates a mock IAccessContext for testing application handlers.
 */
export function createTestAccessContext(
  requestActor: IRequestActor = createTestRequestActor(),
): IAccessContext {
  return { requestActor };
}

/**
 * Creates a mock IAccessContext with superuser privileges.
 */
export function createTestSuperUserAccessContext(): IAccessContext {
  return createTestAccessContext(createTestRequestActor({ isSuperUser: true }));
}

/**
 * Creates a { id: string } reference object for relation fields.
 */
export function createTestRef(id?: string): { id: string } {
  return { id: id ?? createTestId() };
}

/**
 * Creates a complete set of dated fields for loading entities.
 */
export function createTestDatedFields(offset = 0) {
  return {
    dateCreated: createTestDate(offset),
    dateUpdated: createTestDate(offset + 1),
    dateDeleted: null,
  };
}
