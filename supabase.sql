create table public.comentarios (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  personaje_id integer not null,
  autor text not null,
  texto text not null check (char_length(texto) between 1 and 280),
  creado_en timestamptz not null default now()
);

alter table public.comentarios enable row level security;

create policy "Usuarios logueados leen comentarios"
  on public.comentarios for select to authenticated
  using (true);

create policy "Cada usuario crea sus comentarios"
  on public.comentarios for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "Cada usuario borra solo los suyos"
  on public.comentarios for delete to authenticated
  using (user_id = (select auth.uid()));

alter publication supabase_realtime add table public.comentarios;