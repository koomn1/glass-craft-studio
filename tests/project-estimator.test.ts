import { describe, expect, test } from "bun:test";
import { projectBriefLinks, projectBriefText } from "../src/lib/project-estimator";

const brief = { type: "AI & Automation", services: ["AI assistant", "Data integration"], budget: 2500, currency: "EGP", name: "Test Visitor", email: "visitor@example.com", notes: "Arabic & English support" };
describe("Project brief handoff", () => {
  test("includes the selected type, services and visitor budget without inventing a quote", () => {
    const text = projectBriefText(brief);
    expect(text).toContain("Project: AI & Automation");
    expect(text).toContain("Services: AI assistant, Data integration");
    expect(text).toContain("Budget: 2,500 EGP");
    expect(text).toContain("Arabic & English support");
  });
  test("WhatsApp handoff targets the owner's phone and carries the full brief", () => {
    const url = new URL(projectBriefLinks(brief).whatsapp);
    expect(url.pathname).toBe("/201018995002");
    expect(url.searchParams.get("text")).toBe(projectBriefText(brief));
  });
  test("email draft targets the owner and preserves the selected scope", () => {
    const url = new URL(projectBriefLinks(brief).email);
    expect(url.pathname).toBe("yo01009950871@gmail.com");
    expect(url.searchParams.get("body")).toBe(projectBriefText(brief));
  });
});