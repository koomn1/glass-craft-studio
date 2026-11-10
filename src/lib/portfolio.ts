import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Brain, Code2, Sparkles, Workflow, Database, Cpu, Play, Film, Mic, Camera, PawPrint, Rocket, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import type { ProjectDetail } from "@/components/project-modal";

export type PortfolioItem = Tables<"portfolio_items">;
export type PortfolioKind = "project" | "video";

export const ICONS: Record<string, LucideIcon> = {
  brain: Brain, code: Code2, sparkles: Sparkles, workflow: Workflow, database: Database, cpu: Cpu,
  play: Play, film: Film, mic: Mic, camera: Camera, paw: PawPrint, rocket: Rocket,
};

export function toDetail(it: PortfolioItem): ProjectDetail {
  return {
    icon: ICONS[it.icon] ?? Sparkles,
    title: it.title,
    tag: it.tag,
    desc: it.description,
    longDesc: it.long_desc ?? it.description,
    challenge: it.challenge ?? undefined,
    solution: it.solution ?? undefined,
    highlights: it.highlights.length ? it.highlights : undefined,
    technologies: it.technologies.length ? it.technologies : undefined,
    link: it.link ?? undefined,
  };
}

export const portfolioKey = (kind: PortfolioKind) => ["portfolio", kind] as const;

/** Public list of published items, refreshed live when the admin edits. */
export function usePortfolio(kind: PortfolioKind) {
  const qc = useQueryClient();
  useEffect(() => {
    const ch = supabase
      .channel(`portfolio-${kind}-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "portfolio_items" }, () =>
        qc.invalidateQueries({ queryKey: ["portfolio"] }),
      )
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [kind, qc]);
  return useQuery({
    queryKey: portfolioKey(kind),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items").select("*")
        .eq("kind", kind).eq("published", true)
        .order("sort_order").order("created_at");
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: true,
  });
}
