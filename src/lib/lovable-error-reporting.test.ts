import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { reportLovableError } from "./lovable-error-reporting";

describe("reportLovableError", () => {
  const captureException = vi.fn();

  beforeEach(() => {
    captureException.mockReset();
    window.__lovableEvents = { captureException };
    window.history.replaceState({}, "", "/some/route");
  });

  afterEach(() => {
    delete window.__lovableEvents;
  });

  it("forwards the error with default context and options", () => {
    const error = new Error("kaboom");
    reportLovableError(error);

    expect(captureException).toHaveBeenCalledTimes(1);
    const [passedError, context, options] = captureException.mock.calls[0];
    expect(passedError).toBe(error);
    expect(context).toMatchObject({
      source: "react_error_boundary",
      route: "/some/route",
    });
    expect(options).toEqual({
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    });
  });

  it("merges caller-supplied context", () => {
    reportLovableError(new Error("x"), { userId: "42" });
    const [, context] = captureException.mock.calls[0];
    expect(context).toMatchObject({ userId: "42", source: "react_error_boundary" });
  });

  it("lets caller context override defaults", () => {
    reportLovableError(new Error("x"), { source: "custom" });
    const [, context] = captureException.mock.calls[0];
    expect(context.source).toBe("custom");
  });

  it("does nothing when the lovable events hook is absent", () => {
    delete window.__lovableEvents;
    expect(() => reportLovableError(new Error("x"))).not.toThrow();
    expect(captureException).not.toHaveBeenCalled();
  });

  it("does nothing when captureException is not provided", () => {
    window.__lovableEvents = {};
    expect(() => reportLovableError(new Error("x"))).not.toThrow();
    expect(captureException).not.toHaveBeenCalled();
  });
});
