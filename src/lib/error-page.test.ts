import { describe, expect, it } from "vitest";

import { renderErrorPage } from "./error-page";

describe("renderErrorPage", () => {
  const html = renderErrorPage();

  it("returns a full HTML document", () => {
    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain('<html lang="en">');
    expect(html).toContain("</html>");
  });

  it("includes the error message copy", () => {
    expect(html).toContain("This page didn't load");
    expect(html).toContain("Something went wrong on our end.");
  });

  it("offers reload and home actions", () => {
    expect(html).toContain("location.reload()");
    expect(html).toContain('href="/"');
    expect(html).toContain("Try again");
    expect(html).toContain("Go home");
  });

  it("is deterministic across calls", () => {
    expect(renderErrorPage()).toBe(html);
  });
});
