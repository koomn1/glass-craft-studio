import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeProvider } from "@/components/theme-provider";
import { SpatialBackdrop } from "@/components/spatial/spatial-backdrop";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin sign in — Dr. Youssef Badawy" },
      { name: "description", content: "Private sign-in for the portfolio admin dashboard." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin sign in — Dr. Youssef Badawy" },
      { property: "og:description", content: "Private sign-in for the portfolio admin dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ThemeProvider><AuthPage /></ThemeProvider>,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "reset">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (data.user) navigate({ to: "/admin", replace: true }); });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      } else if (mode === "up") {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
        if (error) throw error;
        if (data.session) navigate({ to: "/admin", replace: true });
        else setMsg({ ok: true, text: "تم إنشاء الحساب. افتح الإيميل واضغط رابط التأكيد، ثم سجّل الدخول." });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMsg({ ok: true, text: "بعتنا رابط تغيير كلمة المرور على الإيميل." });
      }
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "حصل خطأ" });
    } finally { setBusy(false); }
  };

  return (
    <div dir="rtl" className="relative grid min-h-screen place-items-center px-4">
      <SpatialBackdrop />
      <form onSubmit={submit} className="glass-strong relative w-full max-w-sm space-y-4 rounded-3xl p-6 shadow-xl">
        <div>
          <h1 className="text-2xl font-semibold">لوحة التحكم</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "in" ? "سجّل الدخول لإدارة المشاريع والفيديوهات." : mode === "up" ? "إنشاء حساب الأدمن لأول مرة." : "استعادة كلمة المرور."}
          </p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">الإيميل</Label>
          <Input id="email" type="email" dir="ltr" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
        {mode !== "reset" && (
          <div className="space-y-1.5">
            <Label htmlFor="pw">كلمة المرور</Label>
            <Input id="pw" type="password" dir="ltr" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "up" ? "new-password" : "current-password"} />
          </div>
        )}
        {msg && <p role="status" className={msg.ok ? "text-sm text-primary" : "text-sm text-destructive"}>{msg.text}</p>}
        <Button type="submit" disabled={busy} className="w-full rounded-full">
          {busy ? "..." : mode === "in" ? "دخول" : mode === "up" ? "إنشاء الحساب" : "إرسال الرابط"}
        </Button>
        <div className="flex flex-wrap justify-between gap-2 text-xs">
          {mode !== "in" ? <button type="button" className="underline" onClick={() => setMode("in")}>عندي حساب</button>
            : <button type="button" className="underline" onClick={() => setMode("up")}>أول مرة؟ أنشئ الحساب</button>}
          {mode === "in" && <button type="button" className="underline" onClick={() => setMode("reset")}>نسيت كلمة المرور</button>}
        </div>
        <Link to="/" className="block text-center text-xs text-muted-foreground underline">الرجوع للموقع</Link>
      </form>
    </div>
  );
}
