-- Run this in Supabase Dashboard → SQL Editor

-- Clients CRM
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  company text,
  status text not null default 'lead'
    check (status in ('lead', 'active', 'completed', 'inactive')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Portfolio projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  image_url text,
  tags text[] not null default '{}',
  client_id uuid references public.clients(id) on delete set null,
  duration text,
  result text,
  filter_category text not null default 'webapp'
    check (filter_category in ('all', 'ecommerce', 'webapp', 'mobile', 'design')),
  featured boolean not null default false,
  published boolean not null default false,
  live_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists clients_updated_at on public.clients;
create trigger clients_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.clients enable row level security;
alter table public.projects enable row level security;

-- Public can read published projects only
create policy "Public read published projects"
  on public.projects for select
  using (published = true);

-- Authenticated admin full access
create policy "Admin manage clients"
  on public.clients for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin manage projects"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

-- Indexes
create index if not exists projects_published_idx on public.projects (published, sort_order);
create index if not exists projects_featured_idx on public.projects (featured) where featured = true;
create index if not exists clients_status_idx on public.clients (status);
