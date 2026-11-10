create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- Grant admin automatically to the owner's email on signup
create or replace function public.grant_owner_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if lower(new.email) = 'yo01009950871@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end $$;
create trigger on_auth_user_created_grant_admin after insert on auth.users
for each row execute function public.grant_owner_admin();

create table public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'project',
  icon text not null default 'sparkles',
  title text not null,
  tag text not null default '',
  description text not null default '',
  long_desc text,
  challenge text,
  solution text,
  highlights text[] not null default '{}',
  technologies text[] not null default '{}',
  link text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.portfolio_items to anon;
grant select, insert, update, delete on public.portfolio_items to authenticated;
grant all on public.portfolio_items to service_role;
alter table public.portfolio_items enable row level security;
create policy "Public reads published" on public.portfolio_items for select to anon, authenticated using (published = true);
create policy "Admins read all" on public.portfolio_items for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins insert" on public.portfolio_items for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update" on public.portfolio_items for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete" on public.portfolio_items for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;
create trigger portfolio_items_touch before update on public.portfolio_items for each row execute function public.touch_updated_at();

insert into public.portfolio_items (kind, icon, title, tag, challenge, description, long_desc, highlights, sort_order) values
('project','brain','Clinical Decision Assistant','LLM · RAG','Make veterinary literature easier to consult while keeping clinical references verifiable.','Retrieval-augmented assistant trained on veterinary literature for differential support.','A retrieval-augmented LLM assistant indexed over peer-reviewed veterinary literature. Surfaces differentials, dosage references, and contraindications with inline citations clinicians can verify in seconds.', array['Citation-first answers','Per-species dosage tables','Offline-capable on the desk','Audit log for every query'],1),
('project','code','Practice Dashboard','React · TanStack','Keep patient history, lab trends and reminders accessible during unreliable clinic connectivity.','Patient timeline, lab trends, and reminders, fully responsive and offline-capable.','A keyboard-first dashboard for small practices. Patient timelines, lab trend charts, automated reminders, and an offline-first cache for spotty clinic Wi-Fi.', array['Realtime sync','Offline-first PWA','Bilingual UI (AR/EN)','Role-based access'],2),
('project','sparkles','Image Triage Model','Vision · ONNX','Support radiograph review with lightweight, advisory anomaly detection.','Lightweight classifier flagging radiograph anomalies for clinician review.','A compact ONNX model running on commodity hardware that flags likely abnormalities on canine and feline radiographs. Always advisory — never the final word.', array['<200ms inference','Confidence thresholds','Heatmap overlays','DICOM-aware import'],3),
('project','workflow','Workflow Automation','n8n · Webhooks','Reduce repetitive intake and follow-up work for the front desk.','Automated intake, follow-ups, and bilingual SMS confirmations.','An n8n graph automating patient intake forms, follow-up reminders, and bilingual SMS confirmations — freeing front-desk hours for actual care.', array['Bilingual templates','Calendar sync','Smart retry on failure','GDPR-friendly logs'],4),
('project','database','Knowledge Graph','Neo4j','Connect species, drugs and conditions for efficient contraindication checks.','Linked drugs, conditions, and species for fast contraindication lookups.','A Neo4j graph linking drugs, conditions, and species. Sub-second contraindication lookups powered by Cypher queries with editorial overrides.', array['10k+ entities','Editorial overrides','GraphQL surface','Versioned snapshots'],5),
('project','cpu','Edge Inference','WebGPU','Let clinic teams prototype inference tools without provisioning a server.','Browser-side inference demos so the clinic team can prototype without a server.','WebGPU demos that run quantized models directly in the browser. Clinic teams prototype tools without provisioning any infrastructure.', array['Zero-install demos','WebGPU + WASM fallback','Quantized weights','Private by default'],6),
('video','play','Case of the Week','Short · 1:24',null,'Bite-sized clinical reasoning for general practitioners.',null,'{}',1),
('video','film','Behind the Surgery','Film · 6:40',null,'A cinematic look at a soft-tissue procedure, narrated step by step.',null,'{}',2),
('video','mic','Vet × Tech Podcast','Audio · 32:11',null,'Conversations on AI tooling in everyday veterinary practice.',null,'{}',3),
('video','camera','Field Notes','Series · ongoing',null,'Rural visits documented with a quiet, observational lens.',null,'{}',4);