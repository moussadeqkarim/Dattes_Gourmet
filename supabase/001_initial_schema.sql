-- Initial schema for the artisan dates storefront.
-- Run this in the Supabase SQL Editor after creating your project.

create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";
create schema if not exists private;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'flavor_category') then
    create type public.flavor_category as enum ('classic', 'exotic');
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_method') then
    create type public.payment_method as enum ('bank_transfer', 'cash_on_delivery');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.boxes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  pieces integer not null check (pieces > 0),
  price_mad integer not null check (price_mad > 0),
  description text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.flavors (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category public.flavor_category not null,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_reference text not null unique,
  customer_name text not null check (char_length(trim(customer_name)) >= 2),
  whatsapp text not null check (char_length(trim(whatsapp)) >= 6),
  instagram_handle text,
  delivery_address text not null check (char_length(trim(delivery_address)) >= 4),
  box_id uuid references public.boxes(id) on delete set null,
  box_name text not null,
  box_price_mad integer not null check (box_price_mad > 0),
  classic_flavors text[] not null default '{}',
  exotic_flavors text[] not null default '{}',
  payment_method public.payment_method not null,
  special_instructions text,
  total_mad integer not null check (total_mad > 0),
  currency text not null default 'MAD' check (currency = 'MAD'),
  status text not null default 'new' check (status in ('new', 'pending', 'confirmed', 'cancelled')),
  whatsapp_message text not null default '',
  is_paid boolean not null default false,
  is_fulfilled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders add column if not exists order_reference text;
with numbered_orders as (
  select
    id,
    'DG-' || lpad((row_number() over (order by created_at, id))::text, 6, '0') as generated_reference
  from public.orders
  where order_reference is null
)
update public.orders
set order_reference = numbered_orders.generated_reference
from numbered_orders
where orders.id = numbered_orders.id;
alter table public.orders alter column order_reference set not null;
create unique index if not exists orders_order_reference_idx on public.orders(order_reference);
alter table public.orders add column if not exists currency text default 'MAD';
update public.orders set currency = 'MAD' where currency is null;
alter table public.orders alter column currency set not null;
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'orders_currency_check'
      and conrelid = 'public.orders'::regclass
  ) then
    alter table public.orders add constraint orders_currency_check check (currency = 'MAD');
  end if;
end $$;
alter table public.orders add column if not exists status text default 'new';
update public.orders set status = 'new' where status is null;
alter table public.orders alter column status set not null;
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'orders_status_check'
      and conrelid = 'public.orders'::regclass
  ) then
    alter table public.orders add constraint orders_status_check check (status in ('new', 'pending', 'confirmed', 'cancelled'));
  end if;
end $$;
alter table public.orders add column if not exists whatsapp_message text default '';
update public.orders set whatsapp_message = '' where whatsapp_message is null;
alter table public.orders alter column whatsapp_message set not null;

create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists orders_customer_name_idx on public.orders using gin (customer_name gin_trgm_ops);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

insert into public.boxes (slug, name, pieces, price_mad, description) values
  ('box-6-pieces', 'Box 6 pièces', 6, 90, 'Une première attention raffinée, idéale pour découvrir nos créations.'),
  ('box-8-pieces', 'Box 8 pièces', 8, 120, 'Un petit coffret précieux pour partager un moment doux et élégant.'),
  ('box-12-pieces', 'Box 12 pièces', 12, 190, 'La sélection signature pour varier les textures et les parfums.'),
  ('box-16-pieces', 'Box 16 pièces', 16, 230, 'Un format généreux pour les réunions de famille et les beaux cadeaux.'),
  ('box-18-pieces', 'Box 18 pièces', 18, 270, 'Un assortiment luxueux pour les amateurs de dattes gourmandes.'),
  ('box-25-pieces', 'Box 25 pièces', 25, 350, 'Un coffret de fête, pensé pour recevoir avec chaleur et distinction.'),
  ('box-30-pieces', 'Box 30 pièces', 30, 430, 'Une grande dégustation pour explorer toute la richesse du menu.'),
  ('box-35-pieces', 'Box 35 pièces', 35, 480, 'Un coffret d''exception pour les grandes occasions et les cadeaux premium.'),
  ('box-55-pieces-2kg', 'Box 55 pièces (2kg)', 55, 750, 'Le coffret prestige, une abondance élégante pour une table mémorable.')
on conflict (slug) do update set
  name = excluded.name,
  pieces = excluded.pieces,
  price_mad = excluded.price_mad,
  description = excluded.description,
  is_active = true;

insert into public.flavors (name, category) values
  ('Praliné Amande', 'classic'),
  ('Pâte d''amande à la fleur d''oranger', 'classic'),
  ('Praliné Noisette', 'classic'),
  ('Praliné Gianduja', 'classic'),
  ('Noix', 'classic'),
  ('Pistache', 'classic'),
  ('Acajou', 'classic'),
  ('Nougatine Amande', 'classic'),
  ('Noix de coco façon Bounty', 'classic'),
  ('Cacahuète façon Snickers', 'classic'),
  ('Crunchy speculos', 'classic'),
  ('Selou au caramel beurre salé', 'classic'),
  ('Pâte à la Framboise', 'exotic'),
  ('Pâte à la Mangue', 'exotic'),
  ('Crème citron', 'exotic')
on conflict (name) do update set
  category = excluded.category,
  is_active = true;

alter table public.profiles enable row level security;
alter table public.boxes enable row level security;
alter table public.flavors enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
on public.profiles for select
to authenticated
using (id = auth.uid());

drop policy if exists "Profiles are editable by owner" on public.profiles;
create policy "Profiles are editable by owner"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "Boxes are publicly readable" on public.boxes;
create policy "Boxes are publicly readable"
on public.boxes for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Flavors are publicly readable" on public.flavors;
create policy "Flavors are publicly readable"
on public.flavors for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Anyone can create an order" on public.orders;
create policy "Anyone can create an order"
on public.orders for insert
to anon, authenticated
with check (is_paid = false and is_fulfilled = false and status in ('new', 'pending'));

drop policy if exists "Admins can read orders" on public.orders;
create policy "Admins can read orders"
on public.orders for select
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_admin = true
  )
);

drop policy if exists "Admins can update orders" on public.orders;
create policy "Admins can update orders"
on public.orders for update
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_admin = true
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_admin = true
  )
);

grant usage on schema public to anon, authenticated;
grant select on public.boxes, public.flavors to anon, authenticated;
grant insert on public.orders to anon, authenticated;
grant select, update on public.orders to authenticated;
grant select, update on public.profiles to authenticated;

-- After creating your first admin user in Supabase Auth, run:
-- update public.profiles set is_admin = true where email = 'admin@example.com';
