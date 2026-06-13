-- Inquiries from contact form (run after schema.sql)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  budget text,
  service text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- Anyone can submit an inquiry
create policy "Public insert inquiries"
  on public.inquiries for insert
  with check (true);

-- Admin full access
create policy "Admin manage inquiries"
  on public.inquiries for all
  to authenticated
  using (true)
  with check (true);

create index if not exists inquiries_status_idx on public.inquiries (status, created_at desc);
