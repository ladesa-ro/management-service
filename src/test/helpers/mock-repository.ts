import { vi } from "vitest";

/**
 * Creates a mock repository implementing the standard CRUD interface.
 * All methods are vi.fn() stubs that can be configured per test.
 */
export function createMockCrudRepository() {
  return {
    findAll: vi.fn().mockResolvedValue({ meta: { itemCount: 0 }, data: [] }),
    findById: vi.fn().mockResolvedValue(null),
    findByIdSimple: vi.fn().mockResolvedValue(null),
    create: vi.fn().mockImplementation(async (data: { id?: string }) => ({
      id: data.id ?? "generated-id",
    })),
    update: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
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
