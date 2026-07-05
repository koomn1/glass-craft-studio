import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { consumeLastCapturedError } from "./error-capture";

// The module registers global "error"/"unhandledrejection" listeners on import.
// We drive it by dispatching those events, then assert on what consume returns.

describe("consumeLastCapturedError", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Drain any error captured by a previous test.
    consumeLastCapturedError();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns undefined when nothing has been captured", () => {
    expect(consumeLastCapturedError()).toBeUndefined();
  });

  it("returns the error from a global error event", () => {
    const err = new Error("boom");
    globalThis.dispatchEvent(new ErrorEvent("error", { error: err }));
    expect(consumeLastCapturedError()).toBe(err);
  });

  it("clears the captured error after being consumed once", () => {
    const err = new Error("boom");
    globalThis.dispatchEvent(new ErrorEvent("error", { error: err }));
    expect(consumeLastCapturedError()).toBe(err);
    expect(consumeLastCapturedError()).toBeUndefined();
  });

  it("falls back to the event itself when no error is attached", () => {
    const event = new ErrorEvent("error");
    globalThis.dispatchEvent(event);
    expect(consumeLastCapturedError()).toBe(event);
  });

  it("returns the captured error just before the TTL expires", () => {
    const err = new Error("boom");
    globalThis.dispatchEvent(new ErrorEvent("error", { error: err }));
    vi.advanceTimersByTime(5_000);
    expect(consumeLastCapturedError()).toBe(err);
  });

  it("discards the captured error once the TTL has elapsed", () => {
    const err = new Error("boom");
    globalThis.dispatchEvent(new ErrorEvent("error", { error: err }));
    vi.advanceTimersByTime(5_001);
    expect(consumeLastCapturedError()).toBeUndefined();
  });
});
