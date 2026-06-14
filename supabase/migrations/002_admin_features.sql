-- Profiles & roles
create type public.user_role as enum (
  'super_admin', 'admin', 'editor', 'finance', 'viewer'
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role public.user_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'viewer')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create or replace function public.get_user_role()
returns public.user_role as $$
  select role from public.profiles where id = auth.uid()
$$ language sql stable security definer;

alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select to authenticated
  using (id = auth.uid() or public.get_user_role() in ('super_admin', 'admin'));

create policy "Super admin manage profiles"
  on public.profiles for all to authenticated
  using (public.get_user_role() = 'super_admin')
  with check (public.get_user_role() = 'super_admin');

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

insert into public.categories (name, slug, sort_order) values
  ('E-Commerce', 'e-commerce', 1),
  ('Landing Page', 'landing-page', 2),
  ('Web Application', 'web-application', 3),
  ('Mobile App', 'mobile-app', 4),
  ('Brand & Design', 'brand-design', 5),
  ('Corporate Website', 'corporate-website', 6)
on conflict (name) do nothing;

alter table public.categories enable row level security;

create policy "Public read categories"
  on public.categories for select using (true);

create policy "Staff manage categories"
  on public.categories for all to authenticated
  using (public.get_user_role() in ('super_admin', 'admin', 'editor'))
  with check (public.get_user_role() in ('super_admin', 'admin', 'editor'));

-- Finance records
create table if not exists public.finance_records (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null check (type in ('invoice', 'expense', 'payment')),
  amount numeric(12, 2) not null,
  currency text not null default 'ZAR',
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'overdue', 'cancelled')),
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  due_date date,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists finance_records_updated_at on public.finance_records;
create trigger finance_records_updated_at
  before update on public.finance_records
  for each row execute function public.set_updated_at();

alter table public.finance_records enable row level security;

create policy "Finance staff manage records"
  on public.finance_records for all to authenticated
  using (public.get_user_role() in ('super_admin', 'admin', 'finance'))
  with check (public.get_user_role() in ('super_admin', 'admin', 'finance'));

-- Messaging
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  inquiry_id uuid references public.inquiries(id) on delete set null,
  subject text,
  participant_name text not null,
  participant_phone text,
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete set null,
  body text not null,
  is_outbound boolean not null default true,
  created_at timestamptz not null default now()
);

drop trigger if exists conversations_updated_at on public.conversations;
create trigger conversations_updated_at
  before update on public.conversations
  for each row execute function public.set_updated_at();

alter table public.conversations enable row level security;
alter table public.messages enable row level security;

create policy "Staff manage conversations"
  on public.conversations for all to authenticated
  using (public.get_user_role() in ('super_admin', 'admin', 'editor'))
  with check (public.get_user_role() in ('super_admin', 'admin', 'editor'));

create policy "Staff manage messages"
  on public.messages for all to authenticated
  using (public.get_user_role() in ('super_admin', 'admin', 'editor'))
  with check (public.get_user_role() in ('super_admin', 'admin', 'editor'));

-- Project gallery images
create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  is_cover boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.project_images enable row level security;

create policy "Public read project images"
  on public.project_images for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.published = true
    )
  );

create policy "Staff manage project images"
  on public.project_images for all to authenticated
  using (public.get_user_role() in ('super_admin', 'admin', 'editor'))
  with check (public.get_user_role() in ('super_admin', 'admin', 'editor'));

-- Storage bucket for project photos
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

create policy "Public read project images storage"
  on storage.objects for select
  using (bucket_id = 'project-images');

create policy "Staff upload project images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'project-images'
    and public.get_user_role() in ('super_admin', 'admin', 'editor')
  );

create policy "Staff update project images storage"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'project-images'
    and public.get_user_role() in ('super_admin', 'admin', 'editor')
  );

create policy "Staff delete project images storage"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'project-images'
    and public.get_user_role() in ('super_admin', 'admin', 'editor')
  );

-- Update existing RLS to be role-aware for core tables
drop policy if exists "Admin manage clients" on public.clients;
drop policy if exists "Admin manage projects" on public.projects;

create policy "Staff manage clients"
  on public.clients for all to authenticated
  using (public.get_user_role() in ('super_admin', 'admin', 'editor'))
  with check (public.get_user_role() in ('super_admin', 'admin', 'editor'));

create policy "Staff manage projects"
  on public.projects for all to authenticated
  using (public.get_user_role() in ('super_admin', 'admin', 'editor'))
  with check (public.get_user_role() in ('super_admin', 'admin', 'editor'));

create policy "Finance read clients"
  on public.clients for select to authenticated
  using (public.get_user_role() = 'finance');

create policy "Finance read projects"
  on public.projects for select to authenticated
  using (public.get_user_role() = 'finance');

create index if not exists finance_records_type_idx on public.finance_records (type, status);
create index if not exists messages_conversation_idx on public.messages (conversation_id, created_at);
create index if not exists project_images_project_idx on public.project_images (project_id, sort_order);
