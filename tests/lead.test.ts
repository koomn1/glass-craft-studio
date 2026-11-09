import { expect, test } from "bun:test";
import { buildLeadLinks } from "../src/lib/lead";

test("lead goes to Youssef's WhatsApp and email with the details", () => {
  const l = buildLeadLinks({ name: "Sara", contact: "sara@x.com", need: "Landing page" });
  expect(l.whatsapp.startsWith("https://wa.me/201018995002?text=")).toBe(true);
  expect(decodeURIComponent(l.whatsapp)).toContain("Name: Sara");
  expect(l.email.startsWith("mailto:yo01009950871@gmail.com")).toBe(true);
});
