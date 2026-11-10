import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SpatialBackdrop } from "@/components/spatial/spatial-backdrop";
import { ICONS, type PortfolioItem, type PortfolioKind } from "@/lib/portfolio";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin dashboard — Dr. Youssef Badawy" },
      { name: "description", content: "Manage portfolio projects and videos." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin dashboard — Dr. Youssef Badawy" },
      { property: "og:description", content: "Manage portfolio projects and videos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ThemeProvider><AdminPage /></ThemeProvider>,
});

type Draft = Partial<PortfolioItem> & { kind: PortfolioKind };

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<PortfolioKind>("project");
  const [editing, setEditing] = useState<Draft | null>(null);

  const me = useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return { email: "", admin: false };
      const { data } = await supabase.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
      return { email: u.user.email ?? "", admin: !!data };
    },
  });

  const items = useQuery({
    queryKey: ["admin-items"],
    enabled: !!me.data?.admin,
    queryFn: async () => {
      const { data, error } = await supabase.from("portfolio_items").select("*").order("sort_order").order("created_at");
      if (error) throw error;
      return data;
    },
  });

  const refresh = () => { qc.invalidateQueries({ queryKey: ["admin-items"] }); qc.invalidateQueries({ queryKey: ["portfolio"] }); };

  const signOut = async () => {
    await qc.cancelQueries(); qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (me.isLoading) return <Shell><p className="p-10 text-center text-muted-foreground">جارِ التحميل…</p></Shell>;
  if (!me.data?.admin) return (
    <Shell>
      <div className="glass mx-auto max-w-md rounded-3xl p-6 text-center">
        <h1 className="text-xl font-semibold">مفيش صلاحية أدمن</h1>
        <p className="mt-2 text-sm text-muted-foreground">الحساب {me.data?.email} مش حساب الأدمن.</p>
        <Button className="mt-4 rounded-full" onClick={signOut}>تسجيل خروج</Button>
      </div>
    </Shell>
  );

  const list = (items.data ?? []).filter((i) => i.kind === tab);

  const toggle = async (it: PortfolioItem) => {
    const { error } = await supabase.from("portfolio_items").update({ published: !it.published }).eq("id", it.id);
    if (error) return toast.error(error.message);
    refresh();
  };
  const remove = async (it: PortfolioItem) => {
    if (!confirm(`حذف "${it.title}"؟`)) return;
    const { error } = await supabase.from("portfolio_items").delete().eq("id", it.id);
    if (error) return toast.error(error.message);
    toast.success("اتحذف"); refresh();
  };
  const move = async (i: number, d: -1 | 1) => {
    const a = list[i], b = list[i + d];
    if (!a || !b) return;
    const sa = a.sort_order === b.sort_order ? i + d : b.sort_order;
    const sb = a.sort_order === b.sort_order ? i : a.sort_order;
    const r = await Promise.all([
      supabase.from("portfolio_items").update({ sort_order: sa }).eq("id", a.id),
      supabase.from("portfolio_items").update({ sort_order: sb }).eq("id", b.id),
    ]);
    const err = r.find((x) => x.error)?.error;
    if (err) toast.error(err.message);
    refresh();
  };

  return (
    <Shell>
      <header className="glass-strong flex flex-wrap items-center justify-between gap-3 rounded-3xl px-5 py-4">
        <div>
          <h1 className="text-xl font-semibold">لوحة التحكم</h1>
          <p className="text-xs text-muted-foreground" dir="ltr">{me.data.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="rounded-full"><Link to="/"><ExternalLink className="h-4 w-4" /> الموقع</Link></Button>
          <ThemeToggle />
          <Button variant="outline" size="sm" className="rounded-full" onClick={signOut}><LogOut className="h-4 w-4" /> خروج</Button>
        </div>
      </header>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="glass inline-flex rounded-full p-1" role="tablist">
          {([["project", "المشاريع"], ["video", "الفيديوهات"]] as const).map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
              {l} ({(items.data ?? []).filter((i) => i.kind === k).length})
            </button>
          ))}
        </div>
        <Button className="rounded-full" onClick={() => setEditing({ kind: tab, icon: tab === "video" ? "play" : "sparkles", published: true, sort_order: (list.at(-1)?.sort_order ?? 0) + 1 })}>
          <Plus className="h-4 w-4" /> إضافة {tab === "project" ? "مشروع" : "فيديو"}
        </Button>
      </div>

      <ul className="mt-4 space-y-3">
        {items.isLoading && <li className="text-center text-muted-foreground">جارِ التحميل…</li>}
        {!items.isLoading && list.length === 0 && <li className="glass rounded-3xl p-6 text-center text-muted-foreground">لسه مفيش عناصر هنا.</li>}
        {list.map((it, i) => {
          const Icon = ICONS[it.icon] ?? ICONS.sparkles;
          return (
            <li key={it.id} className={`glass flex flex-wrap items-center gap-3 rounded-3xl p-4 ${it.published ? "" : "opacity-60"}`}>
              <span className="glass-subtle grid h-10 w-10 shrink-0 place-items-center rounded-2xl"><Icon className="h-5 w-5 text-primary" /></span>
              <div className="min-w-0 flex-1" dir="auto">
                <p className="truncate font-semibold">{it.title}</p>
                <p className="truncate text-xs text-muted-foreground">{it.tag} · {it.description}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" aria-label="لفوق" disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" aria-label="لتحت" disabled={i === list.length - 1} onClick={() => move(i, 1)}><ArrowDown className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" aria-label={it.published ? "إخفاء" : "إظهار"} onClick={() => toggle(it)}>{it.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</Button>
                <Button size="icon" variant="ghost" aria-label="تعديل" onClick={() => setEditing({ ...it, kind: it.kind as PortfolioKind })}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" aria-label="حذف" className="text-destructive" onClick={() => remove(it)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </li>
          );
        })}
      </ul>

      <EditDialog draft={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); refresh(); }} />
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" className="relative min-h-screen">
      <SpatialBackdrop />
      <main className="relative mx-auto max-w-4xl px-3 py-6 sm:px-4">{children}</main>
    </div>
  );
}

const lines = (v: string) => v.split("\n").map((s) => s.trim()).filter(Boolean);

function EditDialog({ draft, onClose, onSaved }: { draft: Draft | null; onClose: () => void; onSaved: () => void }) {
  return (
    <Dialog open={!!draft} onOpenChange={(o) => !o && onClose()}>
      <DialogContent dir="rtl" className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {draft && <EditForm key={draft.id ?? "new"} draft={draft} onSaved={onSaved} />}
      </DialogContent>
    </Dialog>
  );
}

function EditForm({ draft, onSaved }: { draft: Draft; onSaved: () => void }) {
  const [f, setF] = useState({
    title: draft.title ?? "", tag: draft.tag ?? "", icon: draft.icon ?? "sparkles",
    description: draft.description ?? "", long_desc: draft.long_desc ?? "",
    challenge: draft.challenge ?? "", solution: draft.solution ?? "",
    highlights: (draft.highlights ?? []).join("\n"), technologies: (draft.technologies ?? []).join("\n"),
    link: draft.link ?? "", published: draft.published ?? true,
  });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (f.link && !/^https?:\/\//i.test(f.link)) return toast.error("الرابط لازم يبدأ بـ https://");
    setBusy(true);
    const row = {
      kind: draft.kind, title: f.title.trim(), tag: f.tag.trim(), icon: f.icon,
      description: f.description.trim(), long_desc: f.long_desc.trim() || null,
      challenge: f.challenge.trim() || null, solution: f.solution.trim() || null,
      highlights: lines(f.highlights), technologies: lines(f.technologies),
      link: f.link.trim() || null, published: f.published, sort_order: draft.sort_order ?? 0,
    };
    const { error } = draft.id
      ? await supabase.from("portfolio_items").update(row).eq("id", draft.id)
      : await supabase.from("portfolio_items").insert(row);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("اتحفظ وظهر على الموقع"); onSaved();
  };

  return (
    <form onSubmit={save} className="space-y-3">
      <DialogHeader><DialogTitle>{draft.id ? "تعديل" : "إضافة"} {draft.kind === "project" ? "مشروع" : "فيديو"}</DialogTitle></DialogHeader>
      <Field label="العنوان"><Input required maxLength={120} value={f.title} onChange={set("title")} dir="auto" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={draft.kind === "video" ? "النوع والمدة (مثال: Film · 6:40)" : "التصنيف (مثال: React · AI)"}><Input maxLength={60} value={f.tag} onChange={set("tag")} dir="auto" /></Field>
        <Field label="الأيقونة">
          <select value={f.icon} onChange={set("icon")} className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm">
            {Object.keys(ICONS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </Field>
      </div>
      <Field label="وصف قصير"><Textarea required maxLength={300} rows={2} value={f.description} onChange={set("description")} dir="auto" /></Field>
      <Field label="تفاصيل كاملة"><Textarea maxLength={2000} rows={3} value={f.long_desc} onChange={set("long_desc")} dir="auto" /></Field>
      <Field label="التحدي"><Textarea maxLength={1000} rows={2} value={f.challenge} onChange={set("challenge")} dir="auto" /></Field>
      <Field label="الحل"><Textarea maxLength={1000} rows={2} value={f.solution} onChange={set("solution")} dir="auto" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="أهم النقاط (سطر لكل نقطة)"><Textarea rows={3} value={f.highlights} onChange={set("highlights")} dir="auto" /></Field>
        <Field label="التقنيات (سطر لكل تقنية)"><Textarea rows={3} value={f.technologies} onChange={set("technologies")} dir="auto" /></Field>
      </div>
      <Field label="رابط (اختياري — لينك الفيديو أو المشروع)"><Input type="url" dir="ltr" value={f.link} onChange={set("link")} placeholder="https://" /></Field>
      <label className="flex items-center justify-between rounded-2xl border border-border/60 px-3 py-2 text-sm">
        ظاهر على الموقع <Switch checked={f.published} onCheckedChange={(v) => setF({ ...f, published: v })} />
      </label>
      <Button type="submit" disabled={busy} className="w-full rounded-full">{busy ? "..." : "حفظ"}</Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1"><Label className="text-xs">{label}</Label>{children}</div>;
}
