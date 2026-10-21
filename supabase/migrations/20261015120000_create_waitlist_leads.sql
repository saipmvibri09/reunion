create table if not exists public.waitlist_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null check (char_length(first_name) between 2 and 60),
  email text not null check (char_length(email) <= 254),
  crew_name text check (crew_name is null or char_length(crew_name) <= 80),
  crew_size text not null check (crew_size in ('solo', '2_4', '5_9', '10_plus')),
  affiliation_type text not null check (
    affiliation_type in ('school', 'college', 'first_job', 'hostel', 'neighbourhood', 'other')
  ),
  affiliation_name text check (affiliation_name is null or char_length(affiliation_name) <= 80),
  email_consent boolean not null check (email_consent = true),
  privacy_version text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text
);

create unique index if not exists waitlist_leads_email_unique
  on public.waitlist_leads (lower(email));

alter table public.waitlist_leads enable row level security;

revoke all on table public.waitlist_leads from anon, authenticated;
grant insert on table public.waitlist_leads to service_role;

comment on table public.waitlist_leads is
  'Private, server-written pre-launch leads for the Reunion festival.';
