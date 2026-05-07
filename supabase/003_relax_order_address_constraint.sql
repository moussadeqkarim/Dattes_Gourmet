-- Allows short Moroccan city names such as Fès while still rejecting empty addresses.
-- Safe to run more than once in the Supabase SQL Editor.

alter table public.orders
  drop constraint if exists orders_delivery_address_check;

alter table public.orders
  add constraint orders_delivery_address_check
  check (char_length(trim(delivery_address)) >= 2);

notify pgrst, 'reload schema';
