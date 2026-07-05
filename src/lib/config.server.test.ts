import { afterEach, describe, expect, it, vi } from "vitest";

import { getServerConfig } from "./config.server";

describe("getServerConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads NODE_ENV from the environment", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(getServerConfig()).toEqual({ nodeEnv: "production" });
  });

  it("reflects a different NODE_ENV value", () => {
    vi.stubEnv("NODE_ENV", "test");
    expect(getServerConfig().nodeEnv).toBe("test");
  });

  it("reads the value lazily on each call", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(getServerConfig().nodeEnv).toBe("development");
    vi.stubEnv("NODE_ENV", "production");
    expect(getServerConfig().nodeEnv).toBe("production");
  });
});
