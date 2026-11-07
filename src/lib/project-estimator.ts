export interface ProjectBrief {
  type: string;
  services: string[];
  budget: number;
  currency: string;
  name: string;
  email: string;
  notes: string;
}

export function projectBriefText(brief: ProjectBrief) {
  return ["Project inquiry", `Name: ${brief.name.trim()}`, `Email: ${brief.email.trim() || "Not provided"}`, `Project: ${brief.type}`, `Services: ${brief.services.join(", ") || "None selected"}`, `Budget: ${brief.budget.toLocaleString("en-US")} ${brief.currency}`, `Details: ${brief.notes.trim() || "To be discussed"}`, "Please share a tailored cost estimate for this scope."].join("\n");
}

export function projectBriefLinks(brief: ProjectBrief) {
  const body = encodeURIComponent(projectBriefText(brief));
  return {
    whatsapp: `https://wa.me/201018995002?text=${body}`,
    email: `mailto:yo01009950871@gmail.com?subject=${encodeURIComponent(`Project inquiry — ${brief.type}`)}&body=${body}`,
  };
}