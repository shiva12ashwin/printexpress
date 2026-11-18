CREATE OR REPLACE FUNCTION public.printexpress_health_check()
RETURNS text
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT 'ok'::text;
$$;

REVOKE ALL ON FUNCTION public.printexpress_health_check() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.printexpress_health_check() TO service_role;
