import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — Dr. Youssef Badawy" },
      { name: "description", content: "Choose a new admin password." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Reset password — Dr. Youssef Badawy" },
      { property: "og:description", content: "Choose a new admin password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ThemeProvider><Reset /></ThemeProvider>,
});

function Reset() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <div dir="rtl" className="grid min-h-screen place-items-center px-4">
      <form className="glass-strong w-full max-w-sm space-y-4 rounded-3xl p-6" onSubmit={async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.updateUser({ password: pw });
        if (error) setErr(error.message); else navigate({ to: "/admin", replace: true });
      }}>
        <h1 className="text-xl font-semibold">كلمة مرور جديدة</h1>
        <Input type="password" dir="ltr" minLength={8} required value={pw} onChange={(e) => setPw(e.target.value)} />
        {err && <p className="text-sm text-destructive">{err}</p>}
        <Button type="submit" className="w-full rounded-full">حفظ</Button>
      </form>
    </div>
  );
}
