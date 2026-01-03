create table if not exists public.beta_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.beta_signups enable row level security;

create policy "allow_insert_beta_signups"
  on public.beta_signups
  for insert
  with check (true);
