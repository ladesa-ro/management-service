import { vi } from "vitest";

/**
 * Creates a mock repository for old-style repos (create/update pattern).
 * Read side: getFindOneQueryResult, getFindAllQueryResult.
 * All methods are vi.fn() stubs that can be configured per test.
 */
export function createMockCrudRepository() {
  return {
    getFindAllQueryResult: vi.fn().mockResolvedValue({ meta: { itemCount: 0 }, data: [] }),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    findByIdSimple: vi.fn().mockResolvedValue(null),
    create: vi.fn().mockImplementation(async (data: { id?: string }) => ({
      id: data.id ?? "generated-id",
    })),
    update: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
  };
}

/**
 * Creates a mock repository implementing the CQRS interface.
 * Write side: loadById, save, softDeleteById
 * Read side: getFindOneQueryResult, getFindAllQueryResult
 */
export function createMockCqrsRepository() {
  return {
    loadById: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    getFindAllQueryResult: vi.fn().mockResolvedValue({ meta: { itemCount: 0 }, data: [] }),
  };
}

/**
 * Creates a mock permission checker where all ensureCan* methods resolve.
 */
export function createMockPermissionChecker() {
  return {
    ensureCanCreate: vi.fn().mockResolvedValue(undefined),
    ensureCanRead: vi.fn().mockResolvedValue(undefined),
    ensureCanUpdate: vi.fn().mockResolvedValue(undefined),
    ensureCanDelete: vi.fn().mockResolvedValue(undefined),
  };
}
