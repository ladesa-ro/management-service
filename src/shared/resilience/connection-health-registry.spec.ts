import { describe, expect, it } from "vitest";
import { ConnectionHealthRegistry, ConnectionStatus } from "./connection-health-registry";

describe("ConnectionHealthRegistry", () => {
  it("registers a dependency as unavailable by default", () => {
    const registry = new ConnectionHealthRegistry();
    registry.register("db");
    expect(registry.getStatus("db")).toBe(ConnectionStatus.UNAVAILABLE);
    expect(registry.isAvailable("db")).toBe(false);
  });

  it("marks a dependency as healthy", () => {
    const registry = new ConnectionHealthRegistry();
    registry.register("db");
    registry.markHealthy("db");
    expect(registry.getStatus("db")).toBe(ConnectionStatus.HEALTHY);
    expect(registry.isAvailable("db")).toBe(true);
  });

  it("marks a dependency as unavailable with error message", () => {
    const registry = new ConnectionHealthRegistry();
    registry.register("db");
    registry.markHealthy("db");
    registry.markUnavailable("db", "connection refused");

    expect(registry.getStatus("db")).toBe(ConnectionStatus.UNAVAILABLE);

    const entries = registry.getAllEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].lastError).toBe("connection refused");
  });

  it("returns unavailable for unregistered dependencies", () => {
    const registry = new ConnectionHealthRegistry();
    expect(registry.getStatus("unknown")).toBe(ConnectionStatus.UNAVAILABLE);
    expect(registry.isAvailable("unknown")).toBe(false);
  });

  it("auto-registers on markHealthy if not registered", () => {
    const registry = new ConnectionHealthRegistry();
    registry.markHealthy("auto");
    expect(registry.getStatus("auto")).toBe(ConnectionStatus.HEALTHY);
  });

  it("auto-registers on markUnavailable if not registered", () => {
    const registry = new ConnectionHealthRegistry();
    registry.markUnavailable("auto", "error");
    expect(registry.getStatus("auto")).toBe(ConnectionStatus.UNAVAILABLE);
  });

  it("does not overwrite existing entry on duplicate register", () => {
    const registry = new ConnectionHealthRegistry();
    registry.register("db");
    registry.markHealthy("db");
    registry.register("db");
    expect(registry.getStatus("db")).toBe(ConnectionStatus.HEALTHY);
  });

  it("returns all entries with ISO timestamps", () => {
    const registry = new ConnectionHealthRegistry();
    registry.register("db");
    registry.register("broker");
    registry.markHealthy("db");

    const entries = registry.getAllEntries();
    expect(entries).toHaveLength(2);

    const dbEntry = entries.find((e) => e.name === "db");
    const brokerEntry = entries.find((e) => e.name === "broker");

    expect(dbEntry?.status).toBe(ConnectionStatus.HEALTHY);
    expect(brokerEntry?.status).toBe(ConnectionStatus.UNAVAILABLE);
    expect(dbEntry?.lastCheckedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("clears lastError when marked healthy", () => {
    const registry = new ConnectionHealthRegistry();
    registry.markUnavailable("db", "timeout");
    registry.markHealthy("db");

    const entries = registry.getAllEntries();
    expect(entries[0].lastError).toBeUndefined();
  });
});
