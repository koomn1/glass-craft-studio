export type Lead = { name: string; contact: string; need: string };

export function leadText(l: Lead) {
  return `New enquiry from the portfolio assistant\nName: ${l.name.trim()}\nContact: ${l.contact.trim()}\nNeed: ${l.need.trim()}`;
}

export function buildLeadLinks(l: Lead) {
  const text = encodeURIComponent(leadText(l));
  return {
    whatsapp: `https://wa.me/201018995002?text=${text}`,
    email: `mailto:yo01009950871@gmail.com?subject=${encodeURIComponent("Project enquiry — " + l.name.trim())}&body=${text}`,
  };
}
