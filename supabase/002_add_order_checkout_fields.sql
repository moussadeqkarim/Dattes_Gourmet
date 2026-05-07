-- Adds checkout metadata required by the storefront order flow.
-- Safe to run more than once in the Supabase SQL Editor.

alter table public.orders add column if not exists currency text default 'MAD';
update public.orders set currency = 'MAD' where currency is null;
alter table public.orders alter column currency set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'orders_currency_check'
      and conrelid = 'public.orders'::regclass
  ) then
    alter table public.orders
      add constraint orders_currency_check check (currency = 'MAD');
  end if;
end $$;

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

alter table public.orders add column if not exists status text default 'new';
update public.orders set status = 'new' where status is null;
alter table public.orders alter column status set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'orders_status_check'
      and conrelid = 'public.orders'::regclass
  ) then
    alter table public.orders
      add constraint orders_status_check check (status in ('new', 'pending', 'confirmed', 'cancelled'));
  end if;
end $$;

alter table public.orders add column if not exists whatsapp_message text default '';
update public.orders set whatsapp_message = '' where whatsapp_message is null;
alter table public.orders alter column whatsapp_message set not null;

drop policy if exists "Anyone can create an order" on public.orders;
create policy "Anyone can create an order"
on public.orders for insert
to anon, authenticated
with check (is_paid = false and is_fulfilled = false and status in ('new', 'pending'));

grant insert on public.orders to anon, authenticated;
grant select, update on public.orders to authenticated;

notify pgrst, 'reload schema';
