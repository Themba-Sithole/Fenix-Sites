-- Allow read-only dashboard access for viewer role
create policy "Viewer read clients"
  on public.clients for select to authenticated
  using (public.get_user_role() = 'viewer');

create policy "Viewer read projects"
  on public.projects for select to authenticated
  using (public.get_user_role() = 'viewer');

-- Restrict inquiry management to content staff (read remains open to all authenticated via existing policy)
drop policy if exists "Admin manage inquiries" on public.inquiries;

create policy "Staff read inquiries"
  on public.inquiries for select to authenticated
  using (public.get_user_role() in ('super_admin', 'admin', 'editor'));

create policy "Staff manage inquiries"
  on public.inquiries for all to authenticated
  using (public.get_user_role() in ('super_admin', 'admin', 'editor'))
  with check (public.get_user_role() in ('super_admin', 'admin', 'editor'));
