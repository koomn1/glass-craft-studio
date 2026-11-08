export const CONTACT = {
  name: "Youssef Badawy", first: "Youssef", last: "Badawy",
  title: "Veterinarian · Marketing & AI Specialist",
  phone: "+201018995002", email: "yo01009950871@gmail.com",
  whatsapp: "201018995002", city: "Kafr El-Sheikh", country: "Egypt",
  url: "https://jo-badawy.lovable.app",
};

export function buildVCard() {
  const c = CONTACT;
  return [
    "BEGIN:VCARD", "VERSION:3.0", `N:${c.last};${c.first};;Dr.;`, `FN:Dr. ${c.name}`, `TITLE:${c.title}`,
    `TEL;TYPE=CELL:${c.phone}`, `EMAIL;TYPE=INTERNET:${c.email}`, `ADR;TYPE=HOME:;;;${c.city};;;${c.country}`,
    `URL:${c.url}`, "END:VCARD",
  ].join("\n");
}

export function downloadVCard() {
  const blob = new Blob([buildVCard()], { type: "text/vcard" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Youssef-Badawy.vcf";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
