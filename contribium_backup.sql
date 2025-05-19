--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA pgsodium;


ALTER SCHEMA pgsodium OWNER TO supabase_admin;

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;


--
-- Name: EXTENSION pgsodium; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.category AS ENUM (
    'content',
    'design',
    'development',
    'other'
);


ALTER TYPE public.category OWNER TO postgres;

--
-- Name: project_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.project_category AS ENUM (
    'frontend',
    'backend',
    'blockchain',
    'design',
    'content'
);


ALTER TYPE public.project_category OWNER TO postgres;

--
-- Name: project_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.project_status AS ENUM (
    'published',
    'draft',
    'archived'
);


ALTER TYPE public.project_status OWNER TO postgres;

--
-- Name: skill_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.skill_category AS ENUM (
    'frontend',
    'backend',
    'blockchain',
    'design'
);


ALTER TYPE public.skill_category OWNER TO postgres;

--
-- Name: status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status AS ENUM (
    'open',
    'in review',
    'completed'
);


ALTER TYPE public.status OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: create_submission_notification(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_submission_notification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  insert into notifications (
    sponsor_id,
    user_id,
    submission_id,
    submission_type,
    status,
    title,
    message
  )
  select 
    b.sponsor_id,
    NEW.user_id,
    NEW.id,
    'bounty',
    'unread',
    'New submission for ' || b.title,
    'A new submission has been made for your bounty: ' || b.title
  from bounties b
  where b.id = NEW.bounty_id;
  
  return NEW;
end;
$$;


ALTER FUNCTION public.create_submission_notification() OWNER TO postgres;

--
-- Name: current_user_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.current_user_id() RETURNS text
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  RETURN auth.uid();  -- For Supabase, or adjust for your auth system
END;
$$;


ALTER FUNCTION public.current_user_id() OWNER TO postgres;

--
-- Name: get_sponsor_count_for_user(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_sponsor_count_for_user(user_uuid uuid) RETURNS integer
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    sponsor_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO sponsor_count
    FROM sponsors
    WHERE user_id = user_uuid;
    
    RETURN sponsor_count;
END;
$$;


ALTER FUNCTION public.get_sponsor_count_for_user(user_uuid uuid) OWNER TO postgres;

--
-- Name: handle_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    new.updated_at = now();
    return new;
end;
$$;


ALTER FUNCTION public.handle_updated_at() OWNER TO postgres;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      PERFORM pg_notify(
          'realtime:system',
          jsonb_build_object(
              'error', SQLERRM,
              'function', 'realtime.send',
              'event', event,
              'topic', topic,
              'private', private
          )::text
      );
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: supabase_admin
--

CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


ALTER FUNCTION vault.secrets_encrypt_secret_secret() OWNER TO supabase_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    design_skills text[] DEFAULT '{}'::text[],
    content_skills text[] DEFAULT '{}'::text[],
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: bounties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bounties (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    sponsor_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    category character varying(20),
    status character varying(20),
    requirements text,
    reward jsonb DEFAULT '{"token": "ALPH", "amount": 0, "usd_equivalent": 0}'::jsonb NOT NULL,
    submission_guidelines text,
    max_submissions integer DEFAULT 10,
    current_submissions integer DEFAULT 0,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    review_timeframe integer DEFAULT 7 NOT NULL,
    difficulty_level character varying(20),
    estimated_hours integer,
    tags text[],
    is_featured boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT bounties_category_check CHECK (((category)::text = ANY (ARRAY[('content'::character varying)::text, ('design'::character varying)::text, ('development'::character varying)::text, ('other'::character varying)::text]))),
    CONSTRAINT bounties_difficulty_level_check CHECK (((difficulty_level)::text = ANY (ARRAY[('beginner'::character varying)::text, ('intermediate'::character varying)::text, ('advanced'::character varying)::text]))),
    CONSTRAINT bounties_status_check CHECK (((status)::text = ANY (ARRAY[('open'::character varying)::text, ('in_review'::character varying)::text, ('completed'::character varying)::text])))
);


ALTER TABLE public.bounties OWNER TO postgres;

--
-- Name: bounty_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bounty_comments (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    bounty_id uuid NOT NULL,
    user_id uuid NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.bounty_comments OWNER TO postgres;

--
-- Name: bounty_submissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bounty_submissions (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    bounty_id uuid NOT NULL,
    bounty_name text NOT NULL,
    sponsor_id uuid NOT NULL,
    sponsor_name text NOT NULL,
    sponsor_logo_url text,
    user_id uuid NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    submission_url text NOT NULL,
    tweet_url text,
    status text NOT NULL,
    feedback text,
    review_started_at timestamp with time zone,
    completed_at timestamp with time zone,
    reward jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    user_username text,
    user_avatar_url text,
    user_full_name text,
    user_wallet_address text,
    transaction_hash text DEFAULT 'NULL'::text,
    CONSTRAINT bounty_submissions_status_check CHECK ((status = ANY (ARRAY['submitted'::text, 'in_review'::text, 'accepted'::text, 'rejected'::text])))
);


ALTER TABLE public.bounty_submissions OWNER TO postgres;

--
-- Name: proof_of_work; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proof_of_work (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    title text NOT NULL,
    description text NOT NULL,
    category public.project_category NOT NULL,
    skills text[] NOT NULL,
    project_url text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.proof_of_work OWNER TO postgres;

--
-- Name: proof_of_work_skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proof_of_work_skills (
    proof_of_work_id uuid NOT NULL,
    skill_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.proof_of_work_skills OWNER TO postgres;

--
-- Name: skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skills (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    category public.skill_category NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.skills OWNER TO postgres;

--
-- Name: sponsors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sponsors (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    logo_url text,
    website_url text,
    twitter_handle character varying(255),
    github_handle character varying(255),
    discord_url text,
    is_verified boolean DEFAULT false,
    total_bounties_count integer DEFAULT 0,
    total_projects_count integer DEFAULT 0,
    total_reward_amount numeric(20,2) DEFAULT 0.00,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sponsors OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    username text,
    first_name text,
    last_name text,
    full_name text,
    bio text,
    avatar_url text,
    wallet_address text,
    github_url text,
    twitter_url text,
    linkedin_url text,
    telegram_url text,
    website_url text,
    web3_interests text[] DEFAULT '{}'::text[],
    work_experience text,
    location text,
    current_employer text,
    frontend_skills text[] DEFAULT '{}'::text[],
    backend_skills text[] DEFAULT '{}'::text[],
    blockchain_skills text[] DEFAULT '{}'::text[],
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    design_skills text[],
    content_skills text[]
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: messages_2025_05_15; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_05_15 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_05_15 OWNER TO supabase_admin;

--
-- Name: messages_2025_05_16; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_05_16 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_05_16 OWNER TO supabase_admin;

--
-- Name: messages_2025_05_17; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_05_17 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_05_17 OWNER TO supabase_admin;

--
-- Name: messages_2025_05_18; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_05_18 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_05_18 OWNER TO supabase_admin;

--
-- Name: messages_2025_05_19; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_05_19 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_05_19 OWNER TO supabase_admin;

--
-- Name: messages_2025_05_20; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_05_20 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_05_20 OWNER TO supabase_admin;

--
-- Name: messages_2025_05_21; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_05_21 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_05_21 OWNER TO supabase_admin;

--
-- Name: messages_2025_05_22; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_05_22 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_05_22 OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: messages_2025_05_15; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_05_15 FOR VALUES FROM ('2025-05-15 00:00:00') TO ('2025-05-16 00:00:00');


--
-- Name: messages_2025_05_16; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_05_16 FOR VALUES FROM ('2025-05-16 00:00:00') TO ('2025-05-17 00:00:00');


--
-- Name: messages_2025_05_17; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_05_17 FOR VALUES FROM ('2025-05-17 00:00:00') TO ('2025-05-18 00:00:00');


--
-- Name: messages_2025_05_18; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_05_18 FOR VALUES FROM ('2025-05-18 00:00:00') TO ('2025-05-19 00:00:00');


--
-- Name: messages_2025_05_19; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_05_19 FOR VALUES FROM ('2025-05-19 00:00:00') TO ('2025-05-20 00:00:00');


--
-- Name: messages_2025_05_20; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_05_20 FOR VALUES FROM ('2025-05-20 00:00:00') TO ('2025-05-21 00:00:00');


--
-- Name: messages_2025_05_21; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_05_21 FOR VALUES FROM ('2025-05-21 00:00:00') TO ('2025-05-22 00:00:00');


--
-- Name: messages_2025_05_22; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_05_22 FOR VALUES FROM ('2025-05-22 00:00:00') TO ('2025-05-23 00:00:00');


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	6083b3e5-6667-4900-b1b5-eb1f35b830cc	{"action":"user_signedup","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-01-06 21:11:59.117641+00	
00000000-0000-0000-0000-000000000000	003d516a-8936-42ab-a367-42a03a753529	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 21:33:12.40747+00	
00000000-0000-0000-0000-000000000000	ffbc49e2-96ce-4f1e-9bc5-70acd19979f5	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 21:40:34.091622+00	
00000000-0000-0000-0000-000000000000	7b56c45d-43c3-4837-9d4f-ce93f9293d91	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 21:50:38.179318+00	
00000000-0000-0000-0000-000000000000	2d9474ca-e7ba-4ccd-b9e1-1b8073cfe26f	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 22:02:49.229144+00	
00000000-0000-0000-0000-000000000000	09377ea6-8582-4446-b2ac-40dbf74e0cee	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 22:12:38.754232+00	
00000000-0000-0000-0000-000000000000	8c8194df-1b2c-41fd-8034-7e870c3fd672	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 22:22:21.485892+00	
00000000-0000-0000-0000-000000000000	d3cc1d13-be14-4c17-af29-c07d641d6581	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 22:52:08.004614+00	
00000000-0000-0000-0000-000000000000	18f58720-2c29-4ece-8163-b9946bbda478	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 22:52:22.824674+00	
00000000-0000-0000-0000-000000000000	04483f2a-88e5-49d8-b292-187d806a7498	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 22:53:05.691001+00	
00000000-0000-0000-0000-000000000000	6dff85bd-9be6-4e81-a2fa-3d164d5b2d10	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 22:55:03.421257+00	
00000000-0000-0000-0000-000000000000	a93e535c-86e8-4815-9369-fe4c4aa44044	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 22:55:46.65357+00	
00000000-0000-0000-0000-000000000000	e6e987d0-dfbd-49ae-9571-30f473422b2c	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-06 23:01:49.145731+00	
00000000-0000-0000-0000-000000000000	44fb9c18-ed07-434a-8ba4-f5090e84557e	{"action":"token_refreshed","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-07 08:50:05.276026+00	
00000000-0000-0000-0000-000000000000	530af9fb-6f15-4150-b3b1-fd694b292e0c	{"action":"token_revoked","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-07 08:50:05.288426+00	
00000000-0000-0000-0000-000000000000	d571d28c-8a53-4707-929a-85bf0ec5cdcb	{"action":"token_refreshed","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-07 10:55:20.839214+00	
00000000-0000-0000-0000-000000000000	ffdf1153-2a97-4931-9b17-f0a94f182ff4	{"action":"token_revoked","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-07 10:55:20.841183+00	
00000000-0000-0000-0000-000000000000	df8cbba3-2e31-47a2-99f0-b070bd513165	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-07 14:42:49.462092+00	
00000000-0000-0000-0000-000000000000	8e3c8b69-1d66-4f65-86fa-86a4412b4251	{"action":"logout","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-07 14:43:00.091171+00	
00000000-0000-0000-0000-000000000000	e9c1e35f-14ce-41ed-9598-cb6fea081fef	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-07 14:43:24.013085+00	
00000000-0000-0000-0000-000000000000	8b79aca6-2aed-4b05-b3bc-6dcebb414242	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-07 15:16:40.223407+00	
00000000-0000-0000-0000-000000000000	d366a13e-6bad-4d14-b32b-c28565f0126e	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-07 15:29:14.887712+00	
00000000-0000-0000-0000-000000000000	c034caed-3f04-4831-b973-e2692f01988f	{"action":"logout","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-07 15:31:19.746623+00	
00000000-0000-0000-0000-000000000000	885f2b99-c0e7-4156-8da7-5612bafaa2b1	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-07 15:33:03.845796+00	
00000000-0000-0000-0000-000000000000	45f033f7-e875-48e5-a0ba-217e03ecada3	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-07 15:53:22.731883+00	
00000000-0000-0000-0000-000000000000	c6d7c637-45d1-43ac-a7a2-c396ea96bab4	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-07 15:55:08.661018+00	
00000000-0000-0000-0000-000000000000	1bd1c687-ff52-429c-9748-079d17319720	{"action":"token_refreshed","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-07 16:53:10.686036+00	
00000000-0000-0000-0000-000000000000	d52aa67c-d9f2-4cd7-b94f-f68e98ed1fc7	{"action":"token_revoked","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-07 16:53:10.689368+00	
00000000-0000-0000-0000-000000000000	0b881d2d-9740-4a74-8d4d-3bf7b4f72f6a	{"action":"token_refreshed","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-07 18:06:50.766959+00	
00000000-0000-0000-0000-000000000000	ad2ebaf0-9690-4960-9b94-4ef44ef6c52d	{"action":"token_revoked","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-07 18:06:50.771037+00	
00000000-0000-0000-0000-000000000000	c618d4bd-3ec8-44ab-965b-e3126f5e92df	{"action":"token_refreshed","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-07 22:03:09.858699+00	
00000000-0000-0000-0000-000000000000	6826eda0-eed8-46fd-bb67-4173e8d53ae5	{"action":"token_revoked","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-07 22:03:09.860256+00	
00000000-0000-0000-0000-000000000000	a57ce45c-ed22-442b-b5c1-c41933f27633	{"action":"token_refreshed","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-08 11:49:07.348207+00	
00000000-0000-0000-0000-000000000000	42d69596-a607-4a50-bf69-ea03c3b2e8a4	{"action":"token_revoked","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-08 11:49:07.362487+00	
00000000-0000-0000-0000-000000000000	2d5de5cb-cda5-4931-90c3-c4a2f0254e10	{"action":"token_refreshed","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-08 13:51:35.744704+00	
00000000-0000-0000-0000-000000000000	47f752ec-961a-4549-bca9-fe2203c29b75	{"action":"token_revoked","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-08 13:51:35.747442+00	
00000000-0000-0000-0000-000000000000	8c86f369-8c43-4cee-825d-91991fcf1ca5	{"action":"token_refreshed","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-08 16:09:53.835321+00	
00000000-0000-0000-0000-000000000000	4c7b05d7-c92a-400f-affc-391c09a1a042	{"action":"token_revoked","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-08 16:09:53.836992+00	
00000000-0000-0000-0000-000000000000	430d4543-9bda-456a-86df-5ca280ed8d83	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-08 16:13:51.629641+00	
00000000-0000-0000-0000-000000000000	39af8128-5c9c-48a0-ab7b-a0aeb7112f42	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-08 16:35:44.143844+00	
00000000-0000-0000-0000-000000000000	5f9f8660-8db6-4629-9406-75e459ec5e04	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-08 17:19:35.117474+00	
00000000-0000-0000-0000-000000000000	9dfac22b-2ea3-4b4e-aad7-4f224fa09d19	{"action":"logout","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-08 17:19:41.101418+00	
00000000-0000-0000-0000-000000000000	3074578a-9b4e-4ec2-a784-aeca40513be8	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-08 17:20:37.171057+00	
00000000-0000-0000-0000-000000000000	200f556a-8247-4c75-82a0-22432ac925b4	{"action":"token_refreshed","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-09 12:22:39.182265+00	
00000000-0000-0000-0000-000000000000	82d635e2-d2fd-4497-be72-a65ec934da31	{"action":"token_revoked","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-09 12:22:39.218135+00	
00000000-0000-0000-0000-000000000000	5fd8f361-70cf-4214-9149-b77957c43fd2	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 12:23:57.281282+00	
00000000-0000-0000-0000-000000000000	b48d4e4f-0921-4a46-9f02-bee106ebbcbc	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 12:30:03.269435+00	
00000000-0000-0000-0000-000000000000	1c29873c-0e97-4a6b-8f2d-1146917c3e46	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 12:33:25.954821+00	
00000000-0000-0000-0000-000000000000	63307702-0657-4836-b61a-5b7464da1999	{"action":"logout","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-09 12:34:30.173998+00	
00000000-0000-0000-0000-000000000000	5afb7c66-20c8-4533-a44d-36b0de0ee581	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 12:34:43.054167+00	
00000000-0000-0000-0000-000000000000	b07522c7-651a-44b9-af3a-4b399da39cc8	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 12:42:25.175415+00	
00000000-0000-0000-0000-000000000000	584c4720-a637-42c7-8a7c-1c365d5dd967	{"action":"logout","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-09 12:42:37.740874+00	
00000000-0000-0000-0000-000000000000	48c7a2ca-e1fe-4a8b-8b18-da717d4c589e	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 12:42:46.196297+00	
00000000-0000-0000-0000-000000000000	8a51e404-3da9-4509-9b0b-a478e32e3f87	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 12:43:56.046355+00	
00000000-0000-0000-0000-000000000000	b40193c2-9911-48bd-9d41-4724ed49fed3	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 12:50:06.906156+00	
00000000-0000-0000-0000-000000000000	ae815154-5a2a-49ee-8c43-5a61cea9f88e	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:05:03.986577+00	
00000000-0000-0000-0000-000000000000	952ae7da-da01-43f1-9c27-98b3e9b0290e	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:05:57.577157+00	
00000000-0000-0000-0000-000000000000	3f3f7760-444c-48ec-864e-779641185aef	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:12:59.020921+00	
00000000-0000-0000-0000-000000000000	3812f4f4-74f6-4a55-9fa7-80832394619e	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:13:11.535562+00	
00000000-0000-0000-0000-000000000000	cd0ee58f-6fb5-487f-a13e-18cd9d360b50	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:14:24.810901+00	
00000000-0000-0000-0000-000000000000	68ce3981-406e-4a3e-a854-420e54793d48	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:17:32.965579+00	
00000000-0000-0000-0000-000000000000	e5d2d823-27c9-4ee4-9d56-c7e61c5c805b	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:24:59.526439+00	
00000000-0000-0000-0000-000000000000	bb60e5e9-c710-4c39-907c-b2121f8ef659	{"action":"login","actor_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:34:19.204133+00	
00000000-0000-0000-0000-000000000000	c9238453-fce9-4981-832b-8051aa9a9ab0	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"liyuanying225@gmail.com","user_id":"bb6db3a9-27bc-4307-a484-9c665f6b8d74","user_phone":""}}	2025-01-09 13:39:56.608824+00	
00000000-0000-0000-0000-000000000000	7a85fa2a-4483-494a-b652-81932cb4dcb2	{"action":"user_signedup","actor_id":"9124c49c-cfeb-4db2-bc9d-0fbcb0cbdca8","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-01-09 13:40:14.790456+00	
00000000-0000-0000-0000-000000000000	518f8939-2ad0-446d-b0d5-fd4c7dc4dc55	{"action":"login","actor_id":"9124c49c-cfeb-4db2-bc9d-0fbcb0cbdca8","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:40:25.570569+00	
00000000-0000-0000-0000-000000000000	27e90764-2eac-4dbd-9624-fe9933151c4c	{"action":"login","actor_id":"9124c49c-cfeb-4db2-bc9d-0fbcb0cbdca8","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:41:08.990649+00	
00000000-0000-0000-0000-000000000000	1d4357c4-3a8a-4c85-b6b7-3cdc88352060	{"action":"login","actor_id":"9124c49c-cfeb-4db2-bc9d-0fbcb0cbdca8","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:43:14.810443+00	
00000000-0000-0000-0000-000000000000	889f072c-63b7-4cb8-a078-327d5ebb30fc	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"liyuanying225@gmail.com","user_id":"9124c49c-cfeb-4db2-bc9d-0fbcb0cbdca8","user_phone":""}}	2025-01-09 13:44:19.033211+00	
00000000-0000-0000-0000-000000000000	448c1ab3-3555-40dc-a978-539de88c0775	{"action":"user_signedup","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-01-09 13:45:02.303129+00	
00000000-0000-0000-0000-000000000000	c5db39fb-c2ed-4992-b761-07c0c7e93154	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:45:20.065557+00	
00000000-0000-0000-0000-000000000000	91a4d100-0ede-4c2f-acd9-a213e1976395	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:46:02.990969+00	
00000000-0000-0000-0000-000000000000	1afd5b12-962c-4ca6-b99b-4be3513a21df	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:46:48.851954+00	
00000000-0000-0000-0000-000000000000	6820167c-bb5d-4b27-a999-7355b93cf7e1	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:47:27.06571+00	
00000000-0000-0000-0000-000000000000	bff94062-879c-4f35-91e7-43086171642c	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:49:13.597432+00	
00000000-0000-0000-0000-000000000000	0868922f-6865-4999-a87f-5e675104770b	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:49:38.990638+00	
00000000-0000-0000-0000-000000000000	13a7df50-b4a0-4085-bb3f-e45df8144094	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:50:16.01262+00	
00000000-0000-0000-0000-000000000000	9b04f68a-803a-47cf-8d8b-236a64635796	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:55:03.862718+00	
00000000-0000-0000-0000-000000000000	f41c4940-f477-47ee-8838-26f164952d62	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 13:58:04.710461+00	
00000000-0000-0000-0000-000000000000	12c814b9-07ab-4fbb-a50c-4923af4b9b53	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 14:00:26.310341+00	
00000000-0000-0000-0000-000000000000	ca20a9ee-5731-461f-a186-600208cb7323	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 14:03:45.085894+00	
00000000-0000-0000-0000-000000000000	5b18aa85-f83b-4c69-824e-46c6834e6fbe	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 14:08:31.45885+00	
00000000-0000-0000-0000-000000000000	a7032fdb-2025-4366-9913-d138de846c05	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 14:15:41.725294+00	
00000000-0000-0000-0000-000000000000	0f896729-509f-497a-b61f-f19a76e10a5e	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 14:18:09.499861+00	
00000000-0000-0000-0000-000000000000	fb99123d-b8cd-474e-a403-449839f97736	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 14:22:19.120507+00	
00000000-0000-0000-0000-000000000000	8e5d3052-d723-4309-9a1b-924d6a6f882e	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 14:55:04.727748+00	
00000000-0000-0000-0000-000000000000	7c480bb0-d6df-4dd4-a4cb-ccca69c9d995	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 15:00:31.633581+00	
00000000-0000-0000-0000-000000000000	52f934c5-ba9f-44d5-92df-dd9a56016498	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 15:16:05.588016+00	
00000000-0000-0000-0000-000000000000	ba9486fb-d286-49e4-b462-5eb4ac90104a	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 15:24:15.926932+00	
00000000-0000-0000-0000-000000000000	ddc7befe-b45e-445b-933f-50ab19ea0a66	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 15:36:01.279442+00	
00000000-0000-0000-0000-000000000000	dc96644a-5732-4320-a247-38f44bee36c1	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 15:39:28.773713+00	
00000000-0000-0000-0000-000000000000	90b2a6d9-0dd9-431d-8014-896a04f9a123	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 15:45:46.270797+00	
00000000-0000-0000-0000-000000000000	35de7f22-fa6c-4dc5-ab8c-b7aa0b8f124e	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 16:14:25.955455+00	
00000000-0000-0000-0000-000000000000	4fa9d9ca-a3ff-4864-a343-acc74af81dc6	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-09 17:48:23.82135+00	
00000000-0000-0000-0000-000000000000	51825875-a7c9-4e92-903f-1987c5a0feea	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-09 17:48:23.828809+00	
00000000-0000-0000-0000-000000000000	93383e5f-5219-4de5-9b0f-c277f4ecd0f7	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-09 21:18:51.138228+00	
00000000-0000-0000-0000-000000000000	9f6528ac-8d24-4931-b709-14b9c8f424e2	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-11 14:04:06.053377+00	
00000000-0000-0000-0000-000000000000	4ef9085c-f7a3-412d-8c1a-72fde191bbbc	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-11 14:04:06.075999+00	
00000000-0000-0000-0000-000000000000	94e7dcad-3f9d-496d-9aae-4b32928f5187	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 14:29:23.125097+00	
00000000-0000-0000-0000-000000000000	7a53c2d9-eb4b-44f4-b029-822bab51f62f	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 14:34:01.596502+00	
00000000-0000-0000-0000-000000000000	130d184b-a2b3-4a54-9289-8a1809ce961b	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 14:35:00.388083+00	
00000000-0000-0000-0000-000000000000	67fea724-b521-4a0d-bd2d-cabf05863a1d	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 14:46:45.131487+00	
00000000-0000-0000-0000-000000000000	0038ecad-426d-4149-ad2f-b24b1551db41	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 14:47:22.927413+00	
00000000-0000-0000-0000-000000000000	ad9cb2f3-4adb-4c24-a21b-18e197252dbc	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 14:53:28.345662+00	
00000000-0000-0000-0000-000000000000	bd2b9391-4031-47b5-8d0d-3753e6793718	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 14:57:10.034605+00	
00000000-0000-0000-0000-000000000000	0ae91302-b1f1-478d-baae-2b60ac6cd08e	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 15:06:05.627069+00	
00000000-0000-0000-0000-000000000000	b00c9a3c-513e-4325-a6de-751a52d603a4	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 15:16:58.701208+00	
00000000-0000-0000-0000-000000000000	129e37b4-5427-4cdd-a2b9-41f8b51fa31f	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 15:34:32.737809+00	
00000000-0000-0000-0000-000000000000	30821475-0651-45fc-b8fc-bd3457150d63	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 16:03:26.796952+00	
00000000-0000-0000-0000-000000000000	a7f5383b-78c4-4b54-8972-fe6f2696eeaf	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 16:17:52.418427+00	
00000000-0000-0000-0000-000000000000	1dfd6e21-fb9b-4b0c-8fad-b393acc38a29	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 16:20:14.096757+00	
00000000-0000-0000-0000-000000000000	f30b22c8-cf57-43f4-aa55-df34dab75418	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 16:27:16.129344+00	
00000000-0000-0000-0000-000000000000	c876d54c-f5df-463f-97e4-b5365d0495bc	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 16:28:04.073987+00	
00000000-0000-0000-0000-000000000000	4298f642-a658-4460-8de1-fd6f16f6a9cb	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 16:28:22.17267+00	
00000000-0000-0000-0000-000000000000	4618191e-58e3-4326-bc6a-47b99b6ef75e	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 16:29:59.299629+00	
00000000-0000-0000-0000-000000000000	68823d0f-c199-426e-9f70-f0aaf308073c	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 16:36:46.84771+00	
00000000-0000-0000-0000-000000000000	ef9e4992-c30c-40b5-b287-5e3df432970a	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 16:40:46.186465+00	
00000000-0000-0000-0000-000000000000	72e25ddb-5dfb-438e-9b21-b174ab8b5852	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 16:51:09.799413+00	
00000000-0000-0000-0000-000000000000	4ae1d468-c1fb-4a6e-ba66-1b007cd0ff43	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 17:07:14.846224+00	
00000000-0000-0000-0000-000000000000	59f9339c-0a91-4b49-b1ba-5d3f1c80bf57	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 17:18:53.31742+00	
00000000-0000-0000-0000-000000000000	8ee22a9a-f87f-4bbb-b9a5-fccf62c2587e	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 17:22:34.510043+00	
00000000-0000-0000-0000-000000000000	ae786920-1c9c-4bd4-b9c0-a2f89d387581	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 17:26:57.079918+00	
00000000-0000-0000-0000-000000000000	fe939d80-9666-4baf-b319-5d49f09a1727	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 17:35:34.857104+00	
00000000-0000-0000-0000-000000000000	478f0ac5-2464-44cb-bce6-a7c3c13db3bc	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 17:42:59.697967+00	
00000000-0000-0000-0000-000000000000	4446959b-ebb8-401c-b13a-082eedcd5ed4	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 17:52:35.112885+00	
00000000-0000-0000-0000-000000000000	218e2485-f9c5-48cc-b6c4-cfb3d3a51a24	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 17:56:46.431316+00	
00000000-0000-0000-0000-000000000000	3d1efddc-2933-47d4-95fd-7ef01866f20c	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 17:58:55.329201+00	
00000000-0000-0000-0000-000000000000	1fb59c00-1e1c-41c7-8d23-0d16e5226814	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:00:46.503491+00	
00000000-0000-0000-0000-000000000000	17281172-b05e-4ac8-bda9-e0bb7a1176d1	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:02:05.219265+00	
00000000-0000-0000-0000-000000000000	a0c96861-de80-4332-80f5-fa74234532e7	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:06:37.17759+00	
00000000-0000-0000-0000-000000000000	cfda34a3-d184-4d54-84f5-e8cbf923527c	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:07:03.769828+00	
00000000-0000-0000-0000-000000000000	bef43436-9d4d-4947-abb0-75d4540e4752	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:08:09.09497+00	
00000000-0000-0000-0000-000000000000	dc071d19-5f66-4b51-bc2f-62b46e844e40	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:08:56.398288+00	
00000000-0000-0000-0000-000000000000	42f10dd5-964b-4bae-97c0-5f41fbf192a5	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:12:48.006612+00	
00000000-0000-0000-0000-000000000000	c621f1e6-8f69-4f4d-8441-5e7d0300e566	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:13:03.056229+00	
00000000-0000-0000-0000-000000000000	7aad6a2d-31b3-4bfe-9a3c-0c62393a042d	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:13:36.860504+00	
00000000-0000-0000-0000-000000000000	c0957226-7840-47ac-bb2f-1fa664191bd1	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:14:17.246712+00	
00000000-0000-0000-0000-000000000000	3344873a-8e5e-47a0-98af-8864776a08cf	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:17:55.762883+00	
00000000-0000-0000-0000-000000000000	08c6260b-4364-4576-9afd-725a8e292199	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:19:42.578185+00	
00000000-0000-0000-0000-000000000000	d1e3ff98-562c-4dd7-a200-1d4722427f6f	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 13:39:53.906228+00	
00000000-0000-0000-0000-000000000000	9bcadd13-87da-40fc-8a0a-fa454d396480	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}	2025-01-11 18:19:44.821176+00	
00000000-0000-0000-0000-000000000000	8e45581d-ff98-43f8-be84-154fcc3d8311	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:25:57.715928+00	
00000000-0000-0000-0000-000000000000	e983febd-04b5-492a-aa5f-5ef06db70694	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}	2025-01-11 18:26:00.141187+00	
00000000-0000-0000-0000-000000000000	aed61b4b-2372-4745-9090-1a1419a5320a	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:26:17.989349+00	
00000000-0000-0000-0000-000000000000	e2c4dd62-cc73-4b95-bbf0-ae3ec3342776	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}	2025-01-11 18:26:20.045068+00	
00000000-0000-0000-0000-000000000000	ae200007-57a6-4e90-a7ed-ec4e5f1cabb0	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 18:30:57.458994+00	
00000000-0000-0000-0000-000000000000	6bbb5b0b-5c8e-4176-a706-4c060aa34eed	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}	2025-01-11 18:30:59.749645+00	
00000000-0000-0000-0000-000000000000	df08678d-8e18-45f4-a0cd-a9cf55e607d3	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 20:22:38.877262+00	
00000000-0000-0000-0000-000000000000	54b3778e-3277-4c69-a236-c0909aa5a355	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}	2025-01-11 20:22:42.436264+00	
00000000-0000-0000-0000-000000000000	31f384a9-ffa2-4b88-8b1a-10bc7868e6ae	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 20:26:51.285511+00	
00000000-0000-0000-0000-000000000000	eb446bf5-b9d7-4eea-9809-0896714dac7d	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}	2025-01-11 20:26:53.747445+00	
00000000-0000-0000-0000-000000000000	3bc6bbf6-3bfe-4df6-8899-bfeb57f21c30	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 20:31:13.494082+00	
00000000-0000-0000-0000-000000000000	562e840e-71a8-4877-a539-43fd3da4e5d2	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}	2025-01-11 20:31:17.159693+00	
00000000-0000-0000-0000-000000000000	a583303d-18f5-4f72-8183-4cd465615d14	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-11 20:34:33.956604+00	
00000000-0000-0000-0000-000000000000	bd6de459-9629-4f18-a149-7c5825cb05cc	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-11 20:34:33.962008+00	
00000000-0000-0000-0000-000000000000	32a18a68-ac08-4ae2-912a-208824326a8d	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 20:35:13.636727+00	
00000000-0000-0000-0000-000000000000	b8f038b3-cfd9-4dd8-abc5-8628011dfb15	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-11 20:43:01.713291+00	
00000000-0000-0000-0000-000000000000	de2ce888-662b-4f94-b907-9b3550cb5f85	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-11 21:41:25.431944+00	
00000000-0000-0000-0000-000000000000	11586100-0db5-48f0-8795-8d54698b48c4	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-11 21:41:25.434556+00	
00000000-0000-0000-0000-000000000000	0b69fb8e-1f98-4100-8d61-7fedbe863510	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-11 23:19:26.089224+00	
00000000-0000-0000-0000-000000000000	fc7de41d-3bce-43b3-85af-e3d23aadcd21	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-11 23:19:26.091454+00	
00000000-0000-0000-0000-000000000000	9281d1bc-6712-4ea4-b66f-a07228ec14df	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-12 16:22:45.585133+00	
00000000-0000-0000-0000-000000000000	c17e0bbb-b564-433d-b44f-9b0d80389c7d	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-12 17:22:59.771125+00	
00000000-0000-0000-0000-000000000000	f75dadbe-87b1-4b43-8274-953e29b18cc8	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-12 17:22:59.777244+00	
00000000-0000-0000-0000-000000000000	91bc9eaa-d40f-4af6-a96a-7b0e0a8a02cb	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-12 18:58:56.002262+00	
00000000-0000-0000-0000-000000000000	b61bb1d9-158c-497d-b4fc-8fb3b48ebb29	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-12 18:58:56.008757+00	
00000000-0000-0000-0000-000000000000	8c0b486d-5f48-4b49-8e57-4b9fe2f2c266	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-12 20:26:53.427153+00	
00000000-0000-0000-0000-000000000000	24a3992a-4725-44ac-aeaf-8b81b6030692	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-12 20:26:53.430114+00	
00000000-0000-0000-0000-000000000000	39a6d3ab-8a24-4d3d-b9bf-55f38a5e8756	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-12 21:27:06.255837+00	
00000000-0000-0000-0000-000000000000	da881152-2b26-47b6-8071-c9866e636968	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-12 21:27:06.25871+00	
00000000-0000-0000-0000-000000000000	2e273bac-b3b0-4dcc-ae0e-1ccc4b329353	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-12 22:17:53.856422+00	
00000000-0000-0000-0000-000000000000	26f35a85-ac0d-4ef6-aea5-54b4768460be	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-13 09:13:59.879281+00	
00000000-0000-0000-0000-000000000000	b2970099-ea33-4cd9-8b40-a65f45bcf7f6	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-13 09:13:59.900874+00	
00000000-0000-0000-0000-000000000000	e2bebd8a-d75b-4281-9a5f-6a9d69d68cff	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-13 09:16:02.171271+00	
00000000-0000-0000-0000-000000000000	0437afa3-2e5e-45d2-b75c-5f1401937904	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 09:17:13.462721+00	
00000000-0000-0000-0000-000000000000	4488fb70-ae41-49fc-adeb-8cd890fd675f	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-13 14:22:29.907624+00	
00000000-0000-0000-0000-000000000000	1af4d39b-0bd2-468b-869d-7601a3ab0346	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-13 14:22:29.924756+00	
00000000-0000-0000-0000-000000000000	4fd3dbfd-ff25-4717-8170-4165a311c606	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-13 15:04:41.341406+00	
00000000-0000-0000-0000-000000000000	f91bad66-c581-4ea7-899d-a34dc3e72202	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 15:05:31.413332+00	
00000000-0000-0000-0000-000000000000	5327c079-b1c3-4884-b515-ba3395f5f8ee	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 15:07:18.586447+00	
00000000-0000-0000-0000-000000000000	b56d7fae-474a-41bd-93a1-d9fab71f4b12	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 15:07:36.520813+00	
00000000-0000-0000-0000-000000000000	1d572c85-5b53-4cdd-bee8-379543c345d4	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 15:18:22.083777+00	
00000000-0000-0000-0000-000000000000	e8974944-d69d-4672-a61a-176e3af6a07a	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 15:37:24.747993+00	
00000000-0000-0000-0000-000000000000	a7bc878e-3778-460f-b73c-19966be9243d	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 15:38:00.224083+00	
00000000-0000-0000-0000-000000000000	4612ea09-0859-4033-a919-d2ad80a177ee	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 15:46:10.557943+00	
00000000-0000-0000-0000-000000000000	adfa0651-88da-453c-80c5-c96a7e860476	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 15:47:53.374203+00	
00000000-0000-0000-0000-000000000000	b5581de6-8065-44a4-bdf2-5695ae32cba7	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 15:49:30.462678+00	
00000000-0000-0000-0000-000000000000	8b6c9002-35f7-410c-9553-c4285cc73bb6	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 15:55:28.268096+00	
00000000-0000-0000-0000-000000000000	5b013e83-6308-495e-9654-23c71de1b165	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-13 16:07:52.996454+00	
00000000-0000-0000-0000-000000000000	4b3cbe1d-97af-4513-849e-57e7ef6f9bd6	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-13 16:07:52.999408+00	
00000000-0000-0000-0000-000000000000	cba1b05f-0818-49ad-a36d-4c629fee6ead	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 16:16:19.302825+00	
00000000-0000-0000-0000-000000000000	fc8ff56b-71ab-4df5-9931-25a4dff629f8	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 16:17:12.316253+00	
00000000-0000-0000-0000-000000000000	a25aed05-e6da-4513-b12a-c8044385bcc8	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 16:21:01.019257+00	
00000000-0000-0000-0000-000000000000	230d1054-0d7e-46fc-9a0b-060b08b87639	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 16:21:37.415216+00	
00000000-0000-0000-0000-000000000000	6e12c968-d32a-4aa9-9604-e86ea995407b	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 16:39:22.294234+00	
00000000-0000-0000-0000-000000000000	2908be64-dae9-48e1-a8dd-ec9772e650b3	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 16:39:35.456162+00	
00000000-0000-0000-0000-000000000000	67c32e79-cda8-4c9a-9ec4-8f8c5aac2db0	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 16:40:20.48704+00	
00000000-0000-0000-0000-000000000000	8da90c9f-906a-40fd-bcf0-d11706a3e9d0	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 16:41:47.460567+00	
00000000-0000-0000-0000-000000000000	9738ffc8-7732-41b5-b4aa-334c7c54d6a5	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 16:42:46.276271+00	
00000000-0000-0000-0000-000000000000	e8031414-025f-4e14-83ba-f03942bb146f	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 16:51:51.255839+00	
00000000-0000-0000-0000-000000000000	e4081370-5570-4152-8036-5ffa2f6b1979	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-13 17:19:20.94873+00	
00000000-0000-0000-0000-000000000000	1cd72206-a7d8-4f92-822d-abb3d7194872	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-13 17:19:20.952951+00	
00000000-0000-0000-0000-000000000000	3baebac6-6f10-44e0-b353-1d24d94c16fa	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 17:19:32.452635+00	
00000000-0000-0000-0000-000000000000	2c8a1a11-cf35-4c20-addd-d295d3ca3f4c	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 17:21:14.718584+00	
00000000-0000-0000-0000-000000000000	7e449cdb-b55d-408f-9286-2c3a6ecf0bf7	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 17:27:18.788076+00	
00000000-0000-0000-0000-000000000000	d71045d0-2d43-4c9b-8296-2f0d3eb3b60b	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 17:31:09.517202+00	
00000000-0000-0000-0000-000000000000	b5a15ded-fec9-4492-9784-2f54ba2d02f0	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 17:32:54.351449+00	
00000000-0000-0000-0000-000000000000	63f3df8a-6f62-4d58-83c6-1d985462ae63	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 17:33:35.779925+00	
00000000-0000-0000-0000-000000000000	8eaccf17-3954-40eb-9749-4ae837db5796	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 17:36:21.053095+00	
00000000-0000-0000-0000-000000000000	56cde45f-95b6-4e98-bd6a-c04e98308f78	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-13 17:39:51.127649+00	
00000000-0000-0000-0000-000000000000	db25c1d6-70be-4db5-8f21-6ad6056b1c37	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-13 20:31:50.82028+00	
00000000-0000-0000-0000-000000000000	e4038bb0-e5f0-44c3-8fcc-a6ef407508b6	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-14 10:14:38.739187+00	
00000000-0000-0000-0000-000000000000	adbb6fe6-40e5-42be-a3d5-9d52d3bb0d78	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-14 10:14:38.756123+00	
00000000-0000-0000-0000-000000000000	6d0864a7-b112-43f7-8765-54874e605faa	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-14 14:52:11.647306+00	
00000000-0000-0000-0000-000000000000	59954791-e0bd-45c9-994e-eb728a31140d	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-14 14:52:11.653168+00	
00000000-0000-0000-0000-000000000000	75de0ca8-3fc1-4de3-b9f1-5b256f1716d8	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-14 15:27:21.153647+00	
00000000-0000-0000-0000-000000000000	ae48e1ea-45ee-4c2d-9e32-f0677fca5eef	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-14 15:27:58.74867+00	
00000000-0000-0000-0000-000000000000	f200ed0d-e4db-4150-8a82-6a4f91462c6f	{"action":"user_signedup","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-01-14 15:28:27.429829+00	
00000000-0000-0000-0000-000000000000	dc23bcc7-55b5-4d80-9b1a-693c5c78503f	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-14 15:28:39.373656+00	
00000000-0000-0000-0000-000000000000	9b20e4bb-efe1-48dd-9dd3-580ba170d184	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-14 15:29:08.895288+00	
00000000-0000-0000-0000-000000000000	5682e2f5-9cfd-4241-8ef2-8688596c0799	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-14 15:31:07.857883+00	
00000000-0000-0000-0000-000000000000	c2c172ee-f54f-4a8a-808b-12b061056b88	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-14 16:28:06.688643+00	
00000000-0000-0000-0000-000000000000	4a9e4592-c6b3-4cc1-b72f-4f5d697002dd	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-14 16:28:06.713483+00	
00000000-0000-0000-0000-000000000000	1e98ca92-753f-46d1-83cd-e44b1de822d2	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-01-14 16:29:17.814427+00	
00000000-0000-0000-0000-000000000000	10753862-5901-493f-ae36-033582dbc510	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-01-14 16:29:17.817411+00	
00000000-0000-0000-0000-000000000000	7808c659-0b27-4089-be89-08763d46ebaa	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-14 17:28:09.779734+00	
00000000-0000-0000-0000-000000000000	0495207c-0796-4aa1-87a6-5ea7d245c6b2	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-14 17:28:09.786017+00	
00000000-0000-0000-0000-000000000000	7ed5f152-1d36-4aed-8a4a-03f5ff66d906	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 08:51:02.806664+00	
00000000-0000-0000-0000-000000000000	c4a7c15d-f39c-4c22-9080-62da76c55029	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 08:51:02.821998+00	
00000000-0000-0000-0000-000000000000	e6748df7-c09f-48b4-990d-b75db16b2cce	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 10:41:05.744885+00	
00000000-0000-0000-0000-000000000000	16bea2c1-e8aa-4e68-95c7-dd6aae6e99ad	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 10:41:05.747892+00	
00000000-0000-0000-0000-000000000000	d6215083-9cd1-485b-a5bd-a2989a871de2	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 12:05:45.952929+00	
00000000-0000-0000-0000-000000000000	026c266b-3aaf-41ce-8236-d77e570e647e	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 12:05:45.954685+00	
00000000-0000-0000-0000-000000000000	4ef5e124-c4d8-45c5-8f87-70cc4c79c8e4	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 13:11:15.167772+00	
00000000-0000-0000-0000-000000000000	082e0a3a-709b-4ec0-b96d-7fd647f87231	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 13:11:15.170835+00	
00000000-0000-0000-0000-000000000000	0ded1926-d5da-4113-82e2-5c29c6dccd69	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 14:46:13.673598+00	
00000000-0000-0000-0000-000000000000	592e51eb-c36a-43fb-9ea3-b48398637e6c	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 14:46:13.675894+00	
00000000-0000-0000-0000-000000000000	2465266d-ab2f-404e-b27f-4f966abddcfc	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 15:52:05.716395+00	
00000000-0000-0000-0000-000000000000	b3bb9b81-8066-447a-adae-a69f56497ca2	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 15:52:05.718047+00	
00000000-0000-0000-0000-000000000000	65345c19-fc22-4b09-a25f-f71b957150df	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 16:50:25.156192+00	
00000000-0000-0000-0000-000000000000	9f6f7a3f-dd03-4075-8e8e-caac0e9eb57b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 16:50:25.159791+00	
00000000-0000-0000-0000-000000000000	ef2a613e-54bc-47dc-a98a-58a37857b68f	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 17:48:47.421724+00	
00000000-0000-0000-0000-000000000000	a2c21a94-0c21-4cab-be4b-06dcd24861cf	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 17:48:47.424133+00	
00000000-0000-0000-0000-000000000000	400be9f1-1500-4a9c-9075-4defd5a16ca2	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 20:01:08.517468+00	
00000000-0000-0000-0000-000000000000	6a839a67-e044-4326-a445-494f43578b13	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-15 20:01:08.521715+00	
00000000-0000-0000-0000-000000000000	8484e9c8-0a68-4b5f-91d1-dceff1b23b5a	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-16 08:34:02.770101+00	
00000000-0000-0000-0000-000000000000	e913ca92-eb07-4f2c-8d49-c4f9255aa5ee	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-16 08:34:02.782679+00	
00000000-0000-0000-0000-000000000000	bcbb5dd6-9f34-484d-83be-5a39ee0a558f	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-01-16 09:00:39.281532+00	
00000000-0000-0000-0000-000000000000	4b11d4b0-6b11-453e-b17f-86641cb5201a	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-01-16 09:00:39.284958+00	
00000000-0000-0000-0000-000000000000	e1f947ed-c5d5-4605-8158-b3b5d0ec8d10	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-16 09:01:21.506822+00	
00000000-0000-0000-0000-000000000000	b8738fc9-6cb5-4d92-88b5-fed7eb06ffea	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-16 09:32:50.188762+00	
00000000-0000-0000-0000-000000000000	ba7c181f-3992-44fa-9fe7-351c81637e4b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-16 09:32:50.191818+00	
00000000-0000-0000-0000-000000000000	15d76ac8-aeae-4d21-9c8d-ed64b68ad48c	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-16 12:58:38.659164+00	
00000000-0000-0000-0000-000000000000	dec6af21-5137-4cd7-9543-fc629ee6ddf8	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-16 12:58:38.664023+00	
00000000-0000-0000-0000-000000000000	086a3248-14d6-4544-ae69-7883cfb2470b	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-19 23:09:31.151602+00	
00000000-0000-0000-0000-000000000000	e22532e3-5dd2-41d1-a8fe-6306dda67deb	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-19 23:09:31.162858+00	
00000000-0000-0000-0000-000000000000	86b4987e-b5c0-4bb7-a323-c4467f32f9a7	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-01-20 13:30:56.612553+00	
00000000-0000-0000-0000-000000000000	1b16e443-4971-40d4-bc82-ccf505623910	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-01-20 13:30:56.626408+00	
00000000-0000-0000-0000-000000000000	514d5532-89f9-4354-8a7c-97119d98f3c6	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 13:41:22.034541+00	
00000000-0000-0000-0000-000000000000	0c36b180-a359-4eee-a25b-e2e4741e590e	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 13:41:55.578708+00	
00000000-0000-0000-0000-000000000000	70c49ee1-c884-4568-bf51-9ed1169864b2	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 13:47:35.423023+00	
00000000-0000-0000-0000-000000000000	e332499b-4f32-401d-b9d8-e5e9e480002c	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 13:49:15.308396+00	
00000000-0000-0000-0000-000000000000	8a938800-789e-42d3-b5a3-b0083f7b5e5a	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 14:29:16.373778+00	
00000000-0000-0000-0000-000000000000	c11f107e-3cdc-44f8-94ae-fd3a9334dc5b	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 14:42:58.728967+00	
00000000-0000-0000-0000-000000000000	fa4d235c-cca4-499d-b68e-70a08585b148	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 14:44:56.612672+00	
00000000-0000-0000-0000-000000000000	aeedc2f4-318b-438c-adc8-b4fe6be7b3c1	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 14:47:08.484944+00	
00000000-0000-0000-0000-000000000000	55f24630-154c-4c91-a7ef-c01e02dfd36e	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-20 14:48:05.732696+00	
00000000-0000-0000-0000-000000000000	84617529-a33a-4ca4-bb09-84e67a85eca8	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-20 14:48:05.73556+00	
00000000-0000-0000-0000-000000000000	1bbcd676-7576-43de-b73a-8f4944febe38	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 14:58:59.848873+00	
00000000-0000-0000-0000-000000000000	397f6f00-38f9-44cd-9e46-5819136f1df2	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 14:59:41.228747+00	
00000000-0000-0000-0000-000000000000	a47edb9f-8ef2-468f-ac9e-cf8f2f30b763	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:01:01.112048+00	
00000000-0000-0000-0000-000000000000	90e7d914-4fc6-4e55-8fb1-c041d225a812	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:01:47.756563+00	
00000000-0000-0000-0000-000000000000	07bfff02-4f4c-478e-9c7b-aeca1dea57ef	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:03:19.04106+00	
00000000-0000-0000-0000-000000000000	0038633d-4cf0-471c-ab93-bcda9ee18961	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:07:47.458109+00	
00000000-0000-0000-0000-000000000000	2ac1bf8a-9472-4409-ad72-39cb15a6d477	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:11:45.427279+00	
00000000-0000-0000-0000-000000000000	0aaf1894-ddb5-4144-82b2-3bdc41f11a57	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:18:04.849376+00	
00000000-0000-0000-0000-000000000000	755678d1-b439-4c02-b9bc-f3cc9273a7a7	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:37:29.227973+00	
00000000-0000-0000-0000-000000000000	de1b491d-3000-4c74-ae25-c9e47cfcc3ca	{"action":"user_signedup","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-01-20 15:39:27.96246+00	
00000000-0000-0000-0000-000000000000	e7adaf39-0c8e-4e8f-a975-3e6cdc5c4e25	{"action":"login","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:40:06.899181+00	
00000000-0000-0000-0000-000000000000	e28d0bfb-2e2f-428b-b795-3113287bf446	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:44:18.168317+00	
00000000-0000-0000-0000-000000000000	aef1e24b-efaa-46c4-afc1-009a90f2d47e	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:45:50.395881+00	
00000000-0000-0000-0000-000000000000	80280039-c688-430a-a215-09284521d43c	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:46:43.213101+00	
00000000-0000-0000-0000-000000000000	b3132bc1-8656-4532-988e-5ede99036f22	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:47:41.291396+00	
00000000-0000-0000-0000-000000000000	f9c83955-6ccc-44a4-ab05-2b994542d6da	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:48:25.36267+00	
00000000-0000-0000-0000-000000000000	b5ac05a5-37f8-4b24-8759-a064daa8c0e2	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-20 15:49:48.677238+00	
00000000-0000-0000-0000-000000000000	13ad2f99-2bb4-4576-b079-adc955b0a33b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-20 15:49:48.678244+00	
00000000-0000-0000-0000-000000000000	4bff5a22-aec7-4579-87e5-45d296244f55	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:49:52.613813+00	
00000000-0000-0000-0000-000000000000	c3e205cd-f5d9-408b-8ede-bb27d9691ea2	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:52:51.070069+00	
00000000-0000-0000-0000-000000000000	bd135d26-334e-4a66-b8ec-2f7414c9af5c	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:54:27.869951+00	
00000000-0000-0000-0000-000000000000	fe5da0a3-79a2-49a5-a8f6-bdc5a4fc7076	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 15:59:36.118742+00	
00000000-0000-0000-0000-000000000000	953ea84a-7e29-4fd3-9c06-b064b820b1cc	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 16:01:43.3282+00	
00000000-0000-0000-0000-000000000000	01c9a954-0f78-4850-955d-c57e8249237c	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 16:02:03.008413+00	
00000000-0000-0000-0000-000000000000	6becaafc-750c-4738-925d-d7aefab2b462	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 16:11:04.334501+00	
00000000-0000-0000-0000-000000000000	c1df01af-1581-4def-b457-b2c15c32416a	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-20 16:17:55.108419+00	
00000000-0000-0000-0000-000000000000	41d943f7-cb83-491c-91b8-664b7021adaf	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-01-21 13:55:02.106351+00	
00000000-0000-0000-0000-000000000000	d24cab64-93af-4130-90d4-ed92a86530b3	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-01-21 13:55:02.130151+00	
00000000-0000-0000-0000-000000000000	6256a3ac-30c2-4b0a-b13b-e377eb2bce11	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-01-21 14:54:01.663714+00	
00000000-0000-0000-0000-000000000000	a68f80c7-654c-44c8-a534-2796bb812998	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-01-21 14:54:01.666646+00	
00000000-0000-0000-0000-000000000000	5b99d336-ec2d-4311-98a9-c6960b4fd0ae	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:19:23.670885+00	
00000000-0000-0000-0000-000000000000	8ebd9b57-24c4-42b0-a421-79380b6682de	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:21:12.259558+00	
00000000-0000-0000-0000-000000000000	2f8f33b0-544c-43f5-a800-eb25a915776a	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:23:59.166608+00	
00000000-0000-0000-0000-000000000000	4759d4e3-12ce-4dc6-a3e4-b02b72588952	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:40:51.265636+00	
00000000-0000-0000-0000-000000000000	fe82f954-f637-49ee-b9d3-240d1899f65a	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:45:35.178273+00	
00000000-0000-0000-0000-000000000000	e67571f2-7b6c-4484-aea0-b71035021075	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:48:19.47762+00	
00000000-0000-0000-0000-000000000000	744e92f6-022e-4299-aa5c-c4da092cef61	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:48:48.967346+00	
00000000-0000-0000-0000-000000000000	7713d43b-3cce-4316-8ede-0ca26def7277	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-01-21 15:48:52.870927+00	
00000000-0000-0000-0000-000000000000	6cedce04-7cfa-4b7f-9e2b-93d1fae35e28	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:49:00.418949+00	
00000000-0000-0000-0000-000000000000	011b3cc1-c27d-4889-8a95-78e7423f687e	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-01-21 15:49:06.853135+00	
00000000-0000-0000-0000-000000000000	fb4bff20-2b56-4b38-b4e7-52891ede695a	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-21 15:49:24.159128+00	
00000000-0000-0000-0000-000000000000	57a230b0-28e9-44cd-8f74-c4fb57081ea2	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-21 15:49:24.161284+00	
00000000-0000-0000-0000-000000000000	bda464e3-0e6a-4f75-8418-fef1441c4019	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:49:30.700595+00	
00000000-0000-0000-0000-000000000000	4288d5dc-125b-4189-b62c-99fac0a08ec1	{"action":"login","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:50:44.375149+00	
00000000-0000-0000-0000-000000000000	e5d5b4a0-022e-479e-a7fb-317bbe4110b9	{"action":"login","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 15:50:58.261948+00	
00000000-0000-0000-0000-000000000000	65ca32f2-6889-4da7-8167-7b14c88256d7	{"action":"login","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:04:31.497372+00	
00000000-0000-0000-0000-000000000000	0d6c732e-20fc-4cc2-adb7-f35db8f2f67b	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:12:31.901118+00	
00000000-0000-0000-0000-000000000000	2633fd77-1aeb-4eeb-8a2e-8bd9fef2cbb3	{"action":"login","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:12:47.676558+00	
00000000-0000-0000-0000-000000000000	774bb3ff-0441-4de2-9833-b2e8e51fb12c	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:13:49.261038+00	
00000000-0000-0000-0000-000000000000	c1f58bd0-020e-412a-9747-8714faa93e3e	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:14:02.484502+00	
00000000-0000-0000-0000-000000000000	3e91f53b-952a-4174-bdb8-1993565ad65b	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:16:58.699822+00	
00000000-0000-0000-0000-000000000000	6f3adf35-b154-4dfa-8c27-729727db61ee	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:24:15.525444+00	
00000000-0000-0000-0000-000000000000	03a9135b-f2af-41aa-992a-5653e82b6089	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:25:09.363904+00	
00000000-0000-0000-0000-000000000000	566d6f92-1c2d-48a6-9eda-c505c03e0985	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:26:13.318102+00	
00000000-0000-0000-0000-000000000000	5e7c6770-318a-458a-85fd-29c9698cca17	{"action":"login","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:31:40.09604+00	
00000000-0000-0000-0000-000000000000	e9dc86c9-5f7e-4a74-96f0-3793603b47a7	{"action":"login","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:32:47.748615+00	
00000000-0000-0000-0000-000000000000	5bf4d285-37b5-4223-b0a5-4d9c09974707	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 16:39:47.106395+00	
00000000-0000-0000-0000-000000000000	df8bb881-625f-4a8b-ab0c-7abde2796641	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-21 17:12:20.646043+00	
00000000-0000-0000-0000-000000000000	3b982c9d-859f-451a-9f7e-0f6d428ddca9	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 17:12:46.138657+00	
00000000-0000-0000-0000-000000000000	561a8de1-0468-4215-a186-6b6ee6874a24	{"action":"token_refreshed","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-21 17:46:41.643126+00	
00000000-0000-0000-0000-000000000000	32b9fecf-c967-47c9-b3e0-5392c6dc6814	{"action":"token_revoked","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-21 17:46:41.649277+00	
00000000-0000-0000-0000-000000000000	de9e29bf-d3fe-4f27-89bb-5c64b433ef32	{"action":"token_refreshed","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-21 20:17:16.591163+00	
00000000-0000-0000-0000-000000000000	ade42702-4e02-4445-bb91-92301cc36e1c	{"action":"token_revoked","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-21 20:17:16.59359+00	
00000000-0000-0000-0000-000000000000	4173954b-b577-4e28-a1b4-956f2d3f0b18	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 20:55:28.139544+00	
00000000-0000-0000-0000-000000000000	041ab013-a8b7-4402-9fa9-e750bbfa82e8	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:14:00.542309+00	
00000000-0000-0000-0000-000000000000	3c14c1aa-2e01-4afa-bb49-1ff526bea22b	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:27:38.481809+00	
00000000-0000-0000-0000-000000000000	d17b3631-ebbd-4939-850d-e26a26329e2a	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:28:43.942287+00	
00000000-0000-0000-0000-000000000000	dc4f3f0e-32e2-4295-b0f6-f62438db56f5	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-01-21 21:28:56.26244+00	
00000000-0000-0000-0000-000000000000	501c0b5d-716f-4124-8f4e-0bd22e6ced70	{"action":"login","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:29:24.18577+00	
00000000-0000-0000-0000-000000000000	3d982124-da1c-4b0f-8814-15e4a651afa0	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:40:31.963576+00	
00000000-0000-0000-0000-000000000000	e8fe0c6b-8d46-4ec4-8dcd-0f8e0f66a688	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-01-21 21:40:38.758411+00	
00000000-0000-0000-0000-000000000000	eabf643b-72fd-4a33-8977-ce6ff27c0083	{"action":"login","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:40:50.729866+00	
00000000-0000-0000-0000-000000000000	ea024b16-ac58-4a92-bbf8-344047890e83	{"action":"logout","actor_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-21 21:41:08.183117+00	
00000000-0000-0000-0000-000000000000	bbb644fc-aa25-45b9-8b01-910a155ae7b5	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:41:16.506251+00	
00000000-0000-0000-0000-000000000000	2fc026a0-7823-4ce1-aef2-fa3c0ce15f42	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-01-21 21:41:21.0774+00	
00000000-0000-0000-0000-000000000000	df9ce7d0-c203-44cd-ac30-76a59b334024	{"action":"user_signedup","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-01-21 21:41:57.129148+00	
00000000-0000-0000-0000-000000000000	8c33cd7d-7e5e-4778-bf1c-4ea1b6f17435	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:42:57.184432+00	
00000000-0000-0000-0000-000000000000	92f07974-e96e-414d-9b41-dbddda4494c1	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:47:10.848406+00	
00000000-0000-0000-0000-000000000000	54ce02df-44c9-407c-86b5-96f7e6a02a0a	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sam135642@gmail.com","user_id":"fd0b66a8-2e57-4431-8d6b-2fadc5f97408","user_phone":""}}	2025-01-21 21:47:41.483344+00	
00000000-0000-0000-0000-000000000000	1cef0404-eddf-4c25-8249-f0f3d9914c54	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:48:17.255037+00	
00000000-0000-0000-0000-000000000000	5eff88cd-5576-4442-9d18-2e84dd70886b	{"action":"logout","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-21 21:48:26.591792+00	
00000000-0000-0000-0000-000000000000	dfe89dc0-60a9-4814-bea2-541b69954441	{"action":"user_signedup","actor_id":"fd41e914-9d40-403f-99bf-bbb411cfabdb","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-01-21 21:48:33.673833+00	
00000000-0000-0000-0000-000000000000	a005494a-312e-462b-ac2d-05deac552346	{"action":"logout","actor_id":"fd41e914-9d40-403f-99bf-bbb411cfabdb","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-21 21:48:44.1663+00	
00000000-0000-0000-0000-000000000000	fcc669d5-ca7e-452f-ac5b-d81df906d06c	{"action":"user_signedup","actor_id":"786bac5f-eac2-4660-bd50-2dbb243841a6","actor_name":"Sam Data","actor_username":"the.samedata@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-01-21 21:49:22.53838+00	
00000000-0000-0000-0000-000000000000	bc264f2a-1268-4506-9d98-368f1dcabaec	{"action":"login","actor_id":"fd41e914-9d40-403f-99bf-bbb411cfabdb","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:55:02.419244+00	
00000000-0000-0000-0000-000000000000	1e0f9276-e457-4a2e-93bb-037a2a4155a8	{"action":"logout","actor_id":"fd41e914-9d40-403f-99bf-bbb411cfabdb","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-21 21:55:10.844836+00	
00000000-0000-0000-0000-000000000000	4d48dc81-4d34-4f6c-a968-68e85be5ed82	{"action":"login","actor_id":"786bac5f-eac2-4660-bd50-2dbb243841a6","actor_name":"Sam Data","actor_username":"the.samedata@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 21:55:20.330498+00	
00000000-0000-0000-0000-000000000000	65c2f672-0c5f-4f43-80fe-3ceda2170430	{"action":"login","actor_id":"fd41e914-9d40-403f-99bf-bbb411cfabdb","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 22:01:39.916443+00	
00000000-0000-0000-0000-000000000000	9feee960-46b1-4155-982d-81794d241e87	{"action":"logout","actor_id":"fd41e914-9d40-403f-99bf-bbb411cfabdb","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-21 22:01:44.637527+00	
00000000-0000-0000-0000-000000000000	fcc5cbc1-2e46-439f-9d94-e24a3c3d5f00	{"action":"login","actor_id":"786bac5f-eac2-4660-bd50-2dbb243841a6","actor_name":"Sam Data","actor_username":"the.samedata@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 22:01:51.249176+00	
00000000-0000-0000-0000-000000000000	2c6f8a7c-b972-44a2-a4c9-08623a96b186	{"action":"logout","actor_id":"786bac5f-eac2-4660-bd50-2dbb243841a6","actor_name":"Sam Data","actor_username":"the.samedata@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-21 22:01:58.13039+00	
00000000-0000-0000-0000-000000000000	29db8418-e878-49ac-89a2-c554b2a4742a	{"action":"user_signedup","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-01-21 22:02:50.656313+00	
00000000-0000-0000-0000-000000000000	cb8d8300-d14b-4d3b-9fcd-d0eda79961c7	{"action":"login","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 22:05:26.514702+00	
00000000-0000-0000-0000-000000000000	6f220e01-fa9f-436c-b7ef-962db50b8c4c	{"action":"login","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 22:09:31.531764+00	
00000000-0000-0000-0000-000000000000	19c9e3cc-e009-499a-9e97-ae548244ec34	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-21 22:14:06.378743+00	
00000000-0000-0000-0000-000000000000	f5d27544-8af5-4aca-bd04-626d7f14f03c	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-21 23:24:45.526196+00	
00000000-0000-0000-0000-000000000000	8fbe9ab1-6b51-496b-8b0e-a9ec7924a0e8	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-21 23:24:45.529334+00	
00000000-0000-0000-0000-000000000000	d7102603-f18f-4181-94ca-a5497b7b6c2e	{"action":"token_refreshed","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-21 23:24:49.987386+00	
00000000-0000-0000-0000-000000000000	15eaf355-5777-4fbc-8a47-38bfdc04487f	{"action":"token_revoked","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-21 23:24:49.988022+00	
00000000-0000-0000-0000-000000000000	2ba906a4-682b-4b09-b267-bcc24a0ef192	{"action":"token_refreshed","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 08:50:53.061747+00	
00000000-0000-0000-0000-000000000000	1daa06e4-008e-44f4-92e3-ce35e6eae83f	{"action":"token_revoked","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 08:50:53.090869+00	
00000000-0000-0000-0000-000000000000	80121bfe-75b4-499d-ad7b-2c7ddc82559a	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-22 09:20:52.949341+00	
00000000-0000-0000-0000-000000000000	8b31140f-dee3-4e48-8044-259701f8c433	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 10:20:13.518841+00	
00000000-0000-0000-0000-000000000000	fec547bf-5d5f-49c3-b02d-23a90f0ec056	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 10:20:13.522358+00	
00000000-0000-0000-0000-000000000000	2b088da0-811c-412a-b41e-368e51b96b0e	{"action":"token_refreshed","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 10:41:24.325637+00	
00000000-0000-0000-0000-000000000000	543f1d37-0283-42f9-a383-8e223b077d29	{"action":"token_revoked","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 10:41:24.328609+00	
00000000-0000-0000-0000-000000000000	e381e6f4-8d8d-4ee6-aa6b-a3759fa58fd3	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 11:22:20.247067+00	
00000000-0000-0000-0000-000000000000	7ea42843-11f4-47e4-8f50-861190c66e29	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 11:22:20.249989+00	
00000000-0000-0000-0000-000000000000	63ae0c41-32a2-4dc3-9022-50b713d954be	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 15:17:47.200445+00	
00000000-0000-0000-0000-000000000000	1bd0dd7e-45f9-4b7b-9396-04242357c89b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 15:17:47.215727+00	
00000000-0000-0000-0000-000000000000	75f0c367-cca2-43c8-bc5c-5a9dc51141e4	{"action":"token_refreshed","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 15:33:30.893237+00	
00000000-0000-0000-0000-000000000000	fe6b5171-b8ba-4832-b169-f50784ea1fda	{"action":"token_revoked","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 15:33:30.894231+00	
00000000-0000-0000-0000-000000000000	f58475d9-e84f-453b-b863-033ea1de1228	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 16:21:00.331127+00	
00000000-0000-0000-0000-000000000000	7472261e-b14b-4447-a26f-38e8ea2af5b4	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 16:21:00.332961+00	
00000000-0000-0000-0000-000000000000	f0a1e128-c657-4b18-98ae-a93aa3839e06	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 18:58:34.093723+00	
00000000-0000-0000-0000-000000000000	4463e1ae-ae1f-4498-bd30-3c9284e7e6ce	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 18:58:34.104548+00	
00000000-0000-0000-0000-000000000000	f1ad8c27-208a-4a48-9512-a754285fa2e8	{"action":"token_refreshed","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 19:42:00.810738+00	
00000000-0000-0000-0000-000000000000	ba4e378c-e752-4e74-90f7-672ee5e2388b	{"action":"token_revoked","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 19:42:00.811724+00	
00000000-0000-0000-0000-000000000000	e90ea7dd-ac8b-4b0d-910b-e99c22968fae	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 20:00:50.801815+00	
00000000-0000-0000-0000-000000000000	b4ba70cf-2840-4ac0-9cd3-f278226a281e	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-22 20:00:50.802729+00	
00000000-0000-0000-0000-000000000000	d6d28303-2af7-474e-8e30-8479ad83f84d	{"action":"logout","actor_id":"ebe4bda0-22a0-4848-a6f7-0deeb303e96a","actor_name":"photo Sam","actor_username":"the.samphotoo@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-22 20:14:49.140835+00	
00000000-0000-0000-0000-000000000000	8b48e08b-8a1a-4586-99b4-0af210fbf10f	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-22 20:14:58.031658+00	
00000000-0000-0000-0000-000000000000	9a113b14-01f4-4217-b341-674af0b723e6	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-22 20:21:28.5223+00	
00000000-0000-0000-0000-000000000000	ccf1fa8e-6909-499f-a7b5-c6d359cddde7	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-22 20:21:38.819335+00	
00000000-0000-0000-0000-000000000000	adab80ab-1ede-4d90-84a9-294f1a7362d4	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-22 20:45:21.40869+00	
00000000-0000-0000-0000-000000000000	9cf67155-bdce-44c8-ace3-5e6a0820331c	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-22 20:51:42.353311+00	
00000000-0000-0000-0000-000000000000	4e21ed28-6503-4943-bb0f-17df5fd60832	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-23 09:56:30.514609+00	
00000000-0000-0000-0000-000000000000	0a18e0c8-1e6f-4e11-83c5-7b8fcb8013e2	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-23 09:56:30.530501+00	
00000000-0000-0000-0000-000000000000	b7e8ae28-d28e-49ba-827e-ea1f286121e0	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-23 11:24:16.577017+00	
00000000-0000-0000-0000-000000000000	d2993e4a-b192-4651-a9bf-db1c931f6928	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-23 11:24:16.584529+00	
00000000-0000-0000-0000-000000000000	6c7d3a94-9694-4939-af8f-9cf819d7ef0c	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-23 11:40:34.883664+00	
00000000-0000-0000-0000-000000000000	fa2ee166-f20d-4c3e-99c3-6df8e55fdb3b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-23 11:40:34.886075+00	
00000000-0000-0000-0000-000000000000	fceeb5db-63f9-4a48-9937-c28b421a63c7	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-23 12:29:57.641856+00	
00000000-0000-0000-0000-000000000000	604d7d25-beed-4221-b956-dc56dc827532	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-01-23 12:29:57.644709+00	
00000000-0000-0000-0000-000000000000	6d34a9fb-2c9a-47b0-acb3-5af4b45a2da7	{"action":"logout","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:30:19.569331+00	
00000000-0000-0000-0000-000000000000	433d4f08-5c5d-4879-8c40-86116ff707a4	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:30:35.916616+00	
00000000-0000-0000-0000-000000000000	e5aa8eac-5bc4-4479-8ac6-2ca325837153	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:30:49.335992+00	
00000000-0000-0000-0000-000000000000	8f7cf5ad-58aa-405f-b578-9891a9475204	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:40:04.711063+00	
00000000-0000-0000-0000-000000000000	327e4079-086c-46ff-a283-5ffcf95e6d3c	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:40:33.716848+00	
00000000-0000-0000-0000-000000000000	45f142c3-ad3f-419b-ae54-c7cfa99d79c8	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:40:45.061727+00	
00000000-0000-0000-0000-000000000000	154a0216-d8f4-4aeb-8525-70eeb56b3088	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:40:51.851841+00	
00000000-0000-0000-0000-000000000000	232f28a4-1a87-43cc-980b-29299675658a	{"action":"logout","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:41:07.084272+00	
00000000-0000-0000-0000-000000000000	7ea416a9-e1b6-4ffb-a032-afd8597c781e	{"action":"login","actor_id":"fd41e914-9d40-403f-99bf-bbb411cfabdb","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:41:15.488368+00	
00000000-0000-0000-0000-000000000000	cd5d36d4-d2e6-44e9-bc02-e071b5af64ae	{"action":"logout","actor_id":"fd41e914-9d40-403f-99bf-bbb411cfabdb","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:41:37.439903+00	
00000000-0000-0000-0000-000000000000	f075f2d5-0e38-40ab-9719-69989b42c6b3	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:42:07.281951+00	
00000000-0000-0000-0000-000000000000	c3c45295-95af-4068-863e-4c9aee35daf3	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:46:53.401881+00	
00000000-0000-0000-0000-000000000000	59062a4d-b19f-432f-b207-8eb34704f91f	{"action":"login","actor_id":"fd41e914-9d40-403f-99bf-bbb411cfabdb","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:46:59.338619+00	
00000000-0000-0000-0000-000000000000	9281844e-abd6-4fd6-a9c9-b1fb2bf6e1c7	{"action":"logout","actor_id":"fd41e914-9d40-403f-99bf-bbb411cfabdb","actor_name":"s am","actor_username":"sam135642@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:47:08.395599+00	
00000000-0000-0000-0000-000000000000	68adece5-5cc1-4cbb-8c04-ed8e31d1d2f3	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:47:15.160827+00	
00000000-0000-0000-0000-000000000000	3c90a1a2-0d4c-4ef4-81ff-305cbc8e58aa	{"action":"logout","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:47:23.35597+00	
00000000-0000-0000-0000-000000000000	306e9171-3ea8-4437-8bb8-b60d8fdf8169	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:47:28.252226+00	
00000000-0000-0000-0000-000000000000	97b46637-a14c-4b58-ba27-72808538a980	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:49:09.958717+00	
00000000-0000-0000-0000-000000000000	dad986ab-3cef-4299-b419-0fc769a76d4c	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:49:19.33739+00	
00000000-0000-0000-0000-000000000000	b1e3cdf2-0d25-471c-bcdc-9ed68435de9f	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:49:28.163474+00	
00000000-0000-0000-0000-000000000000	35e866da-6a8b-4bf5-a377-11425db26e65	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:49:34.87833+00	
00000000-0000-0000-0000-000000000000	8d6b797b-f870-4146-8ea7-92de73d1e2b8	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 12:52:00.039262+00	
00000000-0000-0000-0000-000000000000	0f10ec56-0e4a-4cd8-8f3d-203ea605452e	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 12:52:14.887761+00	
00000000-0000-0000-0000-000000000000	c758c4b3-188e-4e95-b42f-991ea1447ccd	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-23 13:40:12.461735+00	
00000000-0000-0000-0000-000000000000	12377d3e-bd07-4279-8274-e7cc1941a01e	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-01-23 13:44:13.221943+00	
00000000-0000-0000-0000-000000000000	4fbb6306-1107-4608-ad74-94f82614e7e7	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-31 22:31:55.50334+00	
00000000-0000-0000-0000-000000000000	aff33672-52a0-46da-8aff-1bb788a3bf40	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-01-31 22:42:45.070502+00	
00000000-0000-0000-0000-000000000000	2bfebb1a-e1de-4c19-985b-30f4ef761f83	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-01 08:57:47.822866+00	
00000000-0000-0000-0000-000000000000	b4df87e2-ffa0-4757-83cd-798d851cac03	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-01 08:57:47.839634+00	
00000000-0000-0000-0000-000000000000	9c32bc15-93c5-4554-afdf-c25e23551f25	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-01 08:57:53.956478+00	
00000000-0000-0000-0000-000000000000	c6c02c1a-08e2-42e0-9a0a-22bdbcf9adc5	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-01 08:58:05.211683+00	
00000000-0000-0000-0000-000000000000	b7283495-d11b-4953-b725-9586dc075230	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-01 09:00:38.352193+00	
00000000-0000-0000-0000-000000000000	c229d75b-fa36-4ba8-acad-e85739968d70	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-01 09:00:38.353081+00	
00000000-0000-0000-0000-000000000000	458f63d6-e294-4bf5-bca8-0ef9ed3217ec	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-01 09:03:49.197942+00	
00000000-0000-0000-0000-000000000000	95d997de-f903-4dd4-9706-f439eb18c004	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-01 09:04:00.604703+00	
00000000-0000-0000-0000-000000000000	0c8b9df6-3350-47bf-b23f-20c29f10cc37	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-01 11:37:08.760482+00	
00000000-0000-0000-0000-000000000000	28563905-b5c1-4d4e-9fc9-785364a2fc73	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-01 11:37:08.762189+00	
00000000-0000-0000-0000-000000000000	f2e8f43e-ed93-4610-b9a4-306acb2ca555	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-01 12:42:21.602611+00	
00000000-0000-0000-0000-000000000000	5258f8aa-3242-4783-929a-aba034ac85b6	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-01 12:42:21.604927+00	
00000000-0000-0000-0000-000000000000	42ba12ee-6d8e-4f41-bfa9-7a920a20cc95	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-01 13:16:02.697504+00	
00000000-0000-0000-0000-000000000000	1bf8b033-40d9-412d-81c9-41c403549a78	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-01 13:45:21.787535+00	
00000000-0000-0000-0000-000000000000	30e455ad-1fb6-49d0-a25b-8f82bf515148	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-01 13:45:21.789142+00	
00000000-0000-0000-0000-000000000000	d7fff893-f4f4-4298-9710-0e0b90caad30	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-01 14:52:40.317575+00	
00000000-0000-0000-0000-000000000000	62bac9bc-cf29-456e-8f07-af64f47a7588	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-01 14:52:40.319541+00	
00000000-0000-0000-0000-000000000000	27872fd6-87f3-41ec-981e-7e1325ea27b3	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-01 14:53:04.427502+00	
00000000-0000-0000-0000-000000000000	474fb57c-44dc-40b1-8b36-21afcd36c335	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-01 14:53:04.428167+00	
00000000-0000-0000-0000-000000000000	b281e074-ffe2-4177-8a62-b5524bee7271	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-01 16:56:18.874986+00	
00000000-0000-0000-0000-000000000000	0a6ea22e-ed51-4b15-b805-bcd517801eca	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-01 16:56:18.875951+00	
00000000-0000-0000-0000-000000000000	4f42a0c4-30e9-47d7-83f6-18c45aeea583	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-01 18:13:24.115549+00	
00000000-0000-0000-0000-000000000000	a74a7ad4-1ddb-4c40-95b5-7c262048202a	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-01 18:13:24.117527+00	
00000000-0000-0000-0000-000000000000	c0e7b976-f9f6-42dc-ab2c-f5e6a3891cf5	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-03 13:33:20.724215+00	
00000000-0000-0000-0000-000000000000	74d3d119-0d56-4196-92de-7b59e6c84c7c	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-03 13:33:20.7397+00	
00000000-0000-0000-0000-000000000000	8a587bdf-8c2f-4df9-a39f-dd409e933ca1	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-03 16:03:39.318628+00	
00000000-0000-0000-0000-000000000000	691b51a6-df11-421c-8ff6-2186e4db87d3	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-03 16:03:39.324435+00	
00000000-0000-0000-0000-000000000000	26382b67-a545-4b0f-af99-016c6a009dbc	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-03 17:48:09.894485+00	
00000000-0000-0000-0000-000000000000	98c4d259-e86c-4cae-9667-45c25d4130b1	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-03 17:48:09.896883+00	
00000000-0000-0000-0000-000000000000	af212fa3-f207-485b-8285-4885e061b623	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-05 09:36:24.979488+00	
00000000-0000-0000-0000-000000000000	da7e0c8f-f87e-4bf1-9fe9-95dd8757915c	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-05 09:36:24.998672+00	
00000000-0000-0000-0000-000000000000	b0118012-ef3a-4a32-9156-463a7d8b0d84	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-02-05 09:36:30.537424+00	
00000000-0000-0000-0000-000000000000	9934b558-c401-48d3-a4e7-0ca09e21b48f	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-05 09:36:38.028476+00	
00000000-0000-0000-0000-000000000000	58b41ec7-7632-471d-9802-479eb4850561	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-02-05 09:36:42.170923+00	
00000000-0000-0000-0000-000000000000	0575cc1a-bbc6-4ea0-b0b6-e7d376f47721	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-05 09:37:03.482967+00	
00000000-0000-0000-0000-000000000000	e2067255-443a-4dd8-af81-defe06456935	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}	2025-02-05 09:54:15.137727+00	
00000000-0000-0000-0000-000000000000	eb6fd6c2-6eec-47c4-bd9f-626fd34836f5	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-05 09:54:22.050157+00	
00000000-0000-0000-0000-000000000000	0d3e474a-6829-47f5-96b8-4f020d3bf491	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}	2025-02-05 09:54:24.638691+00	
00000000-0000-0000-0000-000000000000	259a0b7b-04d8-49f7-b130-a55b54d8b687	{"action":"logout","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-05 09:54:44.456892+00	
00000000-0000-0000-0000-000000000000	7540adb6-f857-49ad-aaf8-6441ad166421	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}	2025-02-05 09:54:48.013436+00	
00000000-0000-0000-0000-000000000000	0f433e67-c809-4d27-8eb3-464496c082ab	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-05 09:54:53.465173+00	
00000000-0000-0000-0000-000000000000	641e5f7f-a623-44d5-8de4-3445ad031ee1	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-05 10:22:52.161173+00	
00000000-0000-0000-0000-000000000000	fafba07b-42a0-4ddd-9798-f9d5eb9b5ce9	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-02-05 10:22:55.936446+00	
00000000-0000-0000-0000-000000000000	029a1363-abfc-41b8-9c4b-0c114bf0a41a	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}	2025-02-05 10:23:00.43263+00	
00000000-0000-0000-0000-000000000000	072ed149-4c37-4c12-9f7d-f312b719b1a2	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-05 10:23:04.492774+00	
00000000-0000-0000-0000-000000000000	48d5ba8e-8837-4015-83e2-caeb546d7081	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}	2025-02-05 10:23:07.191812+00	
00000000-0000-0000-0000-000000000000	12c03c7d-abb0-4866-bd2f-f27f82b9d9ef	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-05 10:23:21.60569+00	
00000000-0000-0000-0000-000000000000	6ce98ef6-c183-43d9-b167-c5428a8ad3a9	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-05 13:04:11.579329+00	
00000000-0000-0000-0000-000000000000	858fbaa2-e6c9-4fd6-8bd3-b3449e61cefc	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-02-05 13:04:15.869786+00	
00000000-0000-0000-0000-000000000000	f3883fc7-90ff-4e48-b356-ebed2e75e888	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}	2025-02-05 13:04:22.245064+00	
00000000-0000-0000-0000-000000000000	ebc41e69-2f2d-491a-9efc-1abd54dfea0d	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-05 13:04:26.558787+00	
00000000-0000-0000-0000-000000000000	47f9a84b-a924-4600-ab9a-05480b60d751	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}	2025-02-05 13:04:49.936646+00	
00000000-0000-0000-0000-000000000000	25837468-f48f-4615-b144-2bf0844f4ae8	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-05 13:04:55.085065+00	
00000000-0000-0000-0000-000000000000	5bfee98c-5f66-4f9c-ac8c-af9fecd1c5cc	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-05 13:05:02.417882+00	
00000000-0000-0000-0000-000000000000	9ed5fb12-486d-4cdc-9abf-aa36bfb90c62	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-05 13:05:07.111869+00	
00000000-0000-0000-0000-000000000000	8ae5ab88-abc0-46e0-a25e-30e5bc2b5add	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-05 13:06:31.156968+00	
00000000-0000-0000-0000-000000000000	d671d590-3657-4813-ab83-1d518d1f7ede	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-05 13:07:37.278002+00	
00000000-0000-0000-0000-000000000000	9df009b1-c1e5-41de-b023-c2d24364ebe5	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-05 14:16:27.923784+00	
00000000-0000-0000-0000-000000000000	6839d635-35f4-4717-a8e1-2950b3f44b78	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-05 14:16:27.927925+00	
00000000-0000-0000-0000-000000000000	54df9e93-7549-4816-b2f6-1e13dc4493c9	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-05 14:16:34.833373+00	
00000000-0000-0000-0000-000000000000	6587a034-f150-4623-93b7-c9a5d41c4aad	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-05 14:16:34.834055+00	
00000000-0000-0000-0000-000000000000	886ca027-22cc-4648-9cdf-09937bf52188	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-05 15:20:58.037139+00	
00000000-0000-0000-0000-000000000000	ad18d85a-02b0-4ede-9f8c-27c5c3e862f1	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-05 15:20:58.041755+00	
00000000-0000-0000-0000-000000000000	023da515-f6cf-491a-bdcb-c210a1867c61	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-05 15:22:11.671271+00	
00000000-0000-0000-0000-000000000000	64132392-da30-4b91-ab51-5eefd20f8961	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-05 15:22:11.672448+00	
00000000-0000-0000-0000-000000000000	85688118-3170-4985-9594-e2dd0a3454eb	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-05 16:42:03.787604+00	
00000000-0000-0000-0000-000000000000	aaa0196e-53ac-4907-9850-16ebdcb870bf	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-05 16:42:03.791146+00	
00000000-0000-0000-0000-000000000000	2afb5dfc-5f11-4d6c-8286-c1f98df75d45	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-06 12:41:53.564127+00	
00000000-0000-0000-0000-000000000000	7f77773c-5bb4-4961-ba2a-1e6ee5d7e9f6	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-06 12:41:53.585703+00	
00000000-0000-0000-0000-000000000000	1d21f3e7-5d08-4cfc-b539-1df8bb38fa55	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-06 13:34:20.836333+00	
00000000-0000-0000-0000-000000000000	79ea2e2f-0e35-44da-84e8-25111a7189e5	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-06 13:34:20.840493+00	
00000000-0000-0000-0000-000000000000	030abcd3-fd35-4b4f-9abc-635e568a867d	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-06 15:41:09.886428+00	
00000000-0000-0000-0000-000000000000	f0dd3f9a-1ed6-45ac-ba87-0613f373f6a4	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-06 15:41:09.890123+00	
00000000-0000-0000-0000-000000000000	23626e34-2a24-417a-afd2-dd719572f62c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-08 13:13:47.584767+00	
00000000-0000-0000-0000-000000000000	ca3b90a0-a2f8-43b6-a1d6-de94259d716c	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-08 13:13:47.610499+00	
00000000-0000-0000-0000-000000000000	0dcbe402-3b8d-4d12-8c2e-2256234dac56	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-08 13:29:32.011118+00	
00000000-0000-0000-0000-000000000000	50ab3cf8-c36e-4750-8377-dc7b90ed3bb0	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-08 13:29:32.014371+00	
00000000-0000-0000-0000-000000000000	077cab3e-c522-4961-bf8c-1d28b7d97c27	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-08 13:29:35.331113+00	
00000000-0000-0000-0000-000000000000	86242ea6-660c-4962-ad9c-274670dd1c6b	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-08 14:36:03.135703+00	
00000000-0000-0000-0000-000000000000	de4777d8-753f-4fc2-a783-555a72402500	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-08 14:36:03.138601+00	
00000000-0000-0000-0000-000000000000	a2483a3f-6f92-4018-afb4-76ae0843d594	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-08 15:17:51.693587+00	
00000000-0000-0000-0000-000000000000	cd83dea1-3133-4b14-a10b-bc386ba23eb6	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-08 15:18:03.02997+00	
00000000-0000-0000-0000-000000000000	3064520d-3e79-404b-a5fa-eb539fd020cc	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-08 15:18:42.300204+00	
00000000-0000-0000-0000-000000000000	52b9654f-9197-448e-81a4-7bc618f760b9	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}	2025-02-08 15:18:45.085151+00	
00000000-0000-0000-0000-000000000000	5a8463d7-79f6-40f9-8b73-0ead4878fd68	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-08 15:19:01.808159+00	
00000000-0000-0000-0000-000000000000	0a9297c8-cd06-46cd-88f5-d3cb2104c0c1	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-08 15:19:01.811749+00	
00000000-0000-0000-0000-000000000000	73ca1f20-6f2b-48bc-a467-ffa3ecc80bb7	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-02-08 15:19:12.356114+00	
00000000-0000-0000-0000-000000000000	ddad7ec0-6a14-4cd0-8048-80d90e55224d	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-08 15:19:18.550166+00	
00000000-0000-0000-0000-000000000000	e72825ed-b2e2-489b-98ad-0af547690c0c	{"action":"logout","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-08 15:19:22.215133+00	
00000000-0000-0000-0000-000000000000	d0275e2b-e535-4a39-83e1-7a84eaf66d47	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-08 15:33:20.776512+00	
00000000-0000-0000-0000-000000000000	4396689c-65eb-4bda-b66b-0b888458b45a	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-08 16:26:35.828629+00	
00000000-0000-0000-0000-000000000000	74d7bf1d-aceb-4fb3-af59-34f60ffc56b9	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-08 16:26:35.840401+00	
00000000-0000-0000-0000-000000000000	be3afbdc-6b7a-4dff-a662-14b8ba42fc0a	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-09 18:25:05.707677+00	
00000000-0000-0000-0000-000000000000	e34a3483-1001-4092-ab55-91d39b893da0	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-09 18:25:05.726057+00	
00000000-0000-0000-0000-000000000000	967a7c38-fc60-4d0c-a9f1-2f279ce59e1c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-09 18:28:28.239798+00	
00000000-0000-0000-0000-000000000000	94fcee43-ce2b-46b7-965c-ba8ac3020dd4	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-09 18:28:28.242382+00	
00000000-0000-0000-0000-000000000000	44ce370d-f8f5-4f54-8261-7667f664fb48	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-09 19:25:01.226181+00	
00000000-0000-0000-0000-000000000000	da4d7d09-8eaa-4a7a-97d0-9dcadd5896a8	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-09 19:25:01.232167+00	
00000000-0000-0000-0000-000000000000	c61b7197-d9f3-4212-be68-34c25279c6b4	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-09 19:45:15.186509+00	
00000000-0000-0000-0000-000000000000	f261a419-b669-4ccc-9af4-d42b98588b4b	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-09 19:45:15.189941+00	
00000000-0000-0000-0000-000000000000	c2bb9054-fe46-4120-9f71-24be331798d2	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-09 20:25:36.103233+00	
00000000-0000-0000-0000-000000000000	3813f9b1-a75a-4438-9f68-61058cf2a496	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-09 20:25:36.10804+00	
00000000-0000-0000-0000-000000000000	02891a80-25ec-487c-993f-f0d39eb6e42f	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-09 20:45:24.274015+00	
00000000-0000-0000-0000-000000000000	3b0c29eb-199c-4005-a47f-92f117d42661	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-09 20:45:24.276344+00	
00000000-0000-0000-0000-000000000000	58214563-e3ae-414d-8253-590242fabf8a	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-09 21:25:28.069156+00	
00000000-0000-0000-0000-000000000000	a85db969-89f9-4069-86d4-97cb028b4402	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-09 21:25:28.073483+00	
00000000-0000-0000-0000-000000000000	98c14511-565e-45d8-a0bf-5cb9a12e0e0e	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-09 21:50:30.992129+00	
00000000-0000-0000-0000-000000000000	5759df35-165c-4a83-8623-682d1e22559a	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-09 21:50:30.994148+00	
00000000-0000-0000-0000-000000000000	5c1adb03-1013-47a9-bb57-ba009d814c8e	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-09 22:29:54.597942+00	
00000000-0000-0000-0000-000000000000	4d9c5aef-557f-48ed-af18-52530aca57ff	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-09 22:29:54.60083+00	
00000000-0000-0000-0000-000000000000	4edd7f17-2d36-4ac7-aa2f-36c9fab98d1c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-09 22:50:16.950252+00	
00000000-0000-0000-0000-000000000000	b947ed53-18e5-4ade-810e-181fc6d95aa6	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-09 22:50:16.952774+00	
00000000-0000-0000-0000-000000000000	8cdfa193-9812-4f45-af83-1d7463fa10ac	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-09 23:01:03.919681+00	
00000000-0000-0000-0000-000000000000	67c37812-22ef-4032-a981-d0604c4713f6	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-10 10:29:23.306289+00	
00000000-0000-0000-0000-000000000000	fdca359e-f294-4ce3-9bb2-5a2e52791171	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-10 10:29:23.326179+00	
00000000-0000-0000-0000-000000000000	0fdcdc55-76e4-435e-8b2a-6cd9f8d34cbe	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-10 12:10:37.300964+00	
00000000-0000-0000-0000-000000000000	c5f98cff-e160-4f59-b390-8656ea07f997	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-10 12:10:37.303892+00	
00000000-0000-0000-0000-000000000000	a4060c8c-acdd-4fa7-b827-7b2445364be9	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-10 13:16:53.754183+00	
00000000-0000-0000-0000-000000000000	c4e2fb5d-0d58-42ec-880c-1b06816488ad	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-10 13:16:53.756926+00	
00000000-0000-0000-0000-000000000000	fa95aba1-068e-423c-8478-3434dee07a70	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-10 15:57:45.483075+00	
00000000-0000-0000-0000-000000000000	7109179a-a7e7-4f64-b61d-e7335bbd75e4	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-10 15:57:45.485356+00	
00000000-0000-0000-0000-000000000000	82a8d90d-6206-4f02-8dc7-43351f16818e	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-10 16:12:14.201755+00	
00000000-0000-0000-0000-000000000000	a933f064-4667-4fba-bd8f-3ded257834cb	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-10 16:12:14.203678+00	
00000000-0000-0000-0000-000000000000	c947a53a-d8b0-4c58-afda-213aea25c54d	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-10 17:11:03.611509+00	
00000000-0000-0000-0000-000000000000	2a8cd57e-3851-43de-97de-19790e8f270d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-10 17:11:03.618399+00	
00000000-0000-0000-0000-000000000000	dbaf1c54-37ec-4424-87ec-62077fe86b07	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-10 21:35:53.816318+00	
00000000-0000-0000-0000-000000000000	3c02240c-8d1b-410f-9d3f-b136e6bac330	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-10 21:35:53.827206+00	
00000000-0000-0000-0000-000000000000	87fa7abb-5e9f-42a9-b0c9-cd490cfece62	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-10 23:38:16.551192+00	
00000000-0000-0000-0000-000000000000	09a4b8b1-5136-4e5e-a10e-d4b810fffd8a	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-10 23:38:16.554648+00	
00000000-0000-0000-0000-000000000000	3514e648-4f05-4547-bec6-95aff0519601	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-11 10:04:12.540195+00	
00000000-0000-0000-0000-000000000000	5ae65ccd-6550-405d-b820-c7446f1b10fa	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-11 10:04:12.556655+00	
00000000-0000-0000-0000-000000000000	abe8bdb1-a4ed-457c-8c88-1d673e023c96	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-11 10:19:41.706165+00	
00000000-0000-0000-0000-000000000000	d56bdb29-46a0-408e-82c2-9649ec9b473c	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-11 10:19:41.713147+00	
00000000-0000-0000-0000-000000000000	ce827ccf-9904-4a6f-85c2-4b3243fa2c1a	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-02-11 10:19:47.01679+00	
00000000-0000-0000-0000-000000000000	325fc6d7-b35c-4dbb-952b-a3b5d16bddbd	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}	2025-02-11 10:19:49.998862+00	
00000000-0000-0000-0000-000000000000	04d195d9-7ea6-4768-be72-7299a7fed83f	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-11 10:19:54.759212+00	
00000000-0000-0000-0000-000000000000	75cc1a55-8d33-4c99-bd3e-4f5984643705	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-11 10:20:01.856865+00	
00000000-0000-0000-0000-000000000000	a7fd039b-b3d5-4470-bbf1-821c2ccdca31	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-11 11:21:27.644091+00	
00000000-0000-0000-0000-000000000000	948524c1-fad0-4c3a-b45b-adadb45b7912	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-11 11:21:27.648195+00	
00000000-0000-0000-0000-000000000000	fc6885c8-23af-4970-a0ec-7d5e1d14991d	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-02-11 11:21:30.226395+00	
00000000-0000-0000-0000-000000000000	7ae7604f-36d0-48db-9acf-a0daf4de8b09	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-11 11:21:40.035988+00	
00000000-0000-0000-0000-000000000000	a4bfed78-c94a-4efe-921e-8b74218abbb9	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-11 12:27:56.894625+00	
00000000-0000-0000-0000-000000000000	338ca1df-359b-4393-be17-1aa0d15f45b6	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-11 12:27:56.897959+00	
00000000-0000-0000-0000-000000000000	50486068-1e25-4950-83e6-733fe4bd9377	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-27 09:28:15.158462+00	
00000000-0000-0000-0000-000000000000	5d33cd27-ddd0-4444-9089-1ebfa5550bd6	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-13 14:59:37.894658+00	
00000000-0000-0000-0000-000000000000	0dc07afc-8f16-4f38-ae25-5f326338ef55	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-13 14:59:37.921813+00	
00000000-0000-0000-0000-000000000000	49646aaf-96f1-46b2-b730-0963474f06d3	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-13 16:37:00.615909+00	
00000000-0000-0000-0000-000000000000	1382f790-a703-4bf7-a11a-6c5abf1b14d7	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-13 16:37:00.630951+00	
00000000-0000-0000-0000-000000000000	b9663c4f-b374-4090-952d-9778aa40c5eb	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-13 19:02:24.284381+00	
00000000-0000-0000-0000-000000000000	a220d646-d3b7-4410-a0d9-08f0b1793de0	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-13 19:02:24.287984+00	
00000000-0000-0000-0000-000000000000	cb2e265a-be5a-4383-8d7e-a9acf8123bf4	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 02:13:31.678241+00	
00000000-0000-0000-0000-000000000000	367ea2cd-8143-4367-a0ae-3df0a6bafb8a	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 02:13:31.687194+00	
00000000-0000-0000-0000-000000000000	61434253-485c-41d9-9f31-b83d4ee913ca	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 08:37:27.532318+00	
00000000-0000-0000-0000-000000000000	a5aa0d3d-5852-4f6f-b548-c3a85af928c5	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 08:37:27.556329+00	
00000000-0000-0000-0000-000000000000	4c07dbae-159a-4796-9148-3f1dec9bb6d5	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 09:38:27.922447+00	
00000000-0000-0000-0000-000000000000	696a3533-c335-4e40-9c72-0c0bd73b62de	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 09:38:27.925905+00	
00000000-0000-0000-0000-000000000000	3791366d-2c72-435e-a4a3-da893ed929dc	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 10:40:37.470584+00	
00000000-0000-0000-0000-000000000000	9413c1a3-7251-4e18-a474-c18697e8f524	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 10:40:37.473034+00	
00000000-0000-0000-0000-000000000000	ada0a8c2-7e22-4f99-ae74-e8a11de496d0	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-14 11:03:52.179361+00	
00000000-0000-0000-0000-000000000000	3cab52d5-a242-4d5a-9028-54dde9cc5505	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-14 12:48:37.95569+00	
00000000-0000-0000-0000-000000000000	7010f7b3-53fd-4f28-9b7e-8aa9f4ca636d	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-14 12:48:37.960507+00	
00000000-0000-0000-0000-000000000000	6fb7a94a-0fac-460e-a30c-1ed81d67e999	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 13:08:30.407592+00	
00000000-0000-0000-0000-000000000000	dfdc68a9-6549-41e3-93ed-0532f71c3383	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 13:08:30.411976+00	
00000000-0000-0000-0000-000000000000	071df276-5513-43ae-95d8-a4e83cbd23a9	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 14:08:54.575051+00	
00000000-0000-0000-0000-000000000000	9ec5715f-72da-4f97-9a9a-f653601ffe06	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-14 14:08:54.57899+00	
00000000-0000-0000-0000-000000000000	ea46cb26-d7d0-4d9c-a3dc-371a19e54b95	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-17 12:57:42.698103+00	
00000000-0000-0000-0000-000000000000	da11dd73-cc02-436b-bbaa-904752549084	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-17 12:57:42.708958+00	
00000000-0000-0000-0000-000000000000	a7255c8b-4aa6-4aad-9885-c3914e40e14e	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-18 10:03:08.832722+00	
00000000-0000-0000-0000-000000000000	3904831f-a244-4b26-b217-6ae94784e25f	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-18 10:03:08.846331+00	
00000000-0000-0000-0000-000000000000	0d636792-28d6-4b4b-81d1-ef06be30c341	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-18 10:21:41.269645+00	
00000000-0000-0000-0000-000000000000	33e83848-075e-4a9b-95a8-a91e8a166151	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 11:21:43.240209+00	
00000000-0000-0000-0000-000000000000	0fafaa1e-d963-468f-a742-8934b6e9e9f7	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 11:21:43.245167+00	
00000000-0000-0000-0000-000000000000	32bfc309-4719-4ec7-b797-2b5e8f2c57e1	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 12:30:00.544634+00	
00000000-0000-0000-0000-000000000000	f518e663-d2aa-4294-91df-e5afb327f774	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-06 09:32:59.302506+00	
00000000-0000-0000-0000-000000000000	6c30182c-75e6-4329-954c-3ff22eda1e08	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 12:30:00.55054+00	
00000000-0000-0000-0000-000000000000	324484ae-e2e3-4ea2-acdf-6621be947688	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 15:00:00.332783+00	
00000000-0000-0000-0000-000000000000	b19e7924-bcfe-4d9f-a735-fa98c4ad1a74	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 15:00:00.3497+00	
00000000-0000-0000-0000-000000000000	95fe33e5-e245-4b55-957f-8517afa4e523	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 16:00:02.351744+00	
00000000-0000-0000-0000-000000000000	830956d6-6290-4ddc-a923-573a5da2c984	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 16:00:02.356023+00	
00000000-0000-0000-0000-000000000000	428d2036-603d-49ff-aa13-7c1542defdd3	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 17:34:37.681713+00	
00000000-0000-0000-0000-000000000000	313dfab7-8629-4d8a-9b6a-8fddd006d0ce	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 17:34:37.684995+00	
00000000-0000-0000-0000-000000000000	0157c271-b1cd-41db-bd4f-5f66e04cebf9	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 18:50:23.265481+00	
00000000-0000-0000-0000-000000000000	7a7c8d2a-e686-443b-8624-1cf4a6c91c03	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-18 18:50:23.27336+00	
00000000-0000-0000-0000-000000000000	89f41760-7722-48bd-831d-f3c05b2e7c36	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-20 14:47:43.052516+00	
00000000-0000-0000-0000-000000000000	86728cc9-a275-4f7a-b248-830ec9c75953	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-20 15:49:11.810238+00	
00000000-0000-0000-0000-000000000000	1c6ecc7e-3770-4440-90ff-6df3f27c6977	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-20 15:49:11.827019+00	
00000000-0000-0000-0000-000000000000	ccd24b2a-670b-4c7e-819b-5e1829687387	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-20 17:24:01.402832+00	
00000000-0000-0000-0000-000000000000	5d5feee6-4a34-4c7d-b0bc-61982d8390cc	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-20 17:24:01.407631+00	
00000000-0000-0000-0000-000000000000	21a9b3d2-97fc-4ab5-877a-ac267be4cfeb	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-20 19:33:52.879878+00	
00000000-0000-0000-0000-000000000000	1573d763-2621-4cc1-ab7d-22df981fc1ee	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-20 19:33:52.892342+00	
00000000-0000-0000-0000-000000000000	15663631-d42e-421c-8d5a-4da2a7e6379d	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-21 14:17:18.669119+00	
00000000-0000-0000-0000-000000000000	497968c7-0ffb-461a-9d47-8237b8e1530d	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-21 14:17:18.683209+00	
00000000-0000-0000-0000-000000000000	f199c9d5-85fc-4061-9b10-6a166b848611	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-21 14:32:08.261783+00	
00000000-0000-0000-0000-000000000000	0b12da86-2c5d-4e73-aa95-9e0f0e41c7bf	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-21 14:32:08.270028+00	
00000000-0000-0000-0000-000000000000	c9bfe51d-b559-47c7-aca8-950f96d668a1	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-21 15:44:13.966668+00	
00000000-0000-0000-0000-000000000000	b92159c1-8bfa-419f-8bd0-6442a846556d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-21 15:44:13.973154+00	
00000000-0000-0000-0000-000000000000	f4e10184-ae43-4ede-90a5-79b8026cf76a	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-21 22:39:23.786516+00	
00000000-0000-0000-0000-000000000000	85fff338-d2ec-4464-a190-80640592cd5d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-21 22:39:23.808159+00	
00000000-0000-0000-0000-000000000000	f51cc804-8a12-4c7c-861a-0b868fc66e5c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-24 09:10:52.206357+00	
00000000-0000-0000-0000-000000000000	8dcf51d9-ebf3-4dd6-8332-bae9d923853b	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-24 09:10:52.21759+00	
00000000-0000-0000-0000-000000000000	50d1969e-4ac5-4418-9ecd-85ed66d7f501	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-26 13:38:42.554924+00	
00000000-0000-0000-0000-000000000000	e403aec1-b0cd-4ba1-bccf-7cc538a6e0fe	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-26 13:38:42.57547+00	
00000000-0000-0000-0000-000000000000	b9f07aa2-3983-4f8b-ae2c-f6ff5fbf8593	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-27 09:27:50.143597+00	
00000000-0000-0000-0000-000000000000	7369266b-96ec-4e13-b765-68d8b3ed3fd3	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-27 09:27:50.161988+00	
00000000-0000-0000-0000-000000000000	6bf7c16a-76e4-4433-8686-8db295fc45e9	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 09:40:16.035524+00	
00000000-0000-0000-0000-000000000000	3ec15f95-ec7d-4b62-ab24-a83323a8be8b	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 09:40:16.045196+00	
00000000-0000-0000-0000-000000000000	a84e239a-9ee7-4da4-8d85-1e510b3ae443	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 10:59:08.138813+00	
00000000-0000-0000-0000-000000000000	2b343c22-d92e-48a7-b2a7-87f34b85caee	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 10:59:08.141815+00	
00000000-0000-0000-0000-000000000000	6a72cfd5-4f0b-48b0-ac90-0b553972bc4b	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 12:04:21.474174+00	
00000000-0000-0000-0000-000000000000	ef41abae-01ca-495e-9e21-86f872018e87	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 12:04:21.48271+00	
00000000-0000-0000-0000-000000000000	740ca810-a9c7-4ad8-985c-54d9220a78c4	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 13:08:14.011788+00	
00000000-0000-0000-0000-000000000000	e5170c70-beae-4369-b849-295e261d6278	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 13:08:14.014525+00	
00000000-0000-0000-0000-000000000000	f9381032-3bf0-4de0-95a9-e37f1260970c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 14:07:52.69726+00	
00000000-0000-0000-0000-000000000000	9d408437-3eee-438b-b2b2-df762002a2ea	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 14:07:52.698926+00	
00000000-0000-0000-0000-000000000000	3979a68a-a964-49b6-ba58-5df3a78cf95f	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-27 14:26:47.354695+00	
00000000-0000-0000-0000-000000000000	78a0c618-3314-4605-8db1-b6cd5ec9d109	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-27 14:56:24.843331+00	
00000000-0000-0000-0000-000000000000	32df3d55-b9a9-4fac-9c8d-4fc03fd2fc18	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-27 14:56:48.013526+00	
00000000-0000-0000-0000-000000000000	3cfba7b2-9c14-4dee-ae91-62afe27f747c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 15:08:03.864379+00	
00000000-0000-0000-0000-000000000000	b58c5165-6dbc-453e-b63e-fb3d00620a53	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 15:08:03.866864+00	
00000000-0000-0000-0000-000000000000	7e265c2b-1d17-481d-89e5-ba0bec8ce33e	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-02-27 15:18:18.112534+00	
00000000-0000-0000-0000-000000000000	1690a63c-c6bd-43d5-bbf6-bfcc390ce6c5	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-27 15:18:37.216579+00	
00000000-0000-0000-0000-000000000000	a5339de1-0076-470e-9c8c-e44ed21baff1	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-27 15:58:11.015694+00	
00000000-0000-0000-0000-000000000000	ff44ffc0-0ffc-47e1-a6cb-198ca12fd1b3	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-27 15:58:11.018272+00	
00000000-0000-0000-0000-000000000000	a54d6ca5-8766-4000-8c1a-cca58e58b3dd	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-02-27 16:02:44.029163+00	
00000000-0000-0000-0000-000000000000	2ada2871-6594-44ae-8aae-055d74015fba	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-02-27 16:02:59.116409+00	
00000000-0000-0000-0000-000000000000	1926fdf0-84da-464c-bf17-f06213fcc766	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 16:24:40.191324+00	
00000000-0000-0000-0000-000000000000	aba425df-227e-4ef5-b2dc-9b57af82c155	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 16:24:40.195414+00	
00000000-0000-0000-0000-000000000000	4cf78bd7-ac48-4f8d-bd2d-67a4ecce81b6	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-27 17:11:17.06967+00	
00000000-0000-0000-0000-000000000000	9d9f45a9-28d9-44c4-8617-f3bcc1abc339	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-27 17:11:17.073208+00	
00000000-0000-0000-0000-000000000000	02f8cb7a-e95f-4f87-bf7f-541f623f7062	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 17:24:40.110269+00	
00000000-0000-0000-0000-000000000000	3f421ce9-a2a2-4cd9-b72d-5210e9448740	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 17:24:40.115254+00	
00000000-0000-0000-0000-000000000000	304bef1c-d92e-43d5-80c9-3b7b65c85c5a	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 20:05:40.424332+00	
00000000-0000-0000-0000-000000000000	996ab6df-e180-4eb3-922c-343a0b68fce1	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 20:05:40.427014+00	
00000000-0000-0000-0000-000000000000	e77fd344-1bc8-4162-b9d5-931e19bb7ab1	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 21:05:56.411428+00	
00000000-0000-0000-0000-000000000000	212d203f-db62-463a-b4af-922d434746b9	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 21:05:56.415673+00	
00000000-0000-0000-0000-000000000000	018410c0-98f9-4c42-8bae-9d68cc409e14	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 22:05:59.533282+00	
00000000-0000-0000-0000-000000000000	d7cb994f-fb78-483f-abe3-09ac0ba5f646	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-27 22:05:59.535746+00	
00000000-0000-0000-0000-000000000000	ad55d072-4b76-416a-a00f-c926c0e7a5d1	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 09:28:45.626064+00	
00000000-0000-0000-0000-000000000000	69a498ca-66a4-4326-b668-4a01c5a1a884	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 09:28:45.64512+00	
00000000-0000-0000-0000-000000000000	8011dc2d-d84e-408b-961f-a6993847736e	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-28 09:31:10.23725+00	
00000000-0000-0000-0000-000000000000	8d967dc3-ca2a-4297-a8fc-6cc73d3bd7b0	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-28 09:31:10.241625+00	
00000000-0000-0000-0000-000000000000	63ee40fb-c3c3-42d5-a68f-0dccc2edb888	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-28 11:12:39.836857+00	
00000000-0000-0000-0000-000000000000	44a0ce16-6493-4212-87bb-f3dc06aa055e	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-28 11:12:39.840496+00	
00000000-0000-0000-0000-000000000000	0b970547-4782-46fe-ae42-ce95b228e938	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 11:12:40.163627+00	
00000000-0000-0000-0000-000000000000	a0c29a7a-4526-44c0-a6a6-df615309e1c4	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 11:12:40.165191+00	
00000000-0000-0000-0000-000000000000	c0798ea0-1681-41f2-8755-7a9bf813714f	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-28 12:51:09.780013+00	
00000000-0000-0000-0000-000000000000	cf0a297f-5024-48cb-ad5f-12caba5fd9c1	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-02-28 12:51:09.78452+00	
00000000-0000-0000-0000-000000000000	fc3e1ce3-d12f-4de6-8400-b6863028fdf1	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 12:51:09.786486+00	
00000000-0000-0000-0000-000000000000	1c4d76dd-4f1b-47d6-8acf-760ab59e1f2c	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 12:51:09.790016+00	
00000000-0000-0000-0000-000000000000	074c3f96-cda5-4dc4-ba0a-95b4b6bc4756	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 16:43:11.966685+00	
00000000-0000-0000-0000-000000000000	f6195f22-c4cb-4e96-b132-39541d928635	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 16:43:11.96998+00	
00000000-0000-0000-0000-000000000000	2c42b475-2c15-424c-8a2f-f028c30045f9	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 19:02:54.849617+00	
00000000-0000-0000-0000-000000000000	1f1d46ae-9165-4dfa-870f-a91682b9783c	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 19:02:54.851978+00	
00000000-0000-0000-0000-000000000000	9a356cb4-b3bb-4e58-a56b-086bf41ccd7f	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 21:03:30.415433+00	
00000000-0000-0000-0000-000000000000	7b71b4bb-22fb-4de2-ac13-c1207e20c3dc	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-02-28 21:03:30.418618+00	
00000000-0000-0000-0000-000000000000	685e512d-bdfa-43c9-942a-a2c7f45d30c3	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-02 20:17:06.549684+00	
00000000-0000-0000-0000-000000000000	b91d86de-ba19-407d-853b-772503985c80	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-02 20:17:06.579748+00	
00000000-0000-0000-0000-000000000000	028ff88f-87ab-4df7-8ecc-fcea7be996df	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 20:26:10.37937+00	
00000000-0000-0000-0000-000000000000	5b023257-2b3d-478c-b043-e8df58464373	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 20:26:10.382256+00	
00000000-0000-0000-0000-000000000000	5d95d802-e518-4a5b-9c8d-33d4e102e83c	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 21:33:15.134757+00	
00000000-0000-0000-0000-000000000000	bf84b64b-5eec-48a8-a325-5e5839ca5a95	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 21:33:15.136656+00	
00000000-0000-0000-0000-000000000000	c27558ec-f5b9-4305-8fed-76e0247662c0	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-02 21:47:04.667907+00	
00000000-0000-0000-0000-000000000000	267a3de8-89d6-4f0d-b3e2-744c7c681ab1	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-02 21:47:04.671819+00	
00000000-0000-0000-0000-000000000000	7ae80f29-27d0-4b2d-9f53-1412a5e7062d	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:47:15.757799+00	
00000000-0000-0000-0000-000000000000	9632f104-cacd-489b-b06e-603ebc84f85d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:47:15.765229+00	
00000000-0000-0000-0000-000000000000	fe3ca0c3-c973-4ee4-a2b0-a6fa606117c5	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-03 10:27:51.798823+00	
00000000-0000-0000-0000-000000000000	fd9a0ebf-caf5-45c1-8a28-e1d199141c47	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-03 10:27:51.824391+00	
00000000-0000-0000-0000-000000000000	d398962d-1876-46a0-9126-c2366d0b35ef	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 10:48:11.05057+00	
00000000-0000-0000-0000-000000000000	3e2d8afb-b24f-4d1c-b2a2-eab2a0898ee3	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 10:48:11.055939+00	
00000000-0000-0000-0000-000000000000	13542dee-26ce-4cf7-8072-2da7eab48dd0	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-03 11:28:03.937229+00	
00000000-0000-0000-0000-000000000000	7bdef510-9979-4676-bde8-4003acc9329d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-03 11:28:03.940469+00	
00000000-0000-0000-0000-000000000000	0dbe8f0c-c1f7-4153-940b-a3ce412da67d	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 12:01:55.31049+00	
00000000-0000-0000-0000-000000000000	0f07aeb2-2d1c-4487-b911-487f14b8c871	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 12:01:55.312314+00	
00000000-0000-0000-0000-000000000000	3cb345ad-60c9-41a0-9996-f6abf018d04c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-03 12:39:29.844284+00	
00000000-0000-0000-0000-000000000000	fbf67895-e069-4f50-856a-049fa84bcf26	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-03 12:39:29.847707+00	
00000000-0000-0000-0000-000000000000	73c3065f-04a7-4727-a8ec-e1f1fac23c17	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-03 20:33:24.423489+00	
00000000-0000-0000-0000-000000000000	5a6ac25b-667c-4812-858c-d8431b5a7d61	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-03 20:33:24.441087+00	
00000000-0000-0000-0000-000000000000	735bf3a0-b03f-4172-b87c-584dcb749063	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 20:35:35.642192+00	
00000000-0000-0000-0000-000000000000	c25fe9fa-b8c5-4d1d-8bb3-5541069c51ea	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 20:35:35.644832+00	
00000000-0000-0000-0000-000000000000	6f6a63fd-ba54-4968-b8a9-f0d0b64637ab	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 21:38:54.158541+00	
00000000-0000-0000-0000-000000000000	2fdc60d8-1473-4d61-8832-7f65baa9e9b6	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 21:38:54.161324+00	
00000000-0000-0000-0000-000000000000	79184eda-1165-4523-8734-dfc85bc46b19	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-03 22:31:30.975129+00	
00000000-0000-0000-0000-000000000000	6ddec4cb-5ef0-43b4-9521-bafb968386ab	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-03 22:31:30.977785+00	
00000000-0000-0000-0000-000000000000	13ae75b3-155b-4bb9-a6cb-cda78d611d77	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 22:39:08.506351+00	
00000000-0000-0000-0000-000000000000	8190a25f-dbe7-4a77-a94e-9a0b65e2b59b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 22:39:08.509671+00	
00000000-0000-0000-0000-000000000000	163dc429-d1d7-4946-aad2-5ca6e3078b66	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 00:50:26.480905+00	
00000000-0000-0000-0000-000000000000	90c5a2ad-bba7-4a28-9a3f-6d0b7016f1a7	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 00:50:26.484853+00	
00000000-0000-0000-0000-000000000000	2aaff149-cd7c-49f4-958a-10ab8f183385	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 09:13:21.321294+00	
00000000-0000-0000-0000-000000000000	28631d84-2957-49fb-bfed-7b77c6f32703	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 09:13:21.317819+00	
00000000-0000-0000-0000-000000000000	1a4b5f8b-e686-471b-999c-4c0b831aeecf	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 09:13:21.335348+00	
00000000-0000-0000-0000-000000000000	e069c6a0-f112-405a-aa4e-98a0a983e98d	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 09:13:21.33637+00	
00000000-0000-0000-0000-000000000000	360afe63-75c1-4828-902c-f66222b4b3bc	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 10:17:20.952615+00	
00000000-0000-0000-0000-000000000000	80532da2-f970-4163-b897-6b50157fb192	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 10:17:20.955883+00	
00000000-0000-0000-0000-000000000000	68f0b308-ed7b-4916-a600-014d38eb8185	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 10:18:37.942644+00	
00000000-0000-0000-0000-000000000000	949fc9b4-4dd9-45f5-8fd1-542130cd7a0d	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 10:18:37.947059+00	
00000000-0000-0000-0000-000000000000	0fdd4653-cb80-4490-8631-0b9a12b4a6fb	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 11:41:33.713552+00	
00000000-0000-0000-0000-000000000000	e8e018d6-600c-46dd-90e3-e71b35f6675a	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 11:41:33.715998+00	
00000000-0000-0000-0000-000000000000	7f949354-4326-498e-893c-eba25f94e8ed	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 11:41:34.090044+00	
00000000-0000-0000-0000-000000000000	849e0291-a70c-4819-8839-36322c042673	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 11:41:34.091501+00	
00000000-0000-0000-0000-000000000000	08f3ac52-4ea9-4f3f-b8d9-4065b37c36d8	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 12:42:22.390321+00	
00000000-0000-0000-0000-000000000000	2e90d9ca-4133-49ba-8578-36a52ebb0378	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 12:42:22.389926+00	
00000000-0000-0000-0000-000000000000	1e44a6df-e816-4634-9481-37863eb2405d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 12:42:22.392361+00	
00000000-0000-0000-0000-000000000000	60950cd5-c66f-4b0f-ab89-4a195cff0050	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 12:42:22.393043+00	
00000000-0000-0000-0000-000000000000	7e76dd43-5e2c-4d63-b1e4-469ba448d5ac	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 14:26:49.97731+00	
00000000-0000-0000-0000-000000000000	c612b5aa-98ee-4955-b38c-1977eec94f2d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 14:26:49.980699+00	
00000000-0000-0000-0000-000000000000	b4e7ad13-9639-441d-9bec-29d7e35d0b1a	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 14:26:52.688441+00	
00000000-0000-0000-0000-000000000000	82472371-c816-4b12-8e9e-7e0fb79fa381	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 14:26:52.689119+00	
00000000-0000-0000-0000-000000000000	a3075cd9-17d2-4ec3-9978-1d09f5576281	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 15:27:31.351402+00	
00000000-0000-0000-0000-000000000000	900a0fbe-8e7b-4499-bd25-d0ff7e108a7e	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 15:27:31.355707+00	
00000000-0000-0000-0000-000000000000	50bc080a-75b3-4908-842a-d6ea6ab070e1	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 15:27:43.334242+00	
00000000-0000-0000-0000-000000000000	8e63a805-27f4-4a09-b877-06f0c13c2390	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 15:27:43.33565+00	
00000000-0000-0000-0000-000000000000	b10079dd-0cc9-4f50-886a-db65931de462	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 16:28:00.716942+00	
00000000-0000-0000-0000-000000000000	8ae0b7ac-ad14-4135-997e-80ffe961daaa	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 16:28:00.719719+00	
00000000-0000-0000-0000-000000000000	0a6c08c6-ea11-43f9-9f84-b3c66e6092bb	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 17:05:28.895154+00	
00000000-0000-0000-0000-000000000000	0cfb6b0b-9841-48a5-8317-2c45e06d7567	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 17:05:28.910019+00	
00000000-0000-0000-0000-000000000000	c6245c89-6e7e-4286-b1c2-d384cfdca592	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 19:13:08.98251+00	
00000000-0000-0000-0000-000000000000	567f623f-3c3a-4e25-80ba-09fc5d76d5d0	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 19:13:08.986291+00	
00000000-0000-0000-0000-000000000000	b4dcf8b5-6103-4a70-b0b0-c3b958bcd0cb	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 19:13:21.079086+00	
00000000-0000-0000-0000-000000000000	6d27a8e0-9e52-4f08-aa08-1913e53cb4e3	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 19:13:21.079762+00	
00000000-0000-0000-0000-000000000000	33657d74-cc14-4088-aab1-be184a163096	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 20:48:36.066772+00	
00000000-0000-0000-0000-000000000000	c8cda979-d2e1-4884-9dac-c99d3722434b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-04 20:48:36.071145+00	
00000000-0000-0000-0000-000000000000	f95387b4-1559-4424-961b-78ce6eb28ae4	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 20:53:22.108161+00	
00000000-0000-0000-0000-000000000000	4355f4fa-d6d5-4a6b-97d7-1418a85077d6	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-04 20:53:22.113051+00	
00000000-0000-0000-0000-000000000000	967d05e3-d916-47c2-9ba0-6b0debf1e2f8	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-05 01:54:37.387702+00	
00000000-0000-0000-0000-000000000000	b00e6d8f-1932-4281-b6b8-37a25a6ff386	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-05 01:54:37.39538+00	
00000000-0000-0000-0000-000000000000	10510f02-a07e-4cef-94f3-847a8a0db7af	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-05 01:54:57.889923+00	
00000000-0000-0000-0000-000000000000	20b25eee-885f-443b-a354-eaf5adeed13a	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-05 01:54:57.891364+00	
00000000-0000-0000-0000-000000000000	e5fab5bb-790e-4856-85a9-bb5818331360	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-05 10:17:19.062377+00	
00000000-0000-0000-0000-000000000000	162e850b-dc76-48ac-b973-c6db98fb7052	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-05 10:17:19.08497+00	
00000000-0000-0000-0000-000000000000	733b2aca-dcf6-4fa2-ba6c-ce16da8de230	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-05 10:18:39.747823+00	
00000000-0000-0000-0000-000000000000	40e3fd9c-1d2f-471b-906e-29a2caf8e118	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-05 10:18:39.753429+00	
00000000-0000-0000-0000-000000000000	f30b49fc-8c73-41d6-85b1-e4225301556d	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-05 12:03:40.229179+00	
00000000-0000-0000-0000-000000000000	6fc5e077-8289-4b00-95c7-899212cfe98a	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-05 12:03:40.236846+00	
00000000-0000-0000-0000-000000000000	a6b00051-e649-4275-abb1-f2bd39c70c26	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-05 12:03:41.817877+00	
00000000-0000-0000-0000-000000000000	714e09f2-52ee-4c43-8123-b39215021b1f	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-05 12:03:41.819357+00	
00000000-0000-0000-0000-000000000000	4022c41e-b5bf-4d6e-bb05-4255654e7db2	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-05 15:49:39.982538+00	
00000000-0000-0000-0000-000000000000	63c0bfac-fae4-42ad-88a9-0c6d23954197	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-05 15:49:39.985833+00	
00000000-0000-0000-0000-000000000000	3efd64e3-f9a0-4e4b-bd3a-cb2edf0a7a23	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-05 15:49:44.160702+00	
00000000-0000-0000-0000-000000000000	36dd301d-7d01-4836-a539-a10a4a6dc3fa	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-05 15:49:44.161415+00	
00000000-0000-0000-0000-000000000000	bc10c534-82a1-43bb-83f1-1bb3273f5d7c	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-05 17:48:23.934488+00	
00000000-0000-0000-0000-000000000000	db8df946-db66-4aab-a9c3-150ee82169b8	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-05 17:48:23.938661+00	
00000000-0000-0000-0000-000000000000	ab5d8b2c-4351-4a69-a529-52900b903efd	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-05 17:48:29.824505+00	
00000000-0000-0000-0000-000000000000	1823687d-8410-4ea9-91dc-9ff734c5baee	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-05 17:48:29.825291+00	
00000000-0000-0000-0000-000000000000	213ad3c0-115c-41f4-a1df-99625de42bed	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-06 08:57:02.698656+00	
00000000-0000-0000-0000-000000000000	9537bfc6-8ae1-4fb3-a6e9-0c9c17c5a702	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-06 08:57:02.727484+00	
00000000-0000-0000-0000-000000000000	a9b04d2f-52e6-490b-b960-18ac99a50cd4	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-06 10:11:43.553226+00	
00000000-0000-0000-0000-000000000000	07717b85-3a44-41c9-8d4f-4b8fd635470b	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-06 10:11:43.5657+00	
00000000-0000-0000-0000-000000000000	7b4d2e7f-9d1e-4d2b-87a6-424a5c2b9786	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-03-06 10:12:29.195967+00	
00000000-0000-0000-0000-000000000000	824da807-c475-4e17-97cb-8cda9b79dbef	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-06 12:54:28.211147+00	
00000000-0000-0000-0000-000000000000	c0d6f54f-2bb2-4866-aeee-d98b32750481	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-06 12:54:28.217713+00	
00000000-0000-0000-0000-000000000000	95699dca-7b80-4d38-878f-3705397231c9	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-06 13:17:26.828033+00	
00000000-0000-0000-0000-000000000000	687c164c-e4d1-44a2-94a9-ffb4f2029238	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-06 13:17:26.832018+00	
00000000-0000-0000-0000-000000000000	5dad7525-e568-416a-9296-fece015474db	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-06 14:04:29.871676+00	
00000000-0000-0000-0000-000000000000	1c2e77d9-c476-452b-9705-75d6f87f2097	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-06 14:04:29.874895+00	
00000000-0000-0000-0000-000000000000	674003b0-5cf0-4df0-84e0-dee0d58a1ed3	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-06 14:20:12.014488+00	
00000000-0000-0000-0000-000000000000	5e6b3d00-cf30-4028-8ecc-54200febd57b	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-06 14:20:12.019064+00	
00000000-0000-0000-0000-000000000000	73385453-700f-409b-b400-0f3019631d36	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 09:43:18.654952+00	
00000000-0000-0000-0000-000000000000	2d9a2e09-7229-40dd-9d5f-ca976345ebfa	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 09:43:18.678526+00	
00000000-0000-0000-0000-000000000000	bd2b95d1-e017-4374-8687-9d8c7c38672c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 11:01:22.576575+00	
00000000-0000-0000-0000-000000000000	0822834a-c197-4b10-bef4-cb431336454b	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 11:01:22.581951+00	
00000000-0000-0000-0000-000000000000	1ad50a87-c697-414b-b239-eb4c1706d48d	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 12:37:18.189091+00	
00000000-0000-0000-0000-000000000000	5273f107-ca83-4d09-8a55-bbc3d24473a9	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 12:37:18.208285+00	
00000000-0000-0000-0000-000000000000	b42126e3-3900-4b5d-84a3-b9d62765a010	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 13:45:47.643076+00	
00000000-0000-0000-0000-000000000000	6a6c30a1-5766-4859-92d4-76e8a5b98a01	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 13:45:47.647539+00	
00000000-0000-0000-0000-000000000000	6aca782d-c23c-4175-a14f-8b035a01b92e	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 18:09:23.610617+00	
00000000-0000-0000-0000-000000000000	1fba6568-1854-4a69-88f1-b2af93282e32	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 18:09:23.614816+00	
00000000-0000-0000-0000-000000000000	87d77aac-29d9-4f21-922d-b35c41a13e94	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 20:55:14.213193+00	
00000000-0000-0000-0000-000000000000	d5469e87-dbb6-42d4-8f2b-2d143c97e8a2	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 20:55:14.218119+00	
00000000-0000-0000-0000-000000000000	5361e4ac-674f-40ef-9dee-6a96166a8efe	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 22:00:19.493449+00	
00000000-0000-0000-0000-000000000000	b0287db7-b665-4ed9-bd9f-d1c14cf30b4a	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-10 22:00:19.497987+00	
00000000-0000-0000-0000-000000000000	f5c4fe22-068f-4f83-9043-0841d17c43da	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 08:54:41.80335+00	
00000000-0000-0000-0000-000000000000	fd45cf17-db56-4414-999a-e979f40c9508	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 08:54:41.821724+00	
00000000-0000-0000-0000-000000000000	1fb19edc-1cc8-45c4-90a1-80bceafe767d	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 09:54:51.224628+00	
00000000-0000-0000-0000-000000000000	b15eb9ec-4364-47c2-974f-d3bb4143a164	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 09:54:51.231163+00	
00000000-0000-0000-0000-000000000000	3fceca93-7619-4db3-acde-d4fd1fe6986d	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 10:55:55.812659+00	
00000000-0000-0000-0000-000000000000	87f7dcd8-aada-43ee-b7a6-753c6d6101fc	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 10:55:55.818974+00	
00000000-0000-0000-0000-000000000000	1d735a6f-20d6-468a-9a94-2b785abbb726	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 13:03:57.019766+00	
00000000-0000-0000-0000-000000000000	7580a563-7164-4392-86f7-1abf92602454	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 13:03:57.025204+00	
00000000-0000-0000-0000-000000000000	9e882f25-108f-4385-a8e2-27683591874a	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-11 13:19:37.731898+00	
00000000-0000-0000-0000-000000000000	091e05e8-6901-4222-9567-a2aa98d07159	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-11 13:19:37.736128+00	
00000000-0000-0000-0000-000000000000	889d2ec1-51b6-4b5a-b75d-656c92ca441d	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-03-11 13:37:57.767446+00	
00000000-0000-0000-0000-000000000000	232a83ec-5105-4002-ae5a-25df7bab59fb	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-03-11 13:38:08.976837+00	
00000000-0000-0000-0000-000000000000	6555a673-e68a-48d6-a604-77aaaef0a1a6	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-03-11 13:38:20.892374+00	
00000000-0000-0000-0000-000000000000	12c412a7-513b-4cdc-95f9-e9c6c995d137	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-03-11 13:39:10.813106+00	
00000000-0000-0000-0000-000000000000	5c4843eb-9020-47a2-9871-2ad04c70b73e	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 14:57:27.133519+00	
00000000-0000-0000-0000-000000000000	a8d2e918-8e7d-4dca-b29d-c07166f62644	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 14:57:27.138719+00	
00000000-0000-0000-0000-000000000000	2e8bc069-fe24-4aaa-85a9-301dbe8e4620	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-11 14:57:28.223179+00	
00000000-0000-0000-0000-000000000000	1e6073df-a8b5-45d1-bf67-6f9aa1487f7b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-11 14:57:28.224612+00	
00000000-0000-0000-0000-000000000000	33d14a2d-eac9-4fe7-89b7-b37a39908df6	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-11 15:57:29.627423+00	
00000000-0000-0000-0000-000000000000	ffec0955-5738-4af4-906b-fa7a855a6524	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-11 15:57:29.631091+00	
00000000-0000-0000-0000-000000000000	9c913ef0-f281-40f6-b0ca-dba13919d072	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 22:34:18.309489+00	
00000000-0000-0000-0000-000000000000	7ea96ad9-347a-4fd0-873e-9f7267cbc6c8	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 22:34:18.318258+00	
00000000-0000-0000-0000-000000000000	c0ed7518-8282-4647-8c72-ec031456d473	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 23:51:12.340807+00	
00000000-0000-0000-0000-000000000000	9d376052-1aaf-4e9f-87f7-d8aa36226371	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-11 23:51:12.346067+00	
00000000-0000-0000-0000-000000000000	1ac52a3f-54a5-42cc-984e-c4e4431740a7	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-12 10:28:01.51844+00	
00000000-0000-0000-0000-000000000000	630d667c-6fef-469b-9532-ae593c5ee213	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-12 10:28:01.532829+00	
00000000-0000-0000-0000-000000000000	93d84436-abbf-46f3-baf8-8c03a81f595c	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 10:44:32.797188+00	
00000000-0000-0000-0000-000000000000	ec125437-523b-4329-8734-b7615d593119	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 10:44:32.802561+00	
00000000-0000-0000-0000-000000000000	b5d95504-9827-4e99-9b55-5853a6673671	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-12 12:55:20.851939+00	
00000000-0000-0000-0000-000000000000	708a8bb4-4ba7-463e-a112-afdcc2c6eadf	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-12 12:55:20.857299+00	
00000000-0000-0000-0000-000000000000	706faceb-f04d-4f99-a1be-45c25ffaa3ff	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 12:55:21.616665+00	
00000000-0000-0000-0000-000000000000	3e985aa8-0a0e-4e33-ba6e-d84f29a011e3	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 12:55:21.61731+00	
00000000-0000-0000-0000-000000000000	72f786f2-d7e7-45dc-ae99-cb45caf61960	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-13 09:15:59.824906+00	
00000000-0000-0000-0000-000000000000	891db32d-ba73-43c2-ab0f-36912ad166d8	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-13 09:15:59.843572+00	
00000000-0000-0000-0000-000000000000	3bb0d373-4594-49f2-a92b-0fa37c62d0f6	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-13 10:16:40.154487+00	
00000000-0000-0000-0000-000000000000	0e14e165-1942-4d14-9546-a8de06e6a505	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-13 10:16:40.161683+00	
00000000-0000-0000-0000-000000000000	18a715e5-e6db-426d-bbc1-f88022f1694d	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-17 09:02:32.73822+00	
00000000-0000-0000-0000-000000000000	fa4ae56c-4f6c-4285-9d54-6222d6fa3696	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-17 09:02:32.760573+00	
00000000-0000-0000-0000-000000000000	705cb14b-9f31-4f1c-aeba-70152ce5e813	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-03-17 09:10:16.773277+00	
00000000-0000-0000-0000-000000000000	e053922f-7f8e-43bd-a16f-0330264af70c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-17 10:06:05.254316+00	
00000000-0000-0000-0000-000000000000	7c51f2bc-039c-4c11-8582-43da720a84eb	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-17 10:06:05.262681+00	
00000000-0000-0000-0000-000000000000	579c48ca-925d-42ad-8d62-6d514cf32f27	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-17 10:20:04.851872+00	
00000000-0000-0000-0000-000000000000	324604da-1cef-4b8d-9a30-e3a363d3e750	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-17 10:20:04.857506+00	
00000000-0000-0000-0000-000000000000	3c1f8f71-414f-4513-9269-201cd27354cb	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-17 13:22:11.607702+00	
00000000-0000-0000-0000-000000000000	a963ecdc-6ef3-44f9-a81e-36aba7b55ae8	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-17 13:22:11.611838+00	
00000000-0000-0000-0000-000000000000	ed03d170-3105-4474-be41-271cc86af86b	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-17 13:25:47.294534+00	
00000000-0000-0000-0000-000000000000	7194cfaf-1a73-43c5-b24a-e17324ea2a97	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-17 13:25:47.296316+00	
00000000-0000-0000-0000-000000000000	bce00a25-3bd0-4cd1-aeea-1937a44ea9b8	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-17 17:32:39.937422+00	
00000000-0000-0000-0000-000000000000	a2ceb609-14d6-4cf2-8c36-c12913986c18	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-17 17:32:39.940339+00	
00000000-0000-0000-0000-000000000000	0b044634-63dd-4cff-8269-0911be9b6b66	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-17 17:32:42.162707+00	
00000000-0000-0000-0000-000000000000	6c9d5bd8-625b-4143-946a-04fb50a621f6	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-17 17:32:42.169285+00	
00000000-0000-0000-0000-000000000000	b2424719-bab1-4b39-bbcc-8b7dd5dcd85a	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-17 20:33:16.498546+00	
00000000-0000-0000-0000-000000000000	64411c7e-6584-4415-b53a-b224a4babaca	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-17 20:33:16.515063+00	
00000000-0000-0000-0000-000000000000	dcfcdc64-e6e8-4b23-9db6-22c25949af2e	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-17 20:33:33.267417+00	
00000000-0000-0000-0000-000000000000	e25e07a0-ba54-45a3-a7d4-a400edd50d22	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-17 20:33:33.268085+00	
00000000-0000-0000-0000-000000000000	9f9091c4-0e49-49b3-bdf6-20124cbfa72f	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-18 10:07:06.8764+00	
00000000-0000-0000-0000-000000000000	0c7fec3d-87bc-4feb-9375-3fd7c76d082a	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-18 10:07:06.893611+00	
00000000-0000-0000-0000-000000000000	e5a81346-68c5-40b1-8a9a-2d95c0ae18e2	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-18 10:40:48.902017+00	
00000000-0000-0000-0000-000000000000	4890e428-69dd-4e6e-8882-a2fc6f294053	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-18 10:40:48.906464+00	
00000000-0000-0000-0000-000000000000	ed6df7b9-6275-42f0-8667-a8f8cb58673f	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-18 11:22:15.670505+00	
00000000-0000-0000-0000-000000000000	f396e6fd-1e0f-4f30-9eea-57e9171c459f	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-18 11:22:15.673453+00	
00000000-0000-0000-0000-000000000000	985bd6ca-5ab6-41ed-abc2-af5aad1d4621	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-18 11:52:14.175488+00	
00000000-0000-0000-0000-000000000000	655fd140-60e4-4f20-abfa-4e2c5d1203db	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-18 11:52:14.183249+00	
00000000-0000-0000-0000-000000000000	0ca60610-81af-41d1-8696-799f1c2e0338	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-18 12:22:16.095715+00	
00000000-0000-0000-0000-000000000000	6d6335ed-38db-4783-a3b4-628c21dda76d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-18 12:22:16.100329+00	
00000000-0000-0000-0000-000000000000	8a7686ed-d533-4b5c-b175-424126e59ca5	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-24 10:31:02.949698+00	
00000000-0000-0000-0000-000000000000	5793911a-aef1-4d5a-8496-4af4daf6b30e	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-24 10:31:02.968333+00	
00000000-0000-0000-0000-000000000000	bfa0d549-82e5-488c-a747-d9bfab3442ca	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-25 15:57:19.866709+00	
00000000-0000-0000-0000-000000000000	c2ecc0a1-f50c-4b3c-ba6a-c85cdf9d9a5e	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-25 15:57:19.896818+00	
00000000-0000-0000-0000-000000000000	384351e0-13a8-4d39-8584-5b8e430da0a4	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-25 16:57:31.504789+00	
00000000-0000-0000-0000-000000000000	8b0ec7c3-1e2a-4432-9eff-94173f2e435a	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-25 16:57:31.52164+00	
00000000-0000-0000-0000-000000000000	a01ded1e-4d61-4994-960a-fcf1da62d319	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-03-26 12:52:29.819383+00	
00000000-0000-0000-0000-000000000000	97a4505a-2e66-4452-a82c-8bbbcbcdb54e	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-26 13:49:12.201027+00	
00000000-0000-0000-0000-000000000000	1139dd71-bd64-4e4e-8413-7ef9138b4e89	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-26 13:49:12.211937+00	
00000000-0000-0000-0000-000000000000	ddea1c73-be61-4dcd-b8cb-172885915034	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-03-26 13:49:40.114842+00	
00000000-0000-0000-0000-000000000000	c4dcc119-beb3-4b0b-b24a-3bbc522a1e0b	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-03-26 13:49:47.909863+00	
00000000-0000-0000-0000-000000000000	89c1071b-7785-4c3e-9ca7-82c7708ddaf7	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-26 13:52:25.061373+00	
00000000-0000-0000-0000-000000000000	cf9c297b-4e69-4b19-80eb-b445964531e8	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-26 13:52:25.06249+00	
00000000-0000-0000-0000-000000000000	7d8436b1-da97-4b00-845a-af9e6429d322	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-03-26 14:58:34.969947+00	
00000000-0000-0000-0000-000000000000	b459f024-a45b-4247-8bbd-b917bcc0ae9d	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-26 14:59:14.381424+00	
00000000-0000-0000-0000-000000000000	e8e0cc90-452d-4827-9ec9-d892670f3f16	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-26 14:59:14.385643+00	
00000000-0000-0000-0000-000000000000	1567ba74-c097-43ab-a16b-0941a1418f7d	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-03-26 15:07:26.896862+00	
00000000-0000-0000-0000-000000000000	86e53fa4-1971-48d7-971f-25cf1919a230	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-03-26 15:07:41.393361+00	
00000000-0000-0000-0000-000000000000	98706944-2a9c-42d8-9110-ca9daed2c48a	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-26 15:59:16.516603+00	
00000000-0000-0000-0000-000000000000	ebb50bd7-5f03-425c-ab10-5b4d82771690	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-26 15:59:16.53221+00	
00000000-0000-0000-0000-000000000000	5005aa2b-d767-4413-a9d8-5f6952ba8bb8	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-26 18:21:20.815726+00	
00000000-0000-0000-0000-000000000000	886b2c8a-8a98-4603-adbb-a18f3980d388	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-26 18:21:20.821394+00	
00000000-0000-0000-0000-000000000000	de19a3b9-47ae-4da8-b5c7-c141c67d069c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-26 18:21:21.606706+00	
00000000-0000-0000-0000-000000000000	5ea92f0b-6bc1-4969-a610-11b3b28f2433	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-26 18:21:21.607462+00	
00000000-0000-0000-0000-000000000000	018696c8-fc5f-4b6b-baab-127ba4a6b8df	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-26 19:40:16.547489+00	
00000000-0000-0000-0000-000000000000	f9150d5b-0877-4307-a89f-8937c3d3c552	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-26 19:40:16.550577+00	
00000000-0000-0000-0000-000000000000	0e6dcac0-ac1a-461c-b552-1b3e62dafabb	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-26 19:40:16.553367+00	
00000000-0000-0000-0000-000000000000	27a48a23-72ca-43c4-8410-b17d9c397ad6	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-26 19:40:16.553477+00	
00000000-0000-0000-0000-000000000000	671d73dc-fc8e-4d10-8b78-dd6445a436e9	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 10:14:19.605441+00	
00000000-0000-0000-0000-000000000000	9cffc097-e496-4618-9476-259620e0f889	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 10:14:19.621767+00	
00000000-0000-0000-0000-000000000000	9d906b32-ded0-4726-a01e-d50d32ff0df0	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 12:02:58.485066+00	
00000000-0000-0000-0000-000000000000	eb138ddd-7ef0-4134-bdd0-bf830d582da4	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 12:02:58.489375+00	
00000000-0000-0000-0000-000000000000	5783e38f-a3ac-4806-8a2c-e58560815391	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 13:08:10.822638+00	
00000000-0000-0000-0000-000000000000	2798f7fe-ac8e-4088-95e1-47fa68d9a838	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 13:08:10.825944+00	
00000000-0000-0000-0000-000000000000	28632402-6006-4724-afa5-267707e2460e	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-27 13:55:44.98445+00	
00000000-0000-0000-0000-000000000000	a9efaa49-c00d-40b6-a886-e2e4936ff802	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-03-27 13:56:01.799038+00	
00000000-0000-0000-0000-000000000000	24568aaa-e8f0-4654-8171-e4c8fffd9530	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 14:56:42.3739+00	
00000000-0000-0000-0000-000000000000	4b07e7ff-75b1-4a60-b927-97f1842213f9	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 14:56:42.384013+00	
00000000-0000-0000-0000-000000000000	0e92841f-96e1-4221-836e-0f7cad88e615	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 16:01:33.951022+00	
00000000-0000-0000-0000-000000000000	7ee3b4b7-ec94-4c73-afb8-c8a18d22f545	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 16:01:33.956154+00	
00000000-0000-0000-0000-000000000000	7d24ed0a-a434-4f15-bdb5-69f7e9dcdc44	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 18:41:18.898461+00	
00000000-0000-0000-0000-000000000000	cdcf41ff-52fc-43c4-83ba-1be3188d3ff9	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 18:41:18.90284+00	
00000000-0000-0000-0000-000000000000	9a1c1e45-69d1-406f-911a-ba73bb0b3037	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 20:02:26.401072+00	
00000000-0000-0000-0000-000000000000	1573e506-d37d-4670-9c68-cd60cf855de9	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-27 20:02:26.402755+00	
00000000-0000-0000-0000-000000000000	143fce65-e36b-493e-92e3-0e1620c803e1	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 09:42:36.571941+00	
00000000-0000-0000-0000-000000000000	3287d3ee-e2d5-467f-8ab4-b534f8251649	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 09:42:36.598418+00	
00000000-0000-0000-0000-000000000000	11c03ef6-3b3b-4159-aad7-10e7caad8169	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 10:59:42.25935+00	
00000000-0000-0000-0000-000000000000	41731d34-a913-4e3c-bfe2-69e9d9dd20d1	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 10:59:42.263263+00	
00000000-0000-0000-0000-000000000000	43a34445-2727-448f-b513-46073c8c2466	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 12:03:10.287054+00	
00000000-0000-0000-0000-000000000000	0eb5e6cf-bdbb-4415-b0f1-9e16ef245139	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 12:03:10.290512+00	
00000000-0000-0000-0000-000000000000	0342efa7-dbd3-42c4-971d-acb82750c9d0	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 13:03:02.244129+00	
00000000-0000-0000-0000-000000000000	3e09ebfa-60e0-4fa7-8eef-b7df988bd5ba	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 13:03:02.246611+00	
00000000-0000-0000-0000-000000000000	e12c83bf-7747-432a-b7ce-924284dff065	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 14:10:37.285485+00	
00000000-0000-0000-0000-000000000000	73ef0a90-c91c-4875-8b2f-e4389a2b0e13	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 14:10:37.290232+00	
00000000-0000-0000-0000-000000000000	0034801a-c436-4422-a196-2c13dec05fb0	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 15:45:38.538763+00	
00000000-0000-0000-0000-000000000000	aabb65fa-4a42-4db8-90e3-aa79255753be	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 15:45:38.543851+00	
00000000-0000-0000-0000-000000000000	8ffc588b-da9a-4794-8289-caa63460cd38	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 16:57:43.160974+00	
00000000-0000-0000-0000-000000000000	e85273c7-bb72-4377-8b15-3591bb2e1915	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-28 16:57:43.165879+00	
00000000-0000-0000-0000-000000000000	c2bd83b9-b287-4e2c-972f-7cd3d0872e31	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-31 08:30:49.948315+00	
00000000-0000-0000-0000-000000000000	03ae872e-85e9-4f16-a8f9-ae61528779e9	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-31 08:30:49.969857+00	
00000000-0000-0000-0000-000000000000	9f89ee52-1473-4bc6-9824-7fc10fb543d5	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-31 09:32:14.363375+00	
00000000-0000-0000-0000-000000000000	88992040-2c15-4e61-9e5c-186cc55dce33	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-31 09:32:14.374615+00	
00000000-0000-0000-0000-000000000000	2b3e9496-031c-4135-aa0a-86c8ef50cd02	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-31 09:35:30.066741+00	
00000000-0000-0000-0000-000000000000	beae1627-6485-4911-ab5e-f632bbcfc359	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-31 09:35:30.069178+00	
00000000-0000-0000-0000-000000000000	396adbbd-73c5-41c5-b875-14e4db028b34	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-03-31 09:35:35.520366+00	
00000000-0000-0000-0000-000000000000	124f7606-6c81-49ad-bfa0-9c4df0966f1f	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-03-31 09:35:49.943758+00	
00000000-0000-0000-0000-000000000000	2685adfe-d57b-498c-8494-cab9ad6b5c5c	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-31 12:02:37.547503+00	
00000000-0000-0000-0000-000000000000	8be68bd5-9ccd-4d81-9053-aaf70aae75df	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-31 12:02:37.564511+00	
00000000-0000-0000-0000-000000000000	40831191-66ea-4135-b0d6-1f4fd24b640f	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-31 12:03:57.701313+00	
00000000-0000-0000-0000-000000000000	7c4555d9-2717-4047-87b5-51e855db2cbe	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-31 12:03:57.707378+00	
00000000-0000-0000-0000-000000000000	cbaf91da-6664-488c-a177-aab6e8688205	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-31 15:11:46.489853+00	
00000000-0000-0000-0000-000000000000	88fcc7c4-f958-45cd-8d42-0567640fa6d7	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-31 15:11:46.493804+00	
00000000-0000-0000-0000-000000000000	b53e7349-ea5b-4a53-a788-93edcb9667f2	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-31 15:29:22.324819+00	
00000000-0000-0000-0000-000000000000	afc005c8-d867-4bec-99b5-d5534ef0f3fc	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-31 15:29:22.329776+00	
00000000-0000-0000-0000-000000000000	11ea1e60-9b80-40f2-9fe1-6f53fd6b0fba	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-31 16:11:57.437494+00	
00000000-0000-0000-0000-000000000000	3365d77a-71a3-407c-8534-b29ede61de29	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-03-31 16:11:57.441369+00	
00000000-0000-0000-0000-000000000000	717aaf71-a5ec-40e2-8632-8bcf397cb466	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-01 11:03:37.223535+00	
00000000-0000-0000-0000-000000000000	8af09a1f-14e1-4e13-b246-e1a96b36425f	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-01 11:03:37.246269+00	
00000000-0000-0000-0000-000000000000	3217e9f4-c378-4290-9d68-8c311170adee	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 09:14:18.755237+00	
00000000-0000-0000-0000-000000000000	f6676ece-682b-4c27-90d0-fbd4520bae28	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 09:14:18.784055+00	
00000000-0000-0000-0000-000000000000	8002f4ca-e238-4cd8-9c53-67f88799af80	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 11:00:12.651393+00	
00000000-0000-0000-0000-000000000000	ff79096a-e482-4ea5-8e0a-9c10d59af17f	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 11:00:12.659017+00	
00000000-0000-0000-0000-000000000000	669b0a67-af2f-4350-88c1-c217bb907a0e	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 11:58:50.923218+00	
00000000-0000-0000-0000-000000000000	7733e0e3-0a7b-4036-b332-b9314d1eac7f	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 11:58:50.927526+00	
00000000-0000-0000-0000-000000000000	2ee23beb-6976-4afa-9b3f-a2b483a636af	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 13:26:27.500308+00	
00000000-0000-0000-0000-000000000000	860a7787-0634-4652-a997-972bc70a10b8	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 13:26:27.516496+00	
00000000-0000-0000-0000-000000000000	97ed448f-4f02-42f9-920d-a5c8dd19987a	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 14:24:40.793987+00	
00000000-0000-0000-0000-000000000000	a11dffcc-e0cc-41f5-932f-f082efe7f532	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 14:24:40.815535+00	
00000000-0000-0000-0000-000000000000	cdfde4d5-96d0-4502-b5e8-173b1af05aee	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 15:40:38.129118+00	
00000000-0000-0000-0000-000000000000	386b0b15-cba0-41c8-98ba-9dc99e5572cb	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 15:40:38.134513+00	
00000000-0000-0000-0000-000000000000	61720720-3f8a-4f91-b6c6-a9092908070c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 21:32:56.63172+00	
00000000-0000-0000-0000-000000000000	91b86611-8921-4b7b-b43b-7386a94d91bb	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-04 21:32:56.646094+00	
00000000-0000-0000-0000-000000000000	def1f532-b4d1-4cb8-9165-adca5e082613	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 08:50:01.251218+00	
00000000-0000-0000-0000-000000000000	496fa125-d0bd-494d-acef-c4b6e51a0c23	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 08:50:01.275975+00	
00000000-0000-0000-0000-000000000000	aa4c40cf-8ac7-41cb-a853-4bc5a5db5a61	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 09:50:07.390926+00	
00000000-0000-0000-0000-000000000000	c7fa2e2a-45ed-4798-b831-f44109e3b818	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 09:50:07.396384+00	
00000000-0000-0000-0000-000000000000	be09dc60-74f6-4b40-bfe3-86802c514cc2	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 11:42:06.430931+00	
00000000-0000-0000-0000-000000000000	74f8a067-cf94-4790-b338-dc934db31458	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 11:42:06.442659+00	
00000000-0000-0000-0000-000000000000	d194ce76-6588-4f6f-813e-48e132740438	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 12:42:22.718027+00	
00000000-0000-0000-0000-000000000000	da52e99f-c64f-4342-960e-6ca42c7943d1	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 12:42:22.724698+00	
00000000-0000-0000-0000-000000000000	4a04495b-bbaf-494b-b171-3404bad0376a	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 13:42:34.073433+00	
00000000-0000-0000-0000-000000000000	1d6f6e5a-c74d-4d7f-8cfe-950e36b4e114	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 13:42:34.078198+00	
00000000-0000-0000-0000-000000000000	4adce41f-18ac-42ce-bd7e-b931e757038c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 14:50:22.601706+00	
00000000-0000-0000-0000-000000000000	b7fea787-350f-4c01-87c7-3bdce76907a6	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 14:50:22.604719+00	
00000000-0000-0000-0000-000000000000	7a1af244-099d-40ab-bf2e-15f5ef8993c4	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 16:36:19.720924+00	
00000000-0000-0000-0000-000000000000	764f5e7f-6ced-4a0d-a674-c1902b7bdb4d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 16:36:19.730145+00	
00000000-0000-0000-0000-000000000000	3fccfcc3-b3f5-4a4f-8c83-cb984363f070	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 18:36:13.603433+00	
00000000-0000-0000-0000-000000000000	6e6333bb-d8a2-40d7-80ad-b90272346eed	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 18:36:13.612056+00	
00000000-0000-0000-0000-000000000000	5928cf98-c498-4a95-990e-806d32df91fd	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 21:06:49.810452+00	
00000000-0000-0000-0000-000000000000	1eca8840-d995-403a-9271-69b5c0d469d9	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 21:06:49.814736+00	
00000000-0000-0000-0000-000000000000	ef7c874a-24f2-40df-8b82-eb99d0e6c080	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 23:41:47.240316+00	
00000000-0000-0000-0000-000000000000	c4cbf62f-b778-4ce1-b14a-ccf90639783d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-07 23:41:47.252786+00	
00000000-0000-0000-0000-000000000000	da96aaad-717a-4b1a-8702-71c3e9019182	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-08 00:42:16.451931+00	
00000000-0000-0000-0000-000000000000	6f539dd0-df49-4615-bfa1-8c0172eda21b	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-08 00:42:16.457739+00	
00000000-0000-0000-0000-000000000000	95043cdb-02f0-4d09-aebc-a29f63bdb1ec	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-08 07:30:32.098772+00	
00000000-0000-0000-0000-000000000000	9bb430c0-eb03-4ac3-b44c-44416de34cb0	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-08 07:30:32.132999+00	
00000000-0000-0000-0000-000000000000	5810a90e-21de-4e1e-aabb-396adbebf969	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-08 08:30:37.259106+00	
00000000-0000-0000-0000-000000000000	864a4763-c13c-4052-ab5c-1163ce84c9bf	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-08 08:30:37.26666+00	
00000000-0000-0000-0000-000000000000	d7113cdf-40e0-4146-bb12-36c10a1cf324	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-10 12:35:07.986393+00	
00000000-0000-0000-0000-000000000000	31a877a2-2c2d-41af-888f-f5d68b37da51	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-10 12:35:08.019135+00	
00000000-0000-0000-0000-000000000000	ddaf69c0-9274-4c9d-a42c-aa304e57cf3e	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-04-10 13:45:33.87961+00	
00000000-0000-0000-0000-000000000000	aba81ffe-f0ee-49b5-9289-b0d4933a52bd	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 13:51:10.496914+00	
00000000-0000-0000-0000-000000000000	870c2a49-9118-4c06-917b-0ad295bc4c73	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 13:51:10.499947+00	
00000000-0000-0000-0000-000000000000	962c1314-f075-4dd2-8d10-02f6b4b7d893	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-10 14:46:02.137454+00	
00000000-0000-0000-0000-000000000000	26853b8e-8569-453a-991f-fe67ceb99b29	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-10 14:46:02.141513+00	
00000000-0000-0000-0000-000000000000	e5e0d38f-a065-4282-a2d9-10c6eee09d54	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 15:41:19.431736+00	
00000000-0000-0000-0000-000000000000	0d1cb170-a555-4fda-9cae-6c8282d4f831	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-10 15:41:19.435049+00	
00000000-0000-0000-0000-000000000000	39a77a1d-08eb-4226-a904-7627671ece3d	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-06 09:44:42.930841+00	
00000000-0000-0000-0000-000000000000	f591f579-309b-4010-a2cd-4fbf9d4d391d	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-10 15:53:47.136435+00	
00000000-0000-0000-0000-000000000000	9958766b-5669-4bd4-b732-ec950053ea33	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-10 15:53:47.142374+00	
00000000-0000-0000-0000-000000000000	5750414f-495a-4b90-9536-b6a8db6b2d9a	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-14 09:11:12.747471+00	
00000000-0000-0000-0000-000000000000	7cf6b761-c2d2-4750-82f4-7eef02097064	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-14 09:11:12.781529+00	
00000000-0000-0000-0000-000000000000	4adbeaa4-31af-44e0-9402-dba64dd7c680	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-04-14 09:25:48.393655+00	
00000000-0000-0000-0000-000000000000	248e5b9b-7681-4717-a90a-36ccc35c0acc	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-04-14 09:26:08.33575+00	
00000000-0000-0000-0000-000000000000	75290994-e90c-4c49-bbd5-26211d896404	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-04-14 09:26:24.57912+00	
00000000-0000-0000-0000-000000000000	41dec050-3284-4b17-afbb-02888cc71bf9	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-15 10:16:44.38263+00	
00000000-0000-0000-0000-000000000000	d55aca49-7902-485c-b53c-ff64a5cde1c7	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-15 10:16:44.403831+00	
00000000-0000-0000-0000-000000000000	ad13b79c-9bda-4329-b6eb-edf72f2506ee	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-15 12:51:11.10086+00	
00000000-0000-0000-0000-000000000000	2a129e8a-708e-45fa-af6a-8df38195ca26	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-15 12:51:11.106242+00	
00000000-0000-0000-0000-000000000000	76c0f293-f2e1-4a5e-a821-dd06f6769234	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-15 14:44:29.094114+00	
00000000-0000-0000-0000-000000000000	890e8edc-745d-4c2e-a098-73d84c5076f4	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-15 14:44:29.098538+00	
00000000-0000-0000-0000-000000000000	da24030c-8441-401f-8a8b-eee5b983eb53	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-15 15:45:18.402004+00	
00000000-0000-0000-0000-000000000000	38e66468-23f3-4a20-8f6a-20718cfb02ea	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-15 15:45:18.410094+00	
00000000-0000-0000-0000-000000000000	3d36724d-b1ba-4b12-852c-23953f89dbd3	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-16 09:01:17.837437+00	
00000000-0000-0000-0000-000000000000	b6780312-6c4c-412b-9387-f9514ec2edc1	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-16 09:01:17.855267+00	
00000000-0000-0000-0000-000000000000	38606dd8-b54b-4d13-99a5-912062223e36	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-16 10:00:17.404119+00	
00000000-0000-0000-0000-000000000000	abb7aa10-3400-4e8e-b936-f6ee6ec9d8f4	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-16 10:00:17.411057+00	
00000000-0000-0000-0000-000000000000	0d2fb7ba-8932-46af-87c1-6aa2d9040d5d	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-16 12:06:21.785596+00	
00000000-0000-0000-0000-000000000000	dd210e95-4c35-4e96-a135-29f5850ec64b	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-16 12:06:21.789084+00	
00000000-0000-0000-0000-000000000000	830acf8f-9b3e-4c4d-97c9-477398b78900	{"action":"logout","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-04-16 12:14:24.361796+00	
00000000-0000-0000-0000-000000000000	cb045375-2f3e-44b9-acc7-acc39b93d4b8	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-04-16 12:14:33.746403+00	
00000000-0000-0000-0000-000000000000	5f7a2bb3-659f-4a99-81ba-ed5ca677128e	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-04-16 12:14:54.269904+00	
00000000-0000-0000-0000-000000000000	ac2ee1cc-fcea-4cc8-a9ee-b74187a1e495	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-04-16 12:17:18.337615+00	
00000000-0000-0000-0000-000000000000	70e14245-5279-4525-b454-7537a7e28a23	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-04-16 12:19:03.303431+00	
00000000-0000-0000-0000-000000000000	8c54c2a5-0c7f-4ccf-873f-9f9af7510382	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-04-16 12:25:05.678615+00	
00000000-0000-0000-0000-000000000000	644e8cf6-3c56-4eb4-bb8f-6f3d4457b795	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-04-16 12:25:55.615974+00	
00000000-0000-0000-0000-000000000000	1154026e-3fae-4c70-9f7b-24b40c643122	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-16 14:19:34.768135+00	
00000000-0000-0000-0000-000000000000	1bad3f2a-f17a-41e1-933c-f96476929669	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-16 14:19:34.778282+00	
00000000-0000-0000-0000-000000000000	193a82d9-e166-42ac-8a51-50d29becb379	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-04-16 14:32:24.943947+00	
00000000-0000-0000-0000-000000000000	d92afbdd-80bd-4f0b-a5d2-3f85b33b470c	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-16 14:55:30.134658+00	
00000000-0000-0000-0000-000000000000	9ccad50c-a7a2-4679-8420-d30f6dbd4ea8	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-16 14:55:30.143389+00	
00000000-0000-0000-0000-000000000000	9c9e2412-caec-466b-87fd-b258d870c9d8	{"action":"logout","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-04-16 15:00:02.0991+00	
00000000-0000-0000-0000-000000000000	4cd6d0d3-7819-4d49-a8ab-55548f169a08	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-16 16:30:52.266278+00	
00000000-0000-0000-0000-000000000000	236b6459-a40f-4111-bda6-bca2b355941d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-16 16:30:52.276446+00	
00000000-0000-0000-0000-000000000000	3473af59-2964-4fca-9fa9-1406e939b816	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-17 07:45:19.495397+00	
00000000-0000-0000-0000-000000000000	7dd6e3be-72bc-4358-ae0e-ee904cfe3265	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-17 07:45:19.524252+00	
00000000-0000-0000-0000-000000000000	32072bd1-9298-4f42-9887-e7065c279b27	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-17 08:48:22.46939+00	
00000000-0000-0000-0000-000000000000	07bb46d7-8a55-4dfa-a20d-40135da1697f	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-17 08:48:22.47998+00	
00000000-0000-0000-0000-000000000000	df510fbb-c2c7-43d7-aa00-d91739814ca7	{"action":"login","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-04-17 08:51:46.160247+00	
00000000-0000-0000-0000-000000000000	91eb308d-9dc7-4359-ad45-acba392eb3e5	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-17 09:46:37.313229+00	
00000000-0000-0000-0000-000000000000	0f89a33b-c588-451c-b0bb-b02c8a09c9df	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-17 09:46:37.318559+00	
00000000-0000-0000-0000-000000000000	506f1cc2-6cb0-412d-994c-06b00c56b1cc	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-04-17 09:47:59.265779+00	
00000000-0000-0000-0000-000000000000	dae56c5d-39cf-4b30-be49-0bd8709e6103	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-17 10:05:11.880504+00	
00000000-0000-0000-0000-000000000000	0b1e2959-1703-436a-b361-42264914fe4d	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-17 10:05:11.883296+00	
00000000-0000-0000-0000-000000000000	76009ee5-3eac-45a4-afcc-5df18cdb0338	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-17 12:09:51.477615+00	
00000000-0000-0000-0000-000000000000	b52b7db7-caa4-4a02-8f23-739e50e7ad38	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-17 12:09:51.482652+00	
00000000-0000-0000-0000-000000000000	d340006c-0e46-4989-9d78-c2891dfdf94a	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-17 12:09:51.486061+00	
00000000-0000-0000-0000-000000000000	ee1e199e-eb8c-4b30-a6c5-278c330deddd	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-17 12:09:51.48771+00	
00000000-0000-0000-0000-000000000000	850a38ee-bd74-4cc1-9a9d-5a735fb98400	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-17 13:09:56.801387+00	
00000000-0000-0000-0000-000000000000	bdb47d3d-3a58-43f7-9a63-3c1738b02b3b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-17 13:09:56.813631+00	
00000000-0000-0000-0000-000000000000	6f3e8ef6-dc73-45b6-8048-5f62bec301d5	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-17 14:19:03.194911+00	
00000000-0000-0000-0000-000000000000	d85eff74-4831-423c-8842-328ae39f3d37	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-17 14:19:03.199088+00	
00000000-0000-0000-0000-000000000000	b2dc400f-4614-4baa-8190-94529d8b85a7	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-17 14:21:18.385861+00	
00000000-0000-0000-0000-000000000000	5813443f-9685-44d3-9a65-ab89a7f3359b	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-17 14:21:18.386755+00	
00000000-0000-0000-0000-000000000000	99bd36b3-ee75-4ae7-88dd-97f438fe70a7	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-17 14:41:23.788646+00	
00000000-0000-0000-0000-000000000000	d4024bca-6609-40f0-ba9e-7abd42fc6e51	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-17 14:41:23.792783+00	
00000000-0000-0000-0000-000000000000	d00ee43e-38c2-4225-847e-f530af19eca6	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-19 14:57:28.283621+00	
00000000-0000-0000-0000-000000000000	605325a2-894a-47f7-8b55-195ae0435a6c	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-19 14:57:28.316468+00	
00000000-0000-0000-0000-000000000000	a7063327-1f4d-430c-9ca0-338afa64e792	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-19 14:58:00.802967+00	
00000000-0000-0000-0000-000000000000	617d0672-050f-44b5-81bf-1c73c8b536c7	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-19 14:58:00.806189+00	
00000000-0000-0000-0000-000000000000	55eab6cf-2484-4ae0-856d-a3159d57431a	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-19 14:58:19.050617+00	
00000000-0000-0000-0000-000000000000	549c547f-8c08-4f28-bbdc-0136ccb8ddc1	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-19 14:58:19.051431+00	
00000000-0000-0000-0000-000000000000	65abeeed-91f2-4b37-a7f8-bb0106fd8aa7	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-19 15:57:46.390362+00	
00000000-0000-0000-0000-000000000000	4633e6d3-e092-4510-8ed6-db9252721e49	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-19 15:57:46.398621+00	
00000000-0000-0000-0000-000000000000	822dc5cf-f017-4289-9033-593b9566e7e8	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-19 15:58:40.785416+00	
00000000-0000-0000-0000-000000000000	476f598c-48bc-4ba7-a4d8-0efe1ed60669	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-19 15:58:40.789547+00	
00000000-0000-0000-0000-000000000000	84524711-ac1a-478f-a942-2f150728c603	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-19 16:00:00.395972+00	
00000000-0000-0000-0000-000000000000	a12c3f71-8b98-4114-8662-f9803bf0b2e8	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-19 16:00:00.400876+00	
00000000-0000-0000-0000-000000000000	ccd9c275-4ae4-44ab-a7dd-82c6721293e3	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-19 17:00:52.035323+00	
00000000-0000-0000-0000-000000000000	27657987-b105-413b-96b0-3b26cf11c1e0	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-19 17:00:52.036428+00	
00000000-0000-0000-0000-000000000000	66b066eb-e938-4548-a1d5-975564d94a75	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-22 07:50:41.901215+00	
00000000-0000-0000-0000-000000000000	4c5eb56f-5ffb-46c6-904d-f60a42c8311e	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-22 07:50:41.921782+00	
00000000-0000-0000-0000-000000000000	030823ba-ba3d-4726-9fb2-eaaa275a21fb	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-22 08:50:53.818011+00	
00000000-0000-0000-0000-000000000000	bf146bc2-3740-46b3-964a-8d85ff0edac6	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-22 08:50:53.825152+00	
00000000-0000-0000-0000-000000000000	e0462b00-fe92-4a6e-8fdc-90ead59036f3	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 09:34:39.025472+00	
00000000-0000-0000-0000-000000000000	3adf28dc-ed96-4153-8d08-5c45bc61f37b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 09:34:39.028533+00	
00000000-0000-0000-0000-000000000000	254c1645-3698-4f92-b615-12a0d8bc648b	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-22 10:01:07.222035+00	
00000000-0000-0000-0000-000000000000	a2312394-958d-44da-a796-802804598017	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-22 10:01:07.224276+00	
00000000-0000-0000-0000-000000000000	e391c6c3-1246-49ae-86d7-b46bc88ce6f7	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 10:17:12.687933+00	
00000000-0000-0000-0000-000000000000	6bb29e44-a6a5-4b27-94c1-5570f2b346a2	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-22 10:17:12.691048+00	
00000000-0000-0000-0000-000000000000	f82ed211-d17a-4c97-8ff2-16d9735368ed	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 09:04:40.748741+00	
00000000-0000-0000-0000-000000000000	9a3f4461-5ba5-450c-a0fe-a2e2f8ed883c	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 09:04:40.773967+00	
00000000-0000-0000-0000-000000000000	e72ea244-eb86-4b49-b0a2-59f82719c8ce	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 09:12:46.25244+00	
00000000-0000-0000-0000-000000000000	6e5cc1b8-b011-434c-9f64-fd2580b968e4	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 09:12:46.254781+00	
00000000-0000-0000-0000-000000000000	e475a87c-a6d9-4d1b-af89-c0cc4197de1a	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 10:05:16.831764+00	
00000000-0000-0000-0000-000000000000	5de9d903-0bb7-4582-afdd-6d9667e43a1c	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 10:05:16.835891+00	
00000000-0000-0000-0000-000000000000	951944ec-9f9d-4a9b-851f-85ac00bbcc42	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 12:27:08.913386+00	
00000000-0000-0000-0000-000000000000	34d1f7e7-cc0f-4f37-a10d-79446606e238	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 12:27:08.927413+00	
00000000-0000-0000-0000-000000000000	b5d6cbae-6477-49a3-bf85-9c952fade857	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 12:34:02.07152+00	
00000000-0000-0000-0000-000000000000	96ad37e3-1001-4d53-af90-3d4158cd1461	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 12:34:02.078168+00	
00000000-0000-0000-0000-000000000000	e423a1f6-3e6e-4e2f-aedf-5be2a27bd3e5	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-23 12:34:58.258798+00	
00000000-0000-0000-0000-000000000000	ed112772-0e4b-4055-a8ae-8e26a072a5f6	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-23 12:34:58.261443+00	
00000000-0000-0000-0000-000000000000	33b97bed-0edf-4f42-8528-53137f2303a1	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-23 13:38:17.776092+00	
00000000-0000-0000-0000-000000000000	4a862b08-8601-473d-804b-78c161c57525	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-23 13:38:17.780321+00	
00000000-0000-0000-0000-000000000000	f5b9a405-7884-4288-b822-7cc06676e068	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-23 15:05:28.22617+00	
00000000-0000-0000-0000-000000000000	e18fb95b-02a0-41db-b178-ec7ee5b890c5	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-23 15:05:28.230096+00	
00000000-0000-0000-0000-000000000000	bb60f01e-9af4-4c98-bd21-db742a29e5f0	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 15:28:24.248024+00	
00000000-0000-0000-0000-000000000000	ebe5d417-f297-4744-b2c0-15bdccb42d13	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 15:28:24.250443+00	
00000000-0000-0000-0000-000000000000	2e5ff81c-d86e-4f89-9948-34c5f56d3085	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 15:28:28.250061+00	
00000000-0000-0000-0000-000000000000	6fddef8d-4464-44fb-a397-0f32119f85d9	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 15:28:28.251911+00	
00000000-0000-0000-0000-000000000000	4a23bad9-9ce6-42b5-9597-6ba2a7bb720c	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 16:28:52.960751+00	
00000000-0000-0000-0000-000000000000	e9fc31ef-0adc-4e33-8487-e019df23f669	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 16:28:52.963285+00	
00000000-0000-0000-0000-000000000000	30749e90-ab6b-4a5c-95af-abb2a7e3dc4b	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 19:54:45.889006+00	
00000000-0000-0000-0000-000000000000	d2d101dc-9ab8-4b53-aed4-808d77734aaa	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 19:54:45.89534+00	
00000000-0000-0000-0000-000000000000	820fb280-2513-4ce1-b0de-1db9511415ab	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 20:02:37.883527+00	
00000000-0000-0000-0000-000000000000	c8d0f105-5fbf-4d07-a216-e56e9c4cbe77	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 20:02:37.888029+00	
00000000-0000-0000-0000-000000000000	f20a7b69-1ed7-467e-a610-0e099043a92b	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 20:55:01.919262+00	
00000000-0000-0000-0000-000000000000	a7066195-e415-471a-9aad-eb27276633f1	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 20:55:01.925796+00	
00000000-0000-0000-0000-000000000000	4a82398d-ff97-4650-8dc4-fdb85d0e36a5	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 21:03:12.854201+00	
00000000-0000-0000-0000-000000000000	bbe0a1fa-b578-4cd6-91ec-115692f6b08d	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-23 21:03:12.858479+00	
00000000-0000-0000-0000-000000000000	a9dd093d-b8ff-4f1a-a0f3-ef366e13fe86	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-24 10:49:14.587122+00	
00000000-0000-0000-0000-000000000000	9a2923ba-dc56-4c74-9164-35ebfec880c9	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-04-24 10:49:14.611989+00	
00000000-0000-0000-0000-000000000000	375fbecb-b5ea-4449-ae72-52431a92b8df	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-28 21:44:37.715112+00	
00000000-0000-0000-0000-000000000000	ea80ee78-459b-4e12-8e85-42437428c3bd	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-28 21:44:37.733994+00	
00000000-0000-0000-0000-000000000000	da0db07a-f62f-4ef6-a4a6-684bf021bfdb	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 09:28:30.426469+00	
00000000-0000-0000-0000-000000000000	77769ba1-bdb5-449e-8ace-18b11562ce00	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 09:28:30.453046+00	
00000000-0000-0000-0000-000000000000	408eb801-7ef1-4250-8aa1-9d379277b5d1	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-06 09:30:36.635112+00	
00000000-0000-0000-0000-000000000000	11dd7c72-7b95-444d-bc88-8fd125ba30d4	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-06 09:39:50.118909+00	
00000000-0000-0000-0000-000000000000	8827a6cc-82f1-48c8-892d-c076aba1ca0e	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-06 09:45:02.984552+00	
00000000-0000-0000-0000-000000000000	31ca24d8-cff0-490c-91b4-effee631e92b	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 10:28:51.291325+00	
00000000-0000-0000-0000-000000000000	59416193-ab3b-4b36-a8b0-7991ddf22f97	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 10:28:51.294728+00	
00000000-0000-0000-0000-000000000000	834f3699-eb29-40e4-83d6-626149d3c201	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 11:38:53.498201+00	
00000000-0000-0000-0000-000000000000	8692f595-12a3-4b38-9f36-95ecdca35af0	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 11:38:53.502008+00	
00000000-0000-0000-0000-000000000000	65fe834e-8f64-41e4-8052-8db5f9a9cdac	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 11:48:47.680465+00	
00000000-0000-0000-0000-000000000000	fda290b7-03a8-4ab8-8aa6-4deeaf1c7458	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 11:48:47.684579+00	
00000000-0000-0000-0000-000000000000	fab0c59e-5563-4a8f-976c-503bf172ec69	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 12:41:20.304752+00	
00000000-0000-0000-0000-000000000000	e1750c84-efa4-4ea4-9f56-907ef3ef28a8	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 12:41:20.307868+00	
00000000-0000-0000-0000-000000000000	98ac2835-056d-4ea2-9e2c-f34920ca08d8	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 13:16:18.285924+00	
00000000-0000-0000-0000-000000000000	1a3574da-ce01-4eaf-8987-b97ef831110f	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 13:16:18.289598+00	
00000000-0000-0000-0000-000000000000	adbb998e-2a47-4f0c-9593-2d7f386daaf9	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 13:47:58.481912+00	
00000000-0000-0000-0000-000000000000	2ee9e37a-3858-48e0-828d-8a5c28c78f87	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 13:47:58.495036+00	
00000000-0000-0000-0000-000000000000	84361617-b008-4d93-8b4e-17850082cdcd	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 14:17:37.44909+00	
00000000-0000-0000-0000-000000000000	10e0ba51-82f1-4059-baee-a1bd79214864	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 14:17:37.454367+00	
00000000-0000-0000-0000-000000000000	d978cdeb-395e-437a-b23a-28a351381ee6	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 14:49:04.96913+00	
00000000-0000-0000-0000-000000000000	6c62b872-9cb4-45ce-a806-4858ce303245	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 14:49:04.972192+00	
00000000-0000-0000-0000-000000000000	9cad0e29-529b-45be-9b99-92798117b420	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 15:22:13.862441+00	
00000000-0000-0000-0000-000000000000	47c97909-1601-4f0c-904a-95f34ddc4eed	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 15:22:13.867177+00	
00000000-0000-0000-0000-000000000000	a6320055-4c0c-44dd-9d88-6371d28c23a3	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 15:52:12.741959+00	
00000000-0000-0000-0000-000000000000	03167a28-a72c-4925-9c70-694845760dac	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 15:52:12.743957+00	
00000000-0000-0000-0000-000000000000	04bf9e9d-8792-44ab-8a0d-2b856ffe47cb	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 16:25:22.58266+00	
00000000-0000-0000-0000-000000000000	12a7cb5f-6567-4f6d-94cf-6b62833a69a5	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 16:25:22.586674+00	
00000000-0000-0000-0000-000000000000	df0eb805-b750-4b81-bc96-5828019f548b	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 17:08:34.855228+00	
00000000-0000-0000-0000-000000000000	5ecca5bc-f079-4ba3-9afe-dca9c87b2e2d	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-06 17:08:34.857921+00	
00000000-0000-0000-0000-000000000000	deeff87f-faa5-4085-9ccf-c425b06d5563	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 17:27:16.35071+00	
00000000-0000-0000-0000-000000000000	de525853-de54-4623-888d-7391a01c74a6	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-06 17:27:16.354018+00	
00000000-0000-0000-0000-000000000000	32588aeb-8728-4946-8d8f-b113e265c8d4	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-15 13:37:56.858255+00	
00000000-0000-0000-0000-000000000000	d356604c-cfec-4ce4-89ab-45413fd92cdf	{"action":"token_refreshed","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 13:28:19.305331+00	
00000000-0000-0000-0000-000000000000	2fec676a-6195-4a73-905a-fa0c21698ee3	{"action":"token_revoked","actor_id":"608933cb-43c1-40e7-ab5b-168ddc332884","actor_name":"xingxing li","actor_username":"liyuanying22501@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-07 13:28:19.321957+00	
00000000-0000-0000-0000-000000000000	65d765f3-e0c5-4a99-9b4e-de57ab23d926	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-15 08:09:14.359788+00	
00000000-0000-0000-0000-000000000000	7013f2dd-335c-4667-a4c4-dc331097a6f8	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 09:08:21.596055+00	
00000000-0000-0000-0000-000000000000	3d2e90c7-ef28-4302-a3e8-8e9038a99624	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 09:08:21.598553+00	
00000000-0000-0000-0000-000000000000	96332ecc-2840-4fbd-9526-c8ada91e87a5	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-15 09:08:34.581975+00	
00000000-0000-0000-0000-000000000000	46fb5e0a-ef31-40c9-973b-8d48b17982a1	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-15 09:08:34.582521+00	
00000000-0000-0000-0000-000000000000	c0e896b3-09cb-4536-9381-38658f1d85ad	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-15 11:40:37.231573+00	
00000000-0000-0000-0000-000000000000	1bc99b6a-dad3-4965-8cce-4b3412e614f6	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-15 11:40:37.233849+00	
00000000-0000-0000-0000-000000000000	bfa96e59-6196-4206-ba72-d4817d712286	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 11:40:38.791077+00	
00000000-0000-0000-0000-000000000000	c4f44751-e7c1-482d-9092-107167ec6d9b	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 11:40:38.791675+00	
00000000-0000-0000-0000-000000000000	c1748b0f-32d8-4a38-85e8-f8bb1c3c4ddf	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-15 13:22:59.680035+00	
00000000-0000-0000-0000-000000000000	1b2404b7-dd21-451e-85ab-54d62246bb7c	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-15 13:22:59.681602+00	
00000000-0000-0000-0000-000000000000	6f2196ae-699b-4128-9483-5e6850e7dc69	{"action":"token_refreshed","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 13:23:00.004846+00	
00000000-0000-0000-0000-000000000000	1f045030-dc2a-4cc0-a8db-39af5f1da67c	{"action":"token_revoked","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-05-15 13:23:00.005487+00	
00000000-0000-0000-0000-000000000000	78d87f10-6d5e-479c-886d-b8bdd60adf23	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-15 13:54:45.3727+00	
00000000-0000-0000-0000-000000000000	eec4b19e-b021-4cda-873d-0fc091aaa61b	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-15 13:56:08.753616+00	
00000000-0000-0000-0000-000000000000	e37bda02-ed3e-45c9-b6b2-01a676d23040	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-05-15 13:56:57.088615+00	
00000000-0000-0000-0000-000000000000	0eac919d-fa83-4188-a89d-ea5c86f08a31	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-15 13:57:29.936351+00	
00000000-0000-0000-0000-000000000000	bb0039f3-26b1-47c1-b38a-73139e53ab1b	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-15 13:57:46.177445+00	
00000000-0000-0000-0000-000000000000	ab88c5e0-52d3-4bf1-aa10-291dfb6cef3e	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-15 14:08:09.695843+00	
00000000-0000-0000-0000-000000000000	c90e518a-0438-4020-9062-82d95889a0b0	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-15 14:11:14.638021+00	
00000000-0000-0000-0000-000000000000	65f2ea22-5dc3-4121-822a-1bd6e4932c72	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-15 14:11:26.947938+00	
00000000-0000-0000-0000-000000000000	8f34948d-c0ab-4120-98aa-f694eddedcd0	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-15 14:12:01.833958+00	
00000000-0000-0000-0000-000000000000	a649ba1c-67f9-4448-bebf-b5c96b1f559d	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-15 14:12:10.930406+00	
00000000-0000-0000-0000-000000000000	dd91648f-76fd-439a-93eb-bda2665c0c17	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-15 17:24:30.943319+00	
00000000-0000-0000-0000-000000000000	41165ce9-949e-4bbc-a9c2-59acf515e91d	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-15 17:24:30.948326+00	
00000000-0000-0000-0000-000000000000	bb63c1a2-8986-4236-9565-592e56b23190	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-16 08:03:39.091084+00	
00000000-0000-0000-0000-000000000000	c647116e-1b3f-4771-bcb9-0e798d3ac7e5	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-16 08:03:39.110618+00	
00000000-0000-0000-0000-000000000000	488772f0-83c0-4203-aa47-b8d98ab0e760	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-05-16 08:04:43.320836+00	
00000000-0000-0000-0000-000000000000	b24b6982-cc46-4d33-a917-dab77690abcc	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-16 08:05:39.526684+00	
00000000-0000-0000-0000-000000000000	d7832a1a-099f-4f67-b82f-ab9581a74e86	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-16 08:09:49.131119+00	
00000000-0000-0000-0000-000000000000	374339e7-3658-4aed-84b5-d66efe26ba19	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-16 08:09:59.546717+00	
00000000-0000-0000-0000-000000000000	c528c853-1cdd-4056-b869-1fb2933e4d5f	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-05-16 08:12:45.381463+00	
00000000-0000-0000-0000-000000000000	b831e997-be64-4303-a14d-32a4d42e9b4b	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-16 08:13:01.724367+00	
00000000-0000-0000-0000-000000000000	5b0756d6-2567-4f63-8f8c-0d6e6e28b73d	{"action":"logout","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account"}	2025-05-16 08:14:58.176647+00	
00000000-0000-0000-0000-000000000000	6deb5f72-1ac9-4895-a651-50cbbe93a869	{"action":"login","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-16 08:15:06.139073+00	
00000000-0000-0000-0000-000000000000	42f6de2a-1208-4810-bedc-1832ced73d8f	{"action":"logout","actor_id":"e10b017b-8690-4346-91e8-8cd5e590cb77","actor_name":"YY Li","actor_username":"liyuanying225@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-16 08:15:52.358673+00	
00000000-0000-0000-0000-000000000000	588bb192-fafc-4904-9f87-7d697ab9601c	{"action":"login","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-05-16 08:16:11.005915+00	
00000000-0000-0000-0000-000000000000	8956f2f6-63d6-4bde-bba6-779a19571e46	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-16 09:14:57.223412+00	
00000000-0000-0000-0000-000000000000	009861b9-15d3-4e5f-861f-0f3434a1d39a	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-16 09:14:57.226316+00	
00000000-0000-0000-0000-000000000000	fa4aeaac-104f-4869-8cdd-a3d81e92c179	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-16 16:17:55.007185+00	
00000000-0000-0000-0000-000000000000	2972116d-ea7f-447f-bd9f-59c9d27f0ddc	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-16 16:17:55.013181+00	
00000000-0000-0000-0000-000000000000	570b1a7d-44b9-44bf-a89b-281d66d46009	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-16 21:13:02.527437+00	
00000000-0000-0000-0000-000000000000	97931d8c-a906-4113-82b0-8a1d7006c299	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-16 21:13:02.528979+00	
00000000-0000-0000-0000-000000000000	4e337ad2-abb7-47c8-865a-8476dcb85f3f	{"action":"token_refreshed","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-18 16:13:16.388218+00	
00000000-0000-0000-0000-000000000000	e26d1116-907e-43e4-a8f5-08bc80eb2336	{"action":"token_revoked","actor_id":"666c367b-78af-4751-8900-3bb58de194c2","actor_name":"Yuanying Li","actor_username":"yuanying.li@alephium.org","actor_via_sso":false,"log_type":"token"}	2025-05-18 16:13:16.39874+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
110989784505762337733	fd41e914-9d40-403f-99bf-bbb411cfabdb	{"iss": "https://accounts.google.com", "sub": "110989784505762337733", "name": "s am", "email": "sam135642@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocL3lCSXaVdMEwI_5HvAEIjRLOR1HUmKnNdOzEvjQWCMZjU9hVJ5Rw=s96-c", "full_name": "s am", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocL3lCSXaVdMEwI_5HvAEIjRLOR1HUmKnNdOzEvjQWCMZjU9hVJ5Rw=s96-c", "provider_id": "110989784505762337733", "email_verified": true, "phone_verified": false}	google	2025-01-21 21:48:33.671103+00	2025-01-21 21:48:33.671156+00	2025-01-23 12:46:59.334462+00	879f1e4a-781c-4212-aad4-6935944cc656
114711702543049943448	786bac5f-eac2-4660-bd50-2dbb243841a6	{"iss": "https://accounts.google.com", "sub": "114711702543049943448", "name": "Sam Data", "email": "the.samedata@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKmWt7wC2ZU_a237L4p7eZMH03Klit5R7X0oPMdiMxjF9iOhXw=s96-c", "full_name": "Sam Data", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKmWt7wC2ZU_a237L4p7eZMH03Klit5R7X0oPMdiMxjF9iOhXw=s96-c", "provider_id": "114711702543049943448", "email_verified": true, "phone_verified": false}	google	2025-01-21 21:49:22.535761+00	2025-01-21 21:49:22.535805+00	2025-01-21 22:01:51.247424+00	fb306bd8-095c-42c4-8454-bdcb730a3c44
105660652955818453241	ebe4bda0-22a0-4848-a6f7-0deeb303e96a	{"iss": "https://accounts.google.com", "sub": "105660652955818453241", "name": "photo Sam", "email": "the.samphotoo@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKL8-4iZQSgrXccsOy1jLjJ9debYMXHV1mPcwnGI58LDPKV-t0C_g=s96-c", "full_name": "photo Sam", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKL8-4iZQSgrXccsOy1jLjJ9debYMXHV1mPcwnGI58LDPKV-t0C_g=s96-c", "provider_id": "105660652955818453241", "email_verified": true, "phone_verified": false}	google	2025-01-21 22:02:50.651485+00	2025-01-21 22:02:50.651533+00	2025-01-21 22:09:31.524358+00	e73d49ac-e43d-415c-9690-2d7642941376
110646003110127543865	608933cb-43c1-40e7-ab5b-168ddc332884	{"iss": "https://accounts.google.com", "sub": "110646003110127543865", "name": "xingxing li", "email": "liyuanying22501@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKmp3bGHXfb3Y9CE3u4dG2uzKFR1pVLvtLPg9Wg6YK6MFoIGbU=s96-c", "full_name": "xingxing li", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKmp3bGHXfb3Y9CE3u4dG2uzKFR1pVLvtLPg9Wg6YK6MFoIGbU=s96-c", "provider_id": "110646003110127543865", "email_verified": true, "phone_verified": false}	google	2025-01-21 21:41:57.121665+00	2025-01-21 21:41:57.121717+00	2025-04-17 08:51:46.142563+00	81f43690-9b9e-48f4-b677-9a010e6ba83c
109439022	e10b017b-8690-4346-91e8-8cd5e590cb77	{"iss": "https://api.github.com", "sub": "109439022", "name": "YY", "email": "liyuanying225@gmail.com", "full_name": "YY", "user_name": "YYBer", "avatar_url": "https://avatars.githubusercontent.com/u/109439022?v=4", "provider_id": "109439022", "email_verified": true, "phone_verified": false, "preferred_username": "YYBer"}	github	2025-02-05 09:54:15.129896+00	2025-02-05 09:54:15.129945+00	2025-02-11 10:19:49.985505+00	fb833788-1bd8-4d0d-b80d-3ffa8bf03d4f
114460818463842497898	666c367b-78af-4751-8900-3bb58de194c2	{"iss": "https://accounts.google.com", "sub": "114460818463842497898", "name": "Yuanying Li", "email": "yuanying.li@alephium.org", "picture": "https://lh3.googleusercontent.com/a/ACg8ocIpOQOWTHWo3_vU2XdGYILx2iYFZ44LuQVxXqjHmtYa-bDlqQ=s96-c", "full_name": "Yuanying Li", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocIpOQOWTHWo3_vU2XdGYILx2iYFZ44LuQVxXqjHmtYa-bDlqQ=s96-c", "provider_id": "114460818463842497898", "custom_claims": {"hd": "alephium.org"}, "email_verified": true, "phone_verified": false}	google	2025-01-14 15:28:27.42254+00	2025-01-14 15:28:27.422595+00	2025-05-16 08:16:11.00127+00	7ce1eaa8-425d-484d-8e37-dd952a9b6b0a
113493635279017919558	e10b017b-8690-4346-91e8-8cd5e590cb77	{"iss": "https://accounts.google.com", "sub": "113493635279017919558", "name": "YY Li", "email": "liyuanying225@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKsq7K5Kcz_JhqYoJJ1-1Zt7ewI69-G7QXrfhQ4VwM4h-giyBmi=s96-c", "full_name": "YY Li", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKsq7K5Kcz_JhqYoJJ1-1Zt7ewI69-G7QXrfhQ4VwM4h-giyBmi=s96-c", "provider_id": "113493635279017919558", "email_verified": true, "phone_verified": false}	google	2025-01-09 13:45:02.299289+00	2025-01-09 13:45:02.299341+00	2025-05-16 08:15:06.135044+00	8860bdb4-7e6e-48c9-a6e6-e3855720f4aa
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
9fe01ed2-1996-4342-a112-9c41123c98ce	2025-04-17 08:51:46.172479+00	2025-04-17 08:51:46.172479+00	oauth	b25be6e4-1527-41c3-ad71-21f55d8fcae7
1c66bd9e-5f57-457a-8ecf-98559bc03d92	2025-05-16 08:16:11.009067+00	2025-05-16 08:16:11.009067+00	oauth	f2d9e929-7205-4018-8b20-fb4e7112f44a
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	628	mae6iHHvyU0XX1MgzPxG1w	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-17 10:05:11.88594+00	2025-04-17 14:21:18.389205+00	W9KQE3gxMwPQ7hz068Gmkg	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	700	dlcva4binc6v	666c367b-78af-4751-8900-3bb58de194c2	t	2025-05-16 08:16:11.007229+00	2025-05-16 09:14:57.228211+00	\N	1c66bd9e-5f57-457a-8ecf-98559bc03d92
00000000-0000-0000-0000-000000000000	701	25jhf5oihhzp	666c367b-78af-4751-8900-3bb58de194c2	t	2025-05-16 09:14:57.229456+00	2025-05-16 16:17:55.014887+00	dlcva4binc6v	1c66bd9e-5f57-457a-8ecf-98559bc03d92
00000000-0000-0000-0000-000000000000	639	5pi8CXs5e7S0oyT3psPhJA	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-19 15:58:40.792469+00	2025-04-22 10:17:12.691585+00	G-zZHJbjuMTztuZnysAfLw	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	647	-wp9X5OFNpQShQVf8wTfpQ	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-23 09:04:40.792055+00	2025-04-23 10:05:16.843237+00	padG5Wce4pbzkxy-65tG6Q	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	649	1oNkIpy3Y1FKj1AQp5lRkA	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-23 10:05:16.846859+00	2025-04-23 12:27:08.929899+00	-wp9X5OFNpQShQVf8wTfpQ	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	702	pt46w7ruqghu	666c367b-78af-4751-8900-3bb58de194c2	t	2025-05-16 16:17:55.017504+00	2025-05-16 21:13:02.532869+00	25jhf5oihhzp	1c66bd9e-5f57-457a-8ecf-98559bc03d92
00000000-0000-0000-0000-000000000000	655	498QOp_ejV_VA344Ke0BZA	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-23 15:28:24.256182+00	2025-04-23 19:54:45.896762+00	69pEePP4VQNKvnkzT70rCw	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	658	J0qbrPHiXHq-HNyFeBv9jg	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-23 19:54:45.902443+00	2025-04-23 20:55:01.928154+00	498QOp_ejV_VA344Ke0BZA	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	660	HqjSFNbapdXoPdhWZj0yug	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-23 20:55:01.932594+00	2025-04-28 21:44:37.738078+00	J0qbrPHiXHq-HNyFeBv9jg	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	703	osc3t4uxdjdg	666c367b-78af-4751-8900-3bb58de194c2	t	2025-05-16 21:13:02.535226+00	2025-05-18 16:13:16.401097+00	pt46w7ruqghu	1c66bd9e-5f57-457a-8ecf-98559bc03d92
00000000-0000-0000-0000-000000000000	625	W9KQE3gxMwPQ7hz068Gmkg	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-17 08:51:46.170459+00	2025-04-17 10:05:11.884548+00	\N	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	663	AscoPXr4_nIkGCcM8QnEsg	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-28 21:44:37.749794+00	2025-05-07 13:28:19.325451+00	HqjSFNbapdXoPdhWZj0yug	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	704	xk3yjhkqwz6p	666c367b-78af-4751-8900-3bb58de194c2	f	2025-05-18 16:13:16.40711+00	2025-05-18 16:13:16.40711+00	osc3t4uxdjdg	1c66bd9e-5f57-457a-8ecf-98559bc03d92
00000000-0000-0000-0000-000000000000	633	5B0IhE71PHq3uNbN1BaJOQ	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-17 14:21:18.389915+00	2025-04-19 14:58:19.051997+00	mae6iHHvyU0XX1MgzPxG1w	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	637	G-zZHJbjuMTztuZnysAfLw	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-19 14:58:19.053002+00	2025-04-19 15:58:40.790835+00	5B0IhE71PHq3uNbN1BaJOQ	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	646	padG5Wce4pbzkxy-65tG6Q	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-22 10:17:12.6941+00	2025-04-23 09:04:40.778961+00	5pi8CXs5e7S0oyT3psPhJA	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	650	69pEePP4VQNKvnkzT70rCw	608933cb-43c1-40e7-ab5b-168ddc332884	t	2025-04-23 12:27:08.93609+00	2025-04-23 15:28:24.251749+00	1oNkIpy3Y1FKj1AQp5lRkA	9fe01ed2-1996-4342-a112-9c41123c98ce
00000000-0000-0000-0000-000000000000	681	w5iodw6cicob	608933cb-43c1-40e7-ab5b-168ddc332884	f	2025-05-07 13:28:19.343817+00	2025-05-07 13:28:19.343817+00	AscoPXr4_nIkGCcM8QnEsg	9fe01ed2-1996-4342-a112-9c41123c98ce
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
9fe01ed2-1996-4342-a112-9c41123c98ce	608933cb-43c1-40e7-ab5b-168ddc332884	2025-04-17 08:51:46.163087+00	2025-05-07 13:28:19.36386+00	\N	aal1	\N	2025-05-07 13:28:19.363771	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36	24.40.157.2	\N
1c66bd9e-5f57-457a-8ecf-98559bc03d92	666c367b-78af-4751-8900-3bb58de194c2	2025-05-16 08:16:11.006519+00	2025-05-18 16:13:16.420473+00	\N	aal1	\N	2025-05-18 16:13:16.420398	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36	94.139.31.92	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous, design_skills, content_skills) FROM stdin;
00000000-0000-0000-0000-000000000000	fd41e914-9d40-403f-99bf-bbb411cfabdb	authenticated	authenticated	sam135642@gmail.com	\N	2025-01-21 21:48:33.674305+00	\N		\N		\N			\N	2025-01-23 12:46:59.339393+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "110989784505762337733", "name": "s am", "email": "sam135642@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocL3lCSXaVdMEwI_5HvAEIjRLOR1HUmKnNdOzEvjQWCMZjU9hVJ5Rw=s96-c", "full_name": "s am", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocL3lCSXaVdMEwI_5HvAEIjRLOR1HUmKnNdOzEvjQWCMZjU9hVJ5Rw=s96-c", "provider_id": "110989784505762337733", "email_verified": true, "phone_verified": false}	\N	2025-01-21 21:48:33.667852+00	2025-01-23 12:46:59.34302+00	\N	\N			\N		0	\N		\N	f	\N	f	{}	{}
00000000-0000-0000-0000-000000000000	ebe4bda0-22a0-4848-a6f7-0deeb303e96a	authenticated	authenticated	the.samphotoo@gmail.com	\N	2025-01-21 22:02:50.656821+00	\N		\N		\N			\N	2025-01-21 22:09:31.535103+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "105660652955818453241", "name": "photo Sam", "email": "the.samphotoo@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKL8-4iZQSgrXccsOy1jLjJ9debYMXHV1mPcwnGI58LDPKV-t0C_g=s96-c", "full_name": "photo Sam", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKL8-4iZQSgrXccsOy1jLjJ9debYMXHV1mPcwnGI58LDPKV-t0C_g=s96-c", "provider_id": "105660652955818453241", "email_verified": true, "phone_verified": false}	\N	2025-01-21 22:02:50.647029+00	2025-01-22 19:42:00.815425+00	\N	\N			\N		0	\N		\N	f	\N	f	{}	{}
00000000-0000-0000-0000-000000000000	786bac5f-eac2-4660-bd50-2dbb243841a6	authenticated	authenticated	the.samedata@gmail.com	\N	2025-01-21 21:49:22.538941+00	\N		\N		\N			\N	2025-01-21 22:01:51.24978+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "114711702543049943448", "name": "Sam Data", "email": "the.samedata@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKmWt7wC2ZU_a237L4p7eZMH03Klit5R7X0oPMdiMxjF9iOhXw=s96-c", "full_name": "Sam Data", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKmWt7wC2ZU_a237L4p7eZMH03Klit5R7X0oPMdiMxjF9iOhXw=s96-c", "provider_id": "114711702543049943448", "email_verified": true, "phone_verified": false}	\N	2025-01-21 21:49:22.533924+00	2025-01-21 22:01:51.251497+00	\N	\N			\N		0	\N		\N	f	\N	f	{}	{}
00000000-0000-0000-0000-000000000000	608933cb-43c1-40e7-ab5b-168ddc332884	authenticated	authenticated	liyuanying22501@gmail.com	\N	2025-01-21 21:41:57.130292+00	\N		\N		\N			\N	2025-04-17 08:51:46.162978+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "110646003110127543865", "name": "xingxing li", "email": "liyuanying22501@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKmp3bGHXfb3Y9CE3u4dG2uzKFR1pVLvtLPg9Wg6YK6MFoIGbU=s96-c", "full_name": "xingxing li", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKmp3bGHXfb3Y9CE3u4dG2uzKFR1pVLvtLPg9Wg6YK6MFoIGbU=s96-c", "provider_id": "110646003110127543865", "email_verified": true, "phone_verified": false}	\N	2025-01-21 21:41:57.114027+00	2025-05-07 13:28:19.352436+00	\N	\N			\N		0	\N		\N	f	\N	f	{}	{}
00000000-0000-0000-0000-000000000000	666c367b-78af-4751-8900-3bb58de194c2	authenticated	authenticated	yuanying.li@alephium.org	\N	2025-01-14 15:28:27.430874+00	\N		\N		\N			\N	2025-05-16 08:16:11.006451+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "114460818463842497898", "name": "Yuanying Li", "email": "yuanying.li@alephium.org", "picture": "https://lh3.googleusercontent.com/a/ACg8ocIpOQOWTHWo3_vU2XdGYILx2iYFZ44LuQVxXqjHmtYa-bDlqQ=s96-c", "full_name": "Yuanying Li", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocIpOQOWTHWo3_vU2XdGYILx2iYFZ44LuQVxXqjHmtYa-bDlqQ=s96-c", "provider_id": "114460818463842497898", "custom_claims": {"hd": "alephium.org"}, "email_verified": true, "phone_verified": false}	\N	2025-01-14 15:28:27.414343+00	2025-05-18 16:13:16.413331+00	\N	\N			\N		0	\N		\N	f	\N	f	{}	{}
00000000-0000-0000-0000-000000000000	e10b017b-8690-4346-91e8-8cd5e590cb77	authenticated	authenticated	liyuanying225@gmail.com	\N	2025-01-09 13:45:02.303622+00	\N		\N		\N			\N	2025-05-16 08:15:06.140772+00	{"provider": "github", "providers": ["github", "google"]}	{"iss": "https://accounts.google.com", "sub": "113493635279017919558", "name": "YY Li", "email": "liyuanying225@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKsq7K5Kcz_JhqYoJJ1-1Zt7ewI69-G7QXrfhQ4VwM4h-giyBmi=s96-c", "full_name": "YY Li", "user_name": "YYBer", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKsq7K5Kcz_JhqYoJJ1-1Zt7ewI69-G7QXrfhQ4VwM4h-giyBmi=s96-c", "provider_id": "113493635279017919558", "email_verified": true, "phone_verified": false, "preferred_username": "YYBer"}	\N	2025-01-09 13:45:02.29537+00	2025-05-16 08:15:06.14326+00	\N	\N			\N		0	\N		\N	f	\N	f	{}	{}
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY pgsodium.key (id, status, created, expires, key_type, key_id, key_context, name, associated_data, raw_key, raw_key_nonce, parent_key, comment, user_data) FROM stdin;
\.


--
-- Data for Name: bounties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bounties (id, sponsor_id, title, description, category, status, requirements, reward, submission_guidelines, max_submissions, current_submissions, start_date, end_date, review_timeframe, difficulty_level, estimated_hours, tags, is_featured, created_at, updated_at) FROM stdin;
3cbb8baf-2e60-4618-b52e-8e8c8c2f8f38	f34c6e2d-a076-4611-b52e-835d5bab469d	bounty6-update	bounty6 des update	design	completed	okkkkkk	{"token": "USDC", "amount": 200000, "usd_equivalent": 200000}		10	5	2025-02-28 00:00:00+00	2025-04-24 00:00:00+00	7	intermediate	0	{}	f	2025-02-27 14:23:22.640222+00	2025-03-24 10:32:22.008723+00
de9b4461-d864-443f-8fc8-983acfc12839	f34c6e2d-a076-4611-b52e-835d5bab469d	bounty7	bounty7 des	content	open	bounty7 requirement	{"token": "ALPH", "amount": 2000, "usd_equivalent": 2000}		10	0	2025-04-17 00:00:00+00	2025-06-30 00:00:00+00	7	beginner	0	{}	f	2025-04-17 08:50:01.211395+00	2025-04-17 08:50:01.211395+00
65fbf80b-d6ad-4b60-b342-2fb0a356a2ff	f60aa270-09fe-4664-b203-0b72778b7a80	yaya1	yaya1 des	other	open	yaya1 req	{"token": "ALPH", "amount": 500, "usd_equivalent": 500}		10	2	2025-04-02 00:00:00+00	2025-05-28 00:00:00+00	7	intermediate	0	{}	f	2025-04-17 09:45:17.837671+00	2025-04-22 10:18:22.220691+00
749ee980-87db-4ac5-8dfb-bbc5b6aec3a6	f34c6e2d-a076-4611-b52e-835d5bab469d	bounty3	bounty3 description	development	completed	{}	{"token": "USDC", "amount": 1000, "usd_equivalent": 1000}		10	0	2025-02-27 13:23:02.148+00	2025-05-06 00:00:00+00	7	beginner	20	{}	f	2025-02-27 13:23:02.261081+00	2025-03-11 13:23:42.875881+00
44d4df2b-1938-4442-86b9-4b499875854b	f34c6e2d-a076-4611-b52e-835d5bab469d	bounty5	bounty5 des	design	completed	bounty5 req	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}		10	4	2025-02-05 00:00:00+00	2025-04-28 00:00:00+00	7	intermediate	0	{}	f	2025-02-27 14:13:49.599471+00	2025-05-06 09:28:31.776614+00
b784ca93-4fb7-435a-b5ab-f832f199a19d	f34c6e2d-a076-4611-b52e-835d5bab469d	bounty 9	bounty 9 des	development	completed	bounty 9 re	{"token": "USDC", "amount": 200, "usd_equivalent": 200}		10	0	2025-04-01 00:00:00+00	2025-05-08 00:00:00+00	7	beginner	0	{}	f	2025-04-22 09:37:25.249371+00	2025-05-15 09:08:35.417173+00
e45e2a6d-d300-4620-917d-e4e9d23b2701	f34c6e2d-a076-4611-b52e-835d5bab469d	bounty4	bounty4 description	content	completed	{}	{"token": "ALPH", "amount": 500, "usd_equivalent": 500}		10	1	2025-02-07 00:00:00+00	2025-05-08 00:00:00+00	7	beginner	10	{}	f	2025-02-27 13:41:37.55211+00	2025-05-15 09:08:35.423251+00
05c41d1f-4987-4448-917e-c762c596dd1e	f34c6e2d-a076-4611-b52e-835d5bab469d	b10 test	b10 test des	design	open	no requirements	{"token": "ALPH", "amount": 1000, "usd_equivalent": 1000}		10	5	2025-05-01 00:00:00+00	2025-06-25 00:00:00+00	7	beginner	0	{}	f	2025-05-06 14:02:13.658313+00	2025-05-15 13:55:16.474499+00
1716214a-d076-40d1-bf7f-8f5e3a1dbe1b	f34c6e2d-a076-4611-b52e-835d5bab469d	bounty8	bounty8 des	content	completed	bounty8 req	{"token": "ALPH", "amount": 500, "usd_equivalent": 500}		10	3	2025-04-01 00:00:00+00	2025-04-29 00:00:00+00	7	intermediate	0	{}	f	2025-04-17 09:47:30.334982+00	2025-05-15 13:55:18.962863+00
61492445-dd68-43ba-8005-317699540855	f34c6e2d-a076-4611-b52e-835d5bab469d	bounty1	bounty1	content	completed	{}	{"token": "ALPH", "amount": 5, "usd_equivalent": 5}		10	9	2025-02-27 13:08:43.916+00	2025-04-16 00:00:00+00	7	beginner	0	{}	f	2025-02-27 13:08:44.065511+00	2025-05-15 13:55:22.420962+00
716e2935-c8d4-4386-be86-65e59a868f39	f34c6e2d-a076-4611-b52e-835d5bab469d	bounty2	bounty2	other	completed	{}	{"token": "USDC", "amount": 100, "usd_equivalent": 100}		10	2	2025-02-12 00:00:00+00	2025-05-11 00:00:00+00	7	advanced	0	{}	f	2025-02-27 13:10:59.078842+00	2025-05-15 13:55:24.228415+00
\.


--
-- Data for Name: bounty_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bounty_comments (id, bounty_id, user_id, content, created_at, updated_at) FROM stdin;
4d0867c3-d533-4d82-b772-dbc2b3d92833	3cbb8baf-2e60-4618-b52e-8e8c8c2f8f38	666c367b-78af-4751-8900-3bb58de194c2	1111	2025-03-06 13:40:51.464724+00	2025-03-06 13:40:51.464724+00
25796802-fd8d-434c-9bd4-982066df2d80	44d4df2b-1938-4442-86b9-4b499875854b	e10b017b-8690-4346-91e8-8cd5e590cb77	bb	2025-03-11 13:46:21.408317+00	2025-03-11 13:46:21.408317+00
95083bfa-556f-4bfd-8518-d671186854be	3cbb8baf-2e60-4618-b52e-8e8c8c2f8f38	666c367b-78af-4751-8900-3bb58de194c2	aabb	2025-03-12 10:47:42.318266+00	2025-03-12 10:47:48.521614+00
2d574889-5dde-44cd-9851-f878a21c4b7e	3cbb8baf-2e60-4618-b52e-8e8c8c2f8f38	e10b017b-8690-4346-91e8-8cd5e590cb77	submitted!	2025-03-24 10:31:23.906079+00	2025-03-24 10:31:23.906079+00
a893aefa-cc01-44ed-a1ae-479e3a524058	e45e2a6d-d300-4620-917d-e4e9d23b2701	e10b017b-8690-4346-91e8-8cd5e590cb77	aa	2025-03-28 15:45:41.952217+00	2025-03-28 15:45:41.952217+00
1670024d-eb40-4492-95e1-62402ffbc4b8	e45e2a6d-d300-4620-917d-e4e9d23b2701	e10b017b-8690-4346-91e8-8cd5e590cb77	bb	2025-03-28 15:45:46.567532+00	2025-03-28 15:45:46.567532+00
f31f255d-12ee-40b8-a0da-972d78f4fcdd	44d4df2b-1938-4442-86b9-4b499875854b	e10b017b-8690-4346-91e8-8cd5e590cb77	hh	2025-03-31 09:32:53.674495+00	2025-03-31 09:32:53.674495+00
41ed32bd-935b-4609-bd53-6e7684a70c39	44d4df2b-1938-4442-86b9-4b499875854b	e10b017b-8690-4346-91e8-8cd5e590cb77	dd	2025-03-31 09:32:57.235771+00	2025-03-31 09:32:57.235771+00
b87fce45-a1a3-4403-b4a5-d1be021bd0c3	1716214a-d076-40d1-bf7f-8f5e3a1dbe1b	e10b017b-8690-4346-91e8-8cd5e590cb77	add me!	2025-04-17 14:47:33.138486+00	2025-04-17 14:47:33.138486+00
c511bb22-0edd-4879-96fb-f297d81a0121	1716214a-d076-40d1-bf7f-8f5e3a1dbe1b	608933cb-43c1-40e7-ab5b-168ddc332884	aaa	2025-04-19 15:00:37.630364+00	2025-04-19 15:00:37.630364+00
d12188bd-31e4-474c-90b2-e6895d2bc166	65fbf80b-d6ad-4b60-b342-2fb0a356a2ff	608933cb-43c1-40e7-ab5b-168ddc332884	hey!	2025-04-22 10:18:35.15042+00	2025-04-22 10:18:35.15042+00
7b22ded7-969a-45b9-912d-ee54263fc4a7	b784ca93-4fb7-435a-b5ab-f832f199a19d	e10b017b-8690-4346-91e8-8cd5e590cb77	aa	2025-04-23 12:34:14.664566+00	2025-04-23 12:34:14.664566+00
924e6f47-9d3c-421b-bc44-c32dc2cc4b9f	b784ca93-4fb7-435a-b5ab-f832f199a19d	e10b017b-8690-4346-91e8-8cd5e590cb77	bb	2025-05-06 09:30:43.339282+00	2025-05-06 09:30:43.339282+00
f9b1277c-05c6-4968-9dde-9466d2d7b0f5	05c41d1f-4987-4448-917e-c762c596dd1e	e10b017b-8690-4346-91e8-8cd5e590cb77	cc	2025-05-06 16:09:47.012657+00	2025-05-06 16:09:47.012657+00
b2357ba9-259b-442f-884f-b29215bcf730	716e2935-c8d4-4386-be86-65e59a868f39	e10b017b-8690-4346-91e8-8cd5e590cb77	aa	2025-05-15 14:08:56.742302+00	2025-05-15 14:08:56.742302+00
\.


--
-- Data for Name: bounty_submissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bounty_submissions (id, bounty_id, bounty_name, sponsor_id, sponsor_name, sponsor_logo_url, user_id, title, description, submission_url, tweet_url, status, feedback, review_started_at, completed_at, reward, created_at, updated_at, user_username, user_avatar_url, user_full_name, user_wallet_address, transaction_hash) FROM stdin;
d8fb19f9-ee5e-4d2b-b350-85fbc1c7c356	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5cc 	b5cc des	https://github.com/YYBer?tab=overview&from=2025-03-01&to=2025-03-28?t=1743181366065	https://github.com/YYBer?tab=overview&from=2025-03-01&to=2025-03-28ccc	submitted	\N	\N	\N	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-28 17:02:46.195789+00	2025-03-28 17:02:46.195789+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
e5ad01dd-ec8a-4fa9-ab3f-2102a519b3b1	e45e2a6d-d300-4620-917d-e4e9d23b2701	bounty4	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b4bb	b4bb des	https://www.google.com/search?t=1743176515784	https://www.google.com/searchbbb	submitted	\N	\N	\N	{"token": "ALPH", "amount": 500, "usd_equivalent": 500}	2025-03-28 15:41:56.24872+00	2025-03-28 15:41:56.24872+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
9a8f5814-777f-477d-953f-cfef5de67d66	e45e2a6d-d300-4620-917d-e4e9d23b2701	bounty4	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b4aa	b4aa des	https://www.google.com/search?q=supabase&oq=supabase&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8Mg0IAhAuGMcBGNEDGIAEMgYIAxAjGCcyBggEECMYJzIGCAUQRRg8MgYIBhBFGDwyBggHEEUYQdIBCDE2MTdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8?t=1743172681639	https://www.google.com/search?q=supabase&oq=supabase&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8Mg0IAhAuGMcBGNEDGIAEMgYIAxAjGCcyBggEECMYJzIGCAUQRRg8MgYIBhBFGDwyBggHEEUYQdIBCDE2MTdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8aaa	submitted	\N	\N	\N	{"token": "ALPH", "amount": 500, "usd_equivalent": 500}	2025-03-28 14:38:01.86366+00	2025-03-28 14:38:01.86366+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg\n	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
b3e1e2d2-7f36-4f82-9a76-09fb499f6c59	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5 pp	b5 pp des	https://github.com/YYBer?tab=repositories?t=1743413681067	https://github.com/YYBer?tab=repositoriesppp	accepted	\N	2025-03-31 15:46:06.877+00	2025-03-31 15:46:06.877+00	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-31 09:34:41.245487+00	2025-03-31 09:34:41.245487+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	0xdfsddgwrsg3tt6fv6dd4edd6schzmi3
787c29a3-5c56-4ff6-b9e0-672580c29ecf	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5ll	b5lll des	https://github.com/YYBer?tab=repositories?t=1743413554079	https://github.com/YYBer?tab=repositorieslllll	rejected	\N	2025-03-31 15:50:42.493+00	2025-03-31 15:50:42.493+00	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-31 09:32:34.328407+00	2025-03-31 09:32:34.328407+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg\n	Alice Simon\n	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
e5ce3014-0799-435a-b078-04d2173db32e	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5gg	b5gggg des	https://github.com/YYBer?tab=repositories?t=1743410765692	https://github.com/YYBer?tab=repositoriesgggg	accepted	\N	2025-04-16 12:17:37.191+00	2025-04-16 12:17:37.191+00	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-31 08:46:05.794067+00	2025-03-31 08:46:05.794067+00	photo1		Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
da5c6c60-62cc-412b-acd6-4cb21161405b	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5ee	b5ee des	https://github.com/YYBer?tab=repositories?t=1743410307226	https://github.com/YYBer?tab=repositoriesaaa	submitted	\N	\N	\N	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-31 08:38:27.323198+00	2025-03-31 08:38:27.323198+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
a0b6607f-651f-4b40-b7f9-0b1f21ab5088	65fbf80b-d6ad-4b60-b342-2fb0a356a2ff	yaya1	f60aa270-09fe-4664-b203-0b72778b7a80	org1	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1744623416232.png	e10b017b-8690-4346-91e8-8cd5e590cb77	yanswer1	yanswer1 des	https://x.com/0xJaleel_eth/status/1912271113553650090?t=1744899597576	https://x.com/0xJaleel_eth/status/1912271113553650090	accepted	good job!	2025-04-17 14:21:29.261+00	2025-04-17 14:21:29.262+00	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-04-17 14:19:57.771957+00	2025-04-17 14:19:57.771957+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
22f00f75-4a62-4add-a44f-76ee72268ea0	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5dd	b5dd des	https://github.com/YYBer/Contribium/blob/main/src/supabase/index.ts?t=1743181984241	https://github.com/YYBer/Contribium/blob/main/src/supabase/index.tsdddd	submitted	\N	\N	\N	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-28 17:13:04.323725+00	2025-03-28 17:13:04.323725+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
4216125f-ea7a-44d0-9fbd-6ec8d7e1b93e	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5ll	b5lll des	https://github.com/YYBer?tab=repositories?t=1743411343807	https://github.com/YYBer?tab=repositorieslll	accepted	\N	2025-03-31 15:50:47.892+00	2025-03-31 15:50:47.892+00	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-31 08:55:43.925859+00	2025-03-31 08:55:43.925859+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
98d3811f-6c32-49d8-a222-022c9723b746	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5hh	b5hhhh	https://github.com/YYBer?tab=repositories?t=1743410593702	https://github.com/YYBer?tab=repositorieshhh	submitted	\N	\N	\N	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-31 08:43:13.878541+00	2025-03-31 08:43:13.878541+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg\n	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
9ad6e539-58b0-44fc-ba91-b068d7d8dd12	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5ff	b5ff	https://github.com/YYBer?tab=repositories?t=1743410362441	https://github.com/YYBer?tab=repositoriesffff	submitted	\N	\N	\N	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-31 08:39:22.595349+00	2025-03-31 08:39:22.595349+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg\n	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
b226be18-4a22-4344-a8b0-1add5f0b3dfc	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5dd	b5dd des	https://github.com/YYBer?tab=repositories?t=1743409887968	https://github.com/YYBer?tab=repositoriesaaaa	submitted	\N	\N	\N	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-31 08:31:28.181589+00	2025-03-31 08:31:28.181589+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	\N
5135fd6a-e467-4c17-b596-d1194af78ebe	44d4df2b-1938-4442-86b9-4b499875854b	bounty5	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0	\N	e10b017b-8690-4346-91e8-8cd5e590cb77	b5qq	b5qq des	https://github.com/YYBer?tab=repositories?t=1743435706183	https://github.com/YYBer?tab=repositoriesqqqqq	accepted	pass	2025-03-31 15:45:50.888+00	2025-03-31 15:45:50.889+00	{"token": "ALPH", "amount": 300, "usd_equivalent": 300}	2025-03-31 15:41:46.287752+00	2025-03-31 15:41:46.287752+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	Alice Simon	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	0xdfsddgwrsg3tt6fv6dd4edd6schzmi3
bbc17eeb-8e1c-4a7f-85d2-69c92fd23077	1716214a-d076-40d1-bf7f-8f5e3a1dbe1b	bounty8	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b8 title	b8 des	https://github.com/AlephiumFoundation?t=1745314525175	https://github.com/AlephiumFoundation	submitted	\N	\N	\N	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-04-22 09:35:25.453328+00	2025-04-22 09:35:25.453328+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
870ccb22-4c76-417c-88e9-d244a3203342	1716214a-d076-40d1-bf7f-8f5e3a1dbe1b	bounty8	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		608933cb-43c1-40e7-ab5b-168ddc332884	reply8-2	reply8-2 des	https://alephium.org/?t=1744900935875	https://alephium.org/	accepted	good job!!!!	2025-04-17 14:42:59.926+00	2025-04-17 14:42:59.926+00	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-04-17 14:42:16.104001+00	2025-04-17 14:42:16.104001+00	xingxing	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1744623416232.png	xingxing li	0xdfsddgwrsg3tt6fv6dd4edd6schzmi3	0xdfsddgwrsg3tt6fv6dd4edd6schzmi3
fa15403f-69b4-4d8d-8be4-1942ed56f60d	1716214a-d076-40d1-bf7f-8f5e3a1dbe1b	bounty8	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	reply8	reply8 des	https://github.com/patrickloeber/workshop-build-with-gemini/blob/main/notebooks/part-1-text-prompting.ipynb?t=1744901279423	https://github.com/patrickloeber/workshop-build-with-gemini/blob/main/notebooks/part-1-text-prompting.ipynb	accepted	\N	2025-04-17 14:48:47.69+00	2025-04-17 14:48:47.69+00	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-04-17 14:47:59.603363+00	2025-04-17 14:47:59.603363+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp
e20170ae-09f4-470e-baf5-516471659f65	65fbf80b-d6ad-4b60-b342-2fb0a356a2ff	yaya1	f60aa270-09fe-4664-b203-0b72778b7a80	org1	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1744623416232.png	e10b017b-8690-4346-91e8-8cd5e590cb77	yaya2	yaya2des	https://github.com/AlephiumFoundation?t=1745316940812	https://github.com/AlephiumFoundation	submitted	\N	\N	\N	{"token": "ALPH", "amount": 0, "usd_equivalent": 0}	2025-04-22 10:15:40.977+00	2025-04-22 10:15:40.977+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
e52c49da-d834-4aae-b517-3766d9e04c5e	1716214a-d076-40d1-bf7f-8f5e3a1dbe1b	bounty8	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		608933cb-43c1-40e7-ab5b-168ddc332884	bounty8-re	bounty8-re des	https://x.com/?t=1745074766850	https://x.com/	accepted	\N	2025-04-19 15:03:37.171+00	2025-04-19 15:03:37.171+00	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-04-19 14:59:27.073542+00	2025-04-19 14:59:27.073542+00	xingxing	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1744623416232.png	xingxing li	0xdfsddgwrsg3tt6fv6dd4edd6schzmi3	0xdfsddgwrsg3tt6fv6dd4edd6schzmi3
afb10a8d-7496-4cb4-82fd-c225a6a445e6	65fbf80b-d6ad-4b60-b342-2fb0a356a2ff	yaya1	f60aa270-09fe-4664-b203-0b72778b7a80	org1	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1744623416232.png	e10b017b-8690-4346-91e8-8cd5e590cb77	yaya3	yaya3 des	https://github.com/AlephiumFoundation?t=1745317555304	https://github.com/AlephiumFoundation	submitted	\N	\N	\N	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-04-22 10:25:55.517044+00	2025-04-22 10:25:55.517044+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
8534f361-55d0-4ff0-9b7c-60068f2c8f0d	65fbf80b-d6ad-4b60-b342-2fb0a356a2ff	yaya1	f60aa270-09fe-4664-b203-0b72778b7a80	org1	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1744623416232.png	e10b017b-8690-4346-91e8-8cd5e590cb77	yaya4	yaya4 des	https://github.com/AlephiumFoundation?t=1745317817848	https://github.com/AlephiumFoundation	submitted	\N	\N	\N	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-04-22 10:30:18.093192+00	2025-04-22 10:30:18.093192+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
f4422a9f-6a1d-4860-8362-842f20b1c86c	1716214a-d076-40d1-bf7f-8f5e3a1dbe1b	bounty8	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	bou8-re	bou8-re des	https://www.google.com/search?q=react+toast+%E6%89%BE%E4%B8%8D%E5%88%B0&sca_esv=7b702b328b277ae5&sxsrf=AHTn8zpzoA4TAJAQ2IGO_PdP30q7FNnLoQ%3A1745075885557&ei=rb4DaJjiIeCA9u8P9JWPyQM&ved=0ahUKEwjY7I6isuSMAxVggP0HHfTKIzkQ4dUDCBA&uact=5&oq=react+toast+%E6%89%BE%E4%B8%8D%E5%88%B0&gs_lp=Egxnd3Mtd2l6LXNlcnAiFXJlYWN0IHRvYXN0IOaJvuS4jeWIsDIIECEYoAEYwwRI3R5QmQpYjxtwAngAkAEAmAF1oAHeBaoBAzIuNbgBA8gBAPgBAZgCCaACgwbCAgsQABiABBiwAxiiBMICCBAAGLADGO8FwgIHECMYsAIYJ8ICCBAAGIAEGKIEwgIFEAAY7wXCAgwQIRigARjDBBgKGCrCAgoQIRigARjDBBgKmAMAiAYBkAYFkgcDNC41oAeeFrIHAzIuNbgH-AU&sclient=gws-wiz-serp?t=1745076013086	\N	accepted	\N	2025-04-23 12:36:59.129+00	2025-04-23 12:36:59.129+00	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-04-19 15:20:13.401585+00	2025-04-19 15:20:13.401585+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
465f0987-99e3-414f-bde0-4f5a36cce5aa	b784ca93-4fb7-435a-b5ab-f832f199a19d	bounty 9	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b9 aa	b9 aa des	http://localhost:5173/bounty/b784ca93-4fb7-435a-b5ab-f832f199a19d?t=1746524408871	http://localhost:5173/bounty/b784ca93-4fb7-435a-b5ab-f832f199a19d	rejected	\N	2025-05-06 14:45:44.172+00	2025-05-06 14:45:44.172+00	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-05-06 09:40:09.005103+00	2025-05-06 09:40:09.005103+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
02ae4e9c-19f3-4f2e-baac-8abe5c003f73	b784ca93-4fb7-435a-b5ab-f832f199a19d	bounty 9	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b9 title	b9 des	http://localhost:5173/bounty/b784ca93-4fb7-435a-b5ab-f832f199a19d?t=1746523863826	\N	rejected	\N	2025-05-06 14:57:45.689+00	2025-05-06 14:57:45.689+00	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-05-06 09:31:03.988656+00	2025-05-06 09:31:03.988656+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
5f67367a-01a6-4ba0-98c5-7b6e162adf97	b784ca93-4fb7-435a-b5ab-f832f199a19d	bounty 9	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b9	b9 des	https://www.figma.com/design/kUC14PZttuSJmYWyFG0gyi/Contribium?node-id=0-1&p=f&t=dfecXJbHjCqjZ1ib-0?t=1745411677620	https://www.figma.com/design/kUC14PZttuSJmYWyFG0gyi/Contribium?node-id=0-1&p=f&t=dfecXJbHjCqjZ1ib-0	accepted	super cool! love it!	2025-05-06 15:22:27.037+00	2025-05-06 15:22:27.037+00	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-04-23 12:34:37.814615+00	2025-04-23 12:34:37.814615+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
6c4d3b72-1ada-49c1-81d5-de4883285683	1716214a-d076-40d1-bf7f-8f5e3a1dbe1b	bounty8	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b8 bb	b8 bb des	https://github.com/AlephiumFoundation?t=1745316044997	https://github.com/AlephiumFoundation	rejected	not good	2025-05-06 15:25:51.844+00	2025-05-06 15:25:51.844+00	{"token": "ALPH", "amount": 0, "usd_equivalent": 0}	2025-04-22 10:00:45.127+00	2025-04-22 10:00:45.128+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
5000f2bc-70fa-4ea1-ac17-7bc46b6c606a	b784ca93-4fb7-435a-b5ab-f832f199a19d	bounty 9	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b9 bb	b9 bb des	http://localhost:5173/bounty/b784ca93-4fb7-435a-b5ab-f832f199a19d?t=1746524740118	http://localhost:5173/bounty/b784ca93-4fb7-435a-b5ab-f832f199a19d	accepted	super good	2025-05-06 14:17:56.601+00	2025-05-06 14:17:56.601+00	{"token": "", "amount": 40000, "usd_equivalent": 40000}	2025-05-06 09:45:40.462359+00	2025-05-06 09:45:40.462359+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp
6955d5e5-70f9-4295-8c7f-846b970dfb4a	05c41d1f-4987-4448-917e-c762c596dd1e	b10 test	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b10 title	b10 test	http://localhost:5173/bounty/05c41d1f-4987-4448-917e-c762c596dd1e?t=1746547801212	\N	accepted	goood!	2025-05-06 17:51:07.799+00	2025-05-06 17:51:07.799+00	{"token": "", "amount": 40, "usd_equivalent": 40}	2025-05-06 16:10:01.545754+00	2025-05-06 16:10:01.545754+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp
b03de168-76e2-4dfb-b3f8-1f757717f794	e45e2a6d-d300-4620-917d-e4e9d23b2701	bounty4	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b4 title	b4 des	http://localhost:5173/bounty/e45e2a6d-d300-4620-917d-e4e9d23b2701?t=1746554312605	\N	submitted	\N	\N	\N	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-05-06 17:58:32.712412+00	2025-05-06 17:58:32.712412+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
2cc343df-c3b4-4618-bd9f-bb3efa62264a	05c41d1f-4987-4448-917e-c762c596dd1e	b10 test	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b10 title -2	b10 title -2	http://localhost:5173/bounty/05c41d1f-4987-4448-917e-c762c596dd1e?t=1747296696790	http://localhost:5173/bounty/05c41d1f-4987-4448-917e-c762c596dd1e	accepted	\N	2025-05-15 13:33:18.487+00	2025-05-15 13:33:18.488+00	{"token": "ALPH", "amount": 30, "usd_equivalent": 30}	2025-05-15 08:11:36.887256+00	2025-05-15 08:11:36.887256+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp
83222419-1cd3-4da6-9348-71cc2a423c9e	05c41d1f-4987-4448-917e-c762c596dd1e	b10 test	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b10 title -2	b10 title -2	http://localhost:5173/bounty/05c41d1f-4987-4448-917e-c762c596dd1e?t=1747296723550	http://localhost:5173/bounty/05c41d1f-4987-4448-917e-c762c596dd1e	accepted	good	2025-05-15 09:20:37.471+00	2025-05-15 09:20:37.471+00	{"token": "ALPH", "amount": 30, "usd_equivalent": 30}	2025-05-15 08:12:03.621355+00	2025-05-15 08:12:03.621355+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp
773563ac-398c-48e8-89d7-a7c7512e6a6a	05c41d1f-4987-4448-917e-c762c596dd1e	b10 test	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	b10 -3	b10 -3 des	http://localhost:5173/bounty/05c41d1f-4987-4448-917e-c762c596dd1e?t=1747318193490	http://localhost:5173/bounty/05c41d1f-4987-4448-917e-c762c596dd1e	submitted	\N	\N	\N	{"token": "", "amount": 0, "usd_equivalent": 0}	2025-05-15 14:09:53.9647+00	2025-05-15 14:09:53.9647+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
fb1e2c7e-d92d-4bc2-9f69-a19642847fd2	b784ca93-4fb7-435a-b5ab-f832f199a19d	bounty 9	f34c6e2d-a076-4611-b52e-835d5bab469d	sponsor0		e10b017b-8690-4346-91e8-8cd5e590cb77	bounty9 test	bounty9 test des	http://localhost:5173/bounty/b784ca93-4fb7-435a-b5ab-f832f199a19d?t=1747382842427	http://localhost:5173/bounty/b784ca93-4fb7-435a-b5ab-f832f199a19d	accepted	\N	2025-05-16 08:14:40.966+00	2025-05-16 08:14:40.966+00	{"token": "ALPH", "amount": 40, "usd_equivalent": 40}	2025-05-16 08:07:22.931769+00	2025-05-16 08:07:22.931769+00	yy	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	YY Li	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp	NULL
\.


--
-- Data for Name: proof_of_work; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proof_of_work (id, user_id, title, description, category, skills, project_url, created_at, updated_at) FROM stdin;
a2b638c1-e7b2-448f-b4d0-22d451cd9fc2	666c367b-78af-4751-8900-3bb58de194c2	AA	BB	content	{copywriting}	https://test.com	2025-02-10 13:38:32.332102+00	2025-02-10 13:38:39.602321+00
9cd036c0-f05b-4e3c-b99f-1da4c611f30a	666c367b-78af-4751-8900-3bb58de194c2	CC	CC	design	{mysql}	https://oo.com	2025-02-10 13:43:32.22639+00	2025-02-10 13:43:45.61886+00
c50add2e-2182-4f6f-ad29-397c2f071927	e10b017b-8690-4346-91e8-8cd5e590cb77	test	test	blockchain	{nft}	https://test.com	2025-02-11 10:22:18.610872+00	2025-02-11 10:22:18.610872+00
f2a9b614-3bc1-4f2c-ae39-252d427c23c3	e10b017b-8690-4346-91e8-8cd5e590cb77	22	22	frontend	{nextjs}	https://test.com	2025-02-11 10:22:39.044327+00	2025-02-11 10:22:39.044327+00
3762ee45-e20c-4e34-b84f-f7874abd3ba1	e10b017b-8690-4346-91e8-8cd5e590cb77	44	44	frontend	{vue}	https://design_skills.com	2025-02-11 10:23:17.25237+00	2025-02-11 10:23:17.25237+00
\.


--
-- Data for Name: proof_of_work_skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proof_of_work_skills (proof_of_work_id, skill_id, created_at) FROM stdin;
\.


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skills (id, name, category, created_at, updated_at) FROM stdin;
227f0743-2179-433e-90bc-c433db9f5817	React	frontend	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
8943082e-1464-4f02-80ef-473ac269d178	Vue	frontend	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
98a08445-66e7-4833-92c3-cdeccb7b8f5a	Angular	frontend	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
cd387b66-5c19-4ad2-ac8d-37674239b9e8	TypeScript	frontend	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
de4d7781-1521-48df-a245-75fa549933f6	CSS	frontend	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
895337fc-7023-4b3c-97fb-ddd0b20f1a96	Node.js	backend	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
1a35d9c4-db4d-4d2f-bc4f-246b9ebd162e	Python	backend	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
dcf8f7b0-d36a-4b5d-9014-3e2b8a7729fb	Java	backend	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
a58ceca3-6b98-4e42-9d09-f807ced8eee5	Go	backend	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
8bbe7e29-f816-4d37-ba84-d5068dfef4fd	PostgreSQL	backend	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
7c3241b2-e826-42ed-abcd-812e8646530e	Solidity	blockchain	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
06f94e9b-211d-4613-a2e2-22fb1966c255	Rust	blockchain	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
a28180ca-49d9-4fac-970f-051aa8a000b8	Web3.js	blockchain	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
cc743abb-33ea-4514-91d1-9ee3bfcb10bc	Ethereum	blockchain	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
09453a83-2a13-4adc-aa73-4f7580681ad1	Smart Contracts	blockchain	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
f74bb2e9-6499-4dee-b091-ecf15148a485	UI Design	design	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
da431382-677d-46a6-ab86-0eb0546d194f	UX Design	design	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
49443925-88e8-4d2d-b0aa-31e82222e08f	Figma	design	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
1da48d1c-58d3-494c-aaad-5828e3560735	Adobe XD	design	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
3e4f083e-7c0f-411a-9204-f59ac8c868ae	Graphic Design	design	2025-01-09 15:41:56.232596+00	2025-01-09 15:41:56.232596+00
\.


--
-- Data for Name: sponsors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sponsors (id, user_id, name, description, logo_url, website_url, twitter_handle, github_handle, discord_url, is_verified, total_bounties_count, total_projects_count, total_reward_amount, created_at, updated_at) FROM stdin;
f60aa270-09fe-4664-b203-0b72778b7a80	608933cb-43c1-40e7-ab5b-168ddc332884	org1	org1 des	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1744623416232.png	https://alephium.org	@34dfdf	\N	\N	f	1	0	500.00	2025-04-16 14:58:31.689+00	2025-04-17 09:45:17.943517+00
f34c6e2d-a076-4611-b52e-835d5bab469d	666c367b-78af-4751-8900-3bb58de194c2	sponsor0	\N	\N	http://localhost:5173/sponsor	@sponsor0	\N	\N	t	10	0	5805.00	2025-02-27 09:55:10.053871+00	2025-05-06 14:02:13.747481+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, username, first_name, last_name, full_name, bio, avatar_url, wallet_address, github_url, twitter_url, linkedin_url, telegram_url, website_url, web3_interests, work_experience, location, current_employer, frontend_skills, backend_skills, blockchain_skills, created_at, updated_at, design_skills, content_skills) FROM stdin;
fd41e914-9d40-403f-99bf-bbb411cfabdb	sam135642@gmail.com	s	\N	\N	s am	\N	https://lh3.googleusercontent.com/a/ACg8ocL3lCSXaVdMEwI_5HvAEIjRLOR1HUmKnNdOzEvjQWCMZjU9hVJ5Rw=s96-c	\N	\N	\N	\N	\N	\N	{}	\N	\N	\N	{}	{}	{}	2025-01-21 21:48:34.87+00	2025-01-21 21:48:34.871+00	\N	\N
786bac5f-eac2-4660-bd50-2dbb243841a6	the.samedata@gmail.com	sam	\N	\N	Sam Data	\N	https://lh3.googleusercontent.com/a/ACg8ocKmWt7wC2ZU_a237L4p7eZMH03Klit5R7X0oPMdiMxjF9iOhXw=s96-c	\N	\N	\N	\N	\N	\N	{}	\N	\N	\N	{}	{}	{}	2025-01-21 21:49:23.817+00	2025-01-21 21:49:23.817+00	\N	\N
ebe4bda0-22a0-4848-a6f7-0deeb303e96a	the.samphotoo@gmail.com	photo1	\N	\N	photo Sam	\N	https://lh3.googleusercontent.com/a/ACg8ocKL8-4iZQSgrXccsOy1jLjJ9debYMXHV1mPcwnGI58LDPKV-t0C_g=s96-c	\N	\N	\N	\N	\N	\N	{}	\N	\N	\N	{}	{}	{}	2025-01-21 22:02:52.581+00	2025-01-21 22:02:52.581+00	\N	\N
666c367b-78af-4751-8900-3bb58de194c2	yuanying.li@alephium.org	yuanying	Yuanying	Li	Yuanying Li	\N	https://lh3.googleusercontent.com/a/ACg8ocIpOQOWTHWo3_vU2XdGYILx2iYFZ44LuQVxXqjHmtYa-bDlqQ=s96-c	\N	\N	\N	\N	\N	\N	{}	\N	\N	\N	{}	{}	{}	2025-02-21 14:32:09.087+00	2025-02-21 14:32:09.088+00	\N	\N
e10b017b-8690-4346-91e8-8cd5e590cb77	liyuanying225@gmail.com	yy	YY	Li	YY Li	hey	https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1741700173413.jpg	1BxHYtnJee9qdtpyFz2mNFpHu3RnQbPXJ9K53VA6ECtSp						{Infrastructure}	2-5	germany	Alephium	{}	{}	{}	2025-01-11 16:28:08.26+00	2025-03-11 13:36:14.304+00	{sketch,adobe_xd,figma}	{writing,copywriting,seo,editing,research}
608933cb-43c1-40e7-ab5b-168ddc332884	liyuanying22501@gmail.com	xingxing	xingxing	Li	xingxing li		https://wawxluhjdnqewiaexvvk.supabase.co/storage/v1/object/public/avatars/1744623416232.png	0xdfsddgwrsg3tt6fv6dd4edd6schzmi3						{}	0-2			{}	{}	{}	2025-01-21 21:41:58.415+00	2025-04-14 09:36:56.765+00	{}	{}
\.


--
-- Data for Name: messages_2025_05_15; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_05_15 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_05_16; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_05_16 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_05_17; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_05_17 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_05_18; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_05_18 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_05_19; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_05_19 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_05_20; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_05_20 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_05_21; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_05_21 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_05_22; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_05_22 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-01-02 15:03:58
20211116045059	2025-01-02 15:03:58
20211116050929	2025-01-02 15:03:58
20211116051442	2025-01-02 15:03:58
20211116212300	2025-01-02 15:03:59
20211116213355	2025-01-02 15:03:59
20211116213934	2025-01-02 15:03:59
20211116214523	2025-01-02 15:03:59
20211122062447	2025-01-02 15:03:59
20211124070109	2025-01-02 15:04:00
20211202204204	2025-01-02 15:04:00
20211202204605	2025-01-02 15:04:00
20211210212804	2025-01-02 15:04:01
20211228014915	2025-01-02 15:04:01
20220107221237	2025-01-02 15:04:01
20220228202821	2025-01-02 15:04:01
20220312004840	2025-01-02 15:04:01
20220603231003	2025-01-02 15:04:02
20220603232444	2025-01-02 15:04:02
20220615214548	2025-01-02 15:04:02
20220712093339	2025-01-02 15:04:02
20220908172859	2025-01-02 15:04:02
20220916233421	2025-01-02 15:04:03
20230119133233	2025-01-02 15:04:03
20230128025114	2025-01-02 15:04:03
20230128025212	2025-01-02 15:04:03
20230227211149	2025-01-02 15:04:03
20230228184745	2025-01-02 15:04:04
20230308225145	2025-01-02 15:04:04
20230328144023	2025-01-02 15:04:04
20231018144023	2025-01-02 15:04:04
20231204144023	2025-01-02 15:04:04
20231204144024	2025-01-02 15:04:05
20231204144025	2025-01-02 15:04:05
20240108234812	2025-01-02 15:04:05
20240109165339	2025-01-02 15:04:05
20240227174441	2025-01-02 15:04:05
20240311171622	2025-01-02 15:04:06
20240321100241	2025-01-02 15:04:06
20240401105812	2025-01-02 15:04:07
20240418121054	2025-01-02 15:04:07
20240523004032	2025-01-02 15:04:08
20240618124746	2025-01-02 15:04:08
20240801235015	2025-01-02 15:04:08
20240805133720	2025-01-02 15:04:08
20240827160934	2025-01-02 15:04:08
20240919163303	2025-01-02 15:04:08
20240919163305	2025-01-02 15:04:09
20241019105805	2025-01-02 15:04:09
20241030150047	2025-01-02 15:04:10
20241108114728	2025-01-02 15:04:10
20241121104152	2025-01-02 15:04:10
20241130184212	2025-01-02 15:04:10
20241220035512	2025-01-09 13:39:43
20241220123912	2025-01-09 13:39:43
20241224161212	2025-01-09 13:39:44
20250107150512	2025-01-09 13:39:44
20250110162412	2025-01-11 23:22:16
20250123174212	2025-02-05 09:27:46
20250128220012	2025-02-05 09:27:46
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
sponsor-logos	sponsor-logos	\N	2025-02-09 22:48:00.485918+00	2025-02-09 22:48:00.485918+00	f	f	\N	\N	\N
avatars	avatars	\N	2025-02-10 17:07:25.939309+00	2025-02-10 17:07:25.939309+00	t	f	\N	\N	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-01-02 15:00:00.518591
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-01-02 15:00:00.545078
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-01-02 15:00:00.556506
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-01-02 15:00:00.59924
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-01-02 15:00:00.652125
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-01-02 15:00:00.66799
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-01-02 15:00:00.680546
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-01-02 15:00:00.691936
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-01-02 15:00:00.705332
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-01-02 15:00:00.721002
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-01-02 15:00:00.736412
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-01-02 15:00:00.755788
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-01-02 15:00:00.77355
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-01-02 15:00:00.813317
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-01-02 15:00:00.828684
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-01-02 15:00:00.867179
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-01-02 15:00:00.886989
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-01-02 15:00:00.89857
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-01-02 15:00:00.916459
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-01-02 15:00:00.936793
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-01-02 15:00:00.950573
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-01-02 15:00:00.975496
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-01-02 15:00:01.018529
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-01-02 15:00:01.052327
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-01-02 15:00:01.069643
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-01-02 15:00:01.092819
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
6c60dfe2-6613-4db3-a663-3d2e2044284d	avatars	1739271184571.jpg	666c367b-78af-4751-8900-3bb58de194c2	2025-02-11 10:53:05.888407+00	2025-02-11 10:53:05.888407+00	2025-02-11 10:53:05.888407+00	{"eTag": "\\"375008f7465171aa4f41d29de64120b0\\"", "size": 667615, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-02-11T10:53:06.000Z", "contentLength": 667615, "httpStatusCode": 200}	650dc9d6-f900-445c-bb3f-8d6be172e3aa	666c367b-78af-4751-8900-3bb58de194c2	{}
8e96980d-c49b-44b4-9dce-970cc2cd7773	avatars	1739271211333.jpg	666c367b-78af-4751-8900-3bb58de194c2	2025-02-11 10:53:31.93105+00	2025-02-11 10:53:31.93105+00	2025-02-11 10:53:31.93105+00	{"eTag": "\\"6a550d54f25460854b6560126dfef2e8\\"", "size": 107203, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-02-11T10:53:32.000Z", "contentLength": 107203, "httpStatusCode": 200}	345a778b-32ba-464c-b8c4-42be77bd6c9e	666c367b-78af-4751-8900-3bb58de194c2	{}
959a8a01-f8f1-4810-b144-a9462d1211ad	avatars	1739271359931.jpg	666c367b-78af-4751-8900-3bb58de194c2	2025-02-11 10:56:00.488493+00	2025-02-11 10:56:00.488493+00	2025-02-11 10:56:00.488493+00	{"eTag": "\\"6a550d54f25460854b6560126dfef2e8\\"", "size": 107203, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-02-11T10:56:01.000Z", "contentLength": 107203, "httpStatusCode": 200}	83134855-2b12-4196-8e12-0b28ee4ca72e	666c367b-78af-4751-8900-3bb58de194c2	{}
eab64ea4-f1c2-467a-aee0-37ede87e51a9	avatars	1739271372269.jpg	666c367b-78af-4751-8900-3bb58de194c2	2025-02-11 10:56:13.61869+00	2025-02-11 10:56:13.61869+00	2025-02-11 10:56:13.61869+00	{"eTag": "\\"375008f7465171aa4f41d29de64120b0\\"", "size": 667615, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-02-11T10:56:14.000Z", "contentLength": 667615, "httpStatusCode": 200}	06c2e3e3-b4e1-4560-8c96-a24c15066902	666c367b-78af-4751-8900-3bb58de194c2	{}
942c0502-23e3-41fb-81c2-6625044ae63a	avatars	1741700173413.jpg	e10b017b-8690-4346-91e8-8cd5e590cb77	2025-03-11 13:36:14.66593+00	2025-03-11 13:36:14.66593+00	2025-03-11 13:36:14.66593+00	{"eTag": "\\"6a550d54f25460854b6560126dfef2e8\\"", "size": 107203, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-03-11T13:36:15.000Z", "contentLength": 107203, "httpStatusCode": 200}	a657598c-9abc-425c-9302-ea954eab2150	e10b017b-8690-4346-91e8-8cd5e590cb77	{}
9b5b4de5-63b9-459e-a87c-1b7cced60e41	avatars	1744623416232.png	608933cb-43c1-40e7-ab5b-168ddc332884	2025-04-14 09:36:56.627127+00	2025-04-14 09:36:56.627127+00	2025-04-14 09:36:56.627127+00	{"eTag": "\\"233e9d30463e7ecc1b8d436a5f390cd5\\"", "size": 46299, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-04-14T09:36:57.000Z", "contentLength": 46299, "httpStatusCode": 200}	0025bb26-2bf3-49ef-b129-878a0797d174	608933cb-43c1-40e7-ab5b-168ddc332884	{}
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 704, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: bounties bounties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounties
    ADD CONSTRAINT bounties_pkey PRIMARY KEY (id);


--
-- Name: bounty_comments bounty_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounty_comments
    ADD CONSTRAINT bounty_comments_pkey PRIMARY KEY (id);


--
-- Name: bounty_submissions bounty_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounty_submissions
    ADD CONSTRAINT bounty_submissions_pkey PRIMARY KEY (id);


--
-- Name: proof_of_work proof_of_work_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proof_of_work
    ADD CONSTRAINT proof_of_work_pkey PRIMARY KEY (id);


--
-- Name: proof_of_work_skills proof_of_work_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proof_of_work_skills
    ADD CONSTRAINT proof_of_work_skills_pkey PRIMARY KEY (proof_of_work_id, skill_id);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- Name: sponsors sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sponsors
    ADD CONSTRAINT sponsors_pkey PRIMARY KEY (id);


--
-- Name: skills unique_skill_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT unique_skill_name UNIQUE (name);


--
-- Name: sponsors unique_user_sponsor; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sponsors
    ADD CONSTRAINT unique_user_sponsor UNIQUE (user_id);


--
-- Name: users users_avatar_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_avatar_url_key UNIQUE (avatar_url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: users users_wallet_address_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_wallet_address_key UNIQUE (wallet_address);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_05_15 messages_2025_05_15_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_05_15
    ADD CONSTRAINT messages_2025_05_15_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_05_16 messages_2025_05_16_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_05_16
    ADD CONSTRAINT messages_2025_05_16_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_05_17 messages_2025_05_17_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_05_17
    ADD CONSTRAINT messages_2025_05_17_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_05_18 messages_2025_05_18_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_05_18
    ADD CONSTRAINT messages_2025_05_18_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_05_19 messages_2025_05_19_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_05_19
    ADD CONSTRAINT messages_2025_05_19_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_05_20 messages_2025_05_20_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_05_20
    ADD CONSTRAINT messages_2025_05_20_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_05_21 messages_2025_05_21_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_05_21
    ADD CONSTRAINT messages_2025_05_21_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2025_05_22 messages_2025_05_22_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_05_22
    ADD CONSTRAINT messages_2025_05_22_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: idx_bounties_sponsor_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bounties_sponsor_id ON public.bounties USING btree (sponsor_id);


--
-- Name: idx_bounty_comments_bounty_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bounty_comments_bounty_id ON public.bounty_comments USING btree (bounty_id);


--
-- Name: idx_bounty_comments_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bounty_comments_user_id ON public.bounty_comments USING btree (user_id);


--
-- Name: idx_bounty_submissions_bounty_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bounty_submissions_bounty_id ON public.bounty_submissions USING btree (bounty_id);


--
-- Name: idx_bounty_submissions_sponsor_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bounty_submissions_sponsor_id ON public.bounty_submissions USING btree (sponsor_id);


--
-- Name: idx_bounty_submissions_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bounty_submissions_status ON public.bounty_submissions USING btree (status);


--
-- Name: idx_bounty_submissions_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bounty_submissions_user_id ON public.bounty_submissions USING btree (user_id);


--
-- Name: idx_sponsors_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_sponsors_user_id ON public.sponsors USING btree (user_id);


--
-- Name: proof_of_work_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX proof_of_work_category_idx ON public.proof_of_work USING btree (category);


--
-- Name: proof_of_work_user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX proof_of_work_user_id_idx ON public.proof_of_work USING btree (user_id);


--
-- Name: skills_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX skills_category_idx ON public.skills USING btree (category);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: messages_2025_05_15_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_05_15_pkey;


--
-- Name: messages_2025_05_16_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_05_16_pkey;


--
-- Name: messages_2025_05_17_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_05_17_pkey;


--
-- Name: messages_2025_05_18_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_05_18_pkey;


--
-- Name: messages_2025_05_19_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_05_19_pkey;


--
-- Name: messages_2025_05_20_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_05_20_pkey;


--
-- Name: messages_2025_05_21_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_05_21_pkey;


--
-- Name: messages_2025_05_22_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_05_22_pkey;


--
-- Name: bounties update_bounties_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_bounties_updated_at BEFORE UPDATE ON public.bounties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: bounty_comments update_bounty_comments_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_bounty_comments_updated_at BEFORE UPDATE ON public.bounty_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: proof_of_work update_proof_of_work_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_proof_of_work_updated_at BEFORE UPDATE ON public.proof_of_work FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: skills update_skills_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: sponsors update_sponsors_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON public.sponsors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: bounties bounties_sponsor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounties
    ADD CONSTRAINT bounties_sponsor_id_fkey FOREIGN KEY (sponsor_id) REFERENCES public.sponsors(id);


--
-- Name: bounty_comments bounty_comments_bounty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounty_comments
    ADD CONSTRAINT bounty_comments_bounty_id_fkey FOREIGN KEY (bounty_id) REFERENCES public.bounties(id) ON DELETE CASCADE;


--
-- Name: bounty_comments bounty_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounty_comments
    ADD CONSTRAINT bounty_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: bounty_submissions bounty_submissions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounty_submissions
    ADD CONSTRAINT bounty_submissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: bounty_submissions bounty_submissions_user_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounty_submissions
    ADD CONSTRAINT bounty_submissions_user_username_fkey FOREIGN KEY (user_username) REFERENCES public.users(username);


--
-- Name: bounty_submissions bounty_submissions_user_wallet_address_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounty_submissions
    ADD CONSTRAINT bounty_submissions_user_wallet_address_fkey FOREIGN KEY (user_wallet_address) REFERENCES public.users(wallet_address);


--
-- Name: bounty_comments fk_bounty_comments_bounty; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounty_comments
    ADD CONSTRAINT fk_bounty_comments_bounty FOREIGN KEY (bounty_id) REFERENCES public.bounties(id);


--
-- Name: bounty_submissions fk_bounty_submissions_bounty; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounty_submissions
    ADD CONSTRAINT fk_bounty_submissions_bounty FOREIGN KEY (bounty_id) REFERENCES public.bounties(id) ON DELETE CASCADE;


--
-- Name: bounty_submissions fk_bounty_submissions_sponsor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bounty_submissions
    ADD CONSTRAINT fk_bounty_submissions_sponsor FOREIGN KEY (sponsor_id) REFERENCES public.sponsors(id) ON DELETE CASCADE;


--
-- Name: proof_of_work_skills proof_of_work_skills_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proof_of_work_skills
    ADD CONSTRAINT proof_of_work_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id) ON DELETE CASCADE;


--
-- Name: proof_of_work proof_of_work_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proof_of_work
    ADD CONSTRAINT proof_of_work_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sponsors sponsors_logo_url_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sponsors
    ADD CONSTRAINT sponsors_logo_url_fkey FOREIGN KEY (logo_url) REFERENCES public.users(avatar_url);


--
-- Name: sponsors sponsors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sponsors
    ADD CONSTRAINT sponsors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: sponsors Allow authenticated users to insert sponsors; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to insert sponsors" ON public.sponsors FOR INSERT TO authenticated WITH CHECK ((user_id = auth.uid()));


--
-- Name: bounty_submissions Allow authenticated users to insert submissions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to insert submissions" ON public.bounty_submissions FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- Name: sponsors Allow users to insert their own sponsor profiles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow users to insert their own sponsor profiles" ON public.sponsors FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- Name: sponsors Anyone can create sponsor profiles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can create sponsor profiles" ON public.sponsors FOR INSERT TO anon WITH CHECK (true);


--
-- Name: bounty_comments Anyone can read comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read comments" ON public.bounty_comments FOR SELECT USING (true);


--
-- Name: skills Anyone can view skills; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view skills" ON public.skills FOR SELECT TO authenticated USING (true);


--
-- Name: bounty_comments Authenticated users can insert their own comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can insert their own comments" ON public.bounty_comments FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: proof_of_work Enable delete for project owners; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable delete for project owners" ON public.proof_of_work FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: proof_of_work Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.proof_of_work FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: proof_of_work Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.proof_of_work FOR SELECT USING (true);


--
-- Name: sponsors Enable read access for all users to sponsor information; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users to sponsor information" ON public.sponsors FOR SELECT USING (true);


--
-- Name: proof_of_work Enable update for project owners; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for project owners" ON public.proof_of_work FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: bounty_comments Users can delete their own comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete their own comments" ON public.bounty_comments FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: bounty_comments Users can update their own comments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own comments" ON public.bounty_comments FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: bounties; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.bounties ENABLE ROW LEVEL SECURITY;

--
-- Name: bounties bounties_read_all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY bounties_read_all ON public.bounties FOR SELECT USING (true);


--
-- Name: bounties bounties_sponsor_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY bounties_sponsor_insert ON public.bounties FOR INSERT WITH CHECK ((sponsor_id IN ( SELECT sponsors.id
   FROM public.sponsors
  WHERE (sponsors.user_id = auth.uid()))));


--
-- Name: bounties bounties_sponsor_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY bounties_sponsor_update ON public.bounties FOR UPDATE USING ((sponsor_id IN ( SELECT sponsors.id
   FROM public.sponsors
  WHERE (sponsors.user_id = auth.uid()))));


--
-- Name: bounty_comments; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.bounty_comments ENABLE ROW LEVEL SECURITY;

--
-- Name: bounty_submissions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.bounty_submissions ENABLE ROW LEVEL SECURITY;

--
-- Name: bounty_submissions bounty_submissions_sponsor_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY bounty_submissions_sponsor_select ON public.bounty_submissions FOR SELECT USING ((sponsor_id IN ( SELECT sponsors.id
   FROM public.sponsors
  WHERE (sponsors.user_id = auth.uid()))));


--
-- Name: bounty_submissions bounty_submissions_sponsor_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY bounty_submissions_sponsor_update ON public.bounty_submissions FOR UPDATE USING ((sponsor_id IN ( SELECT sponsors.id
   FROM public.sponsors
  WHERE (sponsors.user_id = auth.uid()))));


--
-- Name: bounty_submissions bounty_submissions_user_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY bounty_submissions_user_access ON public.bounty_submissions FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: bounty_submissions bounty_submissions_user_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY bounty_submissions_user_insert ON public.bounty_submissions FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: bounty_submissions bounty_submissions_user_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY bounty_submissions_user_select ON public.bounty_submissions FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: proof_of_work; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.proof_of_work ENABLE ROW LEVEL SECURITY;

--
-- Name: proof_of_work_skills; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.proof_of_work_skills ENABLE ROW LEVEL SECURITY;

--
-- Name: skills; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

--
-- Name: sponsors; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

--
-- Name: sponsors sponsors_insert_own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY sponsors_insert_own ON public.sponsors FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: sponsors sponsors_owner_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY sponsors_owner_access ON public.sponsors FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: sponsors sponsors_read_all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY sponsors_read_all ON public.sponsors FOR SELECT USING (true);


--
-- Name: users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--
-- Name: users users_insert_self; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY users_insert_self ON public.users FOR INSERT WITH CHECK ((id = auth.uid()));


--
-- Name: users users_read_all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY users_read_all ON public.users FOR SELECT USING (true);


--
-- Name: users users_self_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY users_self_access ON public.users FOR UPDATE USING ((id = auth.uid()));


--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: objects Allow authenticated uploads to avatars; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow authenticated uploads to avatars" ON storage.objects FOR INSERT TO authenticated WITH CHECK (((bucket_id = 'public'::text) AND ((storage.foldername(name))[1] = 'avatars'::text)));


--
-- Name: objects Allow uploads to sponsor-logos; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow uploads to sponsor-logos" ON storage.objects FOR INSERT TO authenticated WITH CHECK ((bucket_id = 'sponsor-logos'::text));


--
-- Name: objects Allow users to delete avatars; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow users to delete avatars" ON storage.objects FOR DELETE TO authenticated USING ((bucket_id = 'avatars'::text));


--
-- Name: objects Allow users to delete their avatars; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow users to delete their avatars" ON storage.objects FOR DELETE TO authenticated USING (((bucket_id = 'public'::text) AND ((storage.foldername(name))[1] = 'avatars'::text)));


--
-- Name: objects Allow users to update avatars; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow users to update avatars" ON storage.objects FOR UPDATE TO authenticated USING ((bucket_id = 'avatars'::text));


--
-- Name: objects Give public access to avatars; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Give public access to avatars" ON storage.objects FOR SELECT USING (((bucket_id = 'public'::text) AND ((storage.foldername(name))[1] = 'avatars'::text)));


--
-- Name: objects Give public access to sponsor-logos; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Give public access to sponsor-logos" ON storage.objects FOR SELECT USING ((bucket_id = 'sponsor-logos'::text));


--
-- Name: objects Public Access; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Public Access" ON storage.objects FOR INSERT WITH CHECK ((bucket_id = 'sponsor-logos'::text));


--
-- Name: objects authenticated users can upload; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "authenticated users can upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK ((bucket_id = 'avatars'::text));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: objects public can view; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "public can view" ON storage.objects FOR SELECT USING ((bucket_id = 'avatars'::text));


--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: supabase_realtime_messages_publication; Type: PUBLICATION; Schema: -; Owner: supabase_admin
--

CREATE PUBLICATION supabase_realtime_messages_publication WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime_messages_publication OWNER TO supabase_admin;

--
-- Name: supabase_realtime_messages_publication messages; Type: PUBLICATION TABLE; Schema: realtime; Owner: supabase_admin
--

ALTER PUBLICATION supabase_realtime_messages_publication ADD TABLE ONLY realtime.messages;


--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;
GRANT ALL ON FUNCTION auth.email() TO postgres;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;
GRANT ALL ON FUNCTION auth.role() TO postgres;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;
GRANT ALL ON FUNCTION auth.uid() TO postgres;


--
-- Name: FUNCTION algorithm_sign(signables text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION sign(payload json, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION try_cast_double(inp text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;


--
-- Name: FUNCTION url_decode(data text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;


--
-- Name: FUNCTION url_encode(data bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION verify(token text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_keygen(); Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_keygen() TO service_role;


--
-- Name: FUNCTION create_submission_notification(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.create_submission_notification() TO anon;
GRANT ALL ON FUNCTION public.create_submission_notification() TO authenticated;
GRANT ALL ON FUNCTION public.create_submission_notification() TO service_role;


--
-- Name: FUNCTION current_user_id(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.current_user_id() TO anon;
GRANT ALL ON FUNCTION public.current_user_id() TO authenticated;
GRANT ALL ON FUNCTION public.current_user_id() TO service_role;


--
-- Name: FUNCTION get_sponsor_count_for_user(user_uuid uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_sponsor_count_for_user(user_uuid uuid) TO anon;
GRANT ALL ON FUNCTION public.get_sponsor_count_for_user(user_uuid uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_sponsor_count_for_user(user_uuid uuid) TO service_role;


--
-- Name: FUNCTION handle_updated_at(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_updated_at() TO anon;
GRANT ALL ON FUNCTION public.handle_updated_at() TO authenticated;
GRANT ALL ON FUNCTION public.handle_updated_at() TO service_role;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_updated_at_column() TO anon;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO authenticated;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION can_insert_object(bucketid text, name text, owner uuid, metadata jsonb); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) TO postgres;


--
-- Name: FUNCTION extension(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.extension(name text) TO postgres;


--
-- Name: FUNCTION filename(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.filename(name text) TO postgres;


--
-- Name: FUNCTION foldername(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.foldername(name text) TO postgres;


--
-- Name: FUNCTION get_size_by_bucket(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.get_size_by_bucket() TO postgres;


--
-- Name: FUNCTION list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) TO postgres;


--
-- Name: FUNCTION list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) TO postgres;


--
-- Name: FUNCTION operation(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.operation() TO postgres;


--
-- Name: FUNCTION search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) TO postgres;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.update_updated_at_column() TO postgres;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE decrypted_key; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.decrypted_key TO pgsodium_keyholder;


--
-- Name: TABLE masking_rule; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.masking_rule TO pgsodium_keyholder;


--
-- Name: TABLE mask_columns; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.mask_columns TO pgsodium_keyholder;


--
-- Name: TABLE bounties; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.bounties TO anon;
GRANT ALL ON TABLE public.bounties TO authenticated;
GRANT ALL ON TABLE public.bounties TO service_role;


--
-- Name: TABLE bounty_comments; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.bounty_comments TO anon;
GRANT ALL ON TABLE public.bounty_comments TO authenticated;
GRANT ALL ON TABLE public.bounty_comments TO service_role;


--
-- Name: TABLE bounty_submissions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.bounty_submissions TO anon;
GRANT ALL ON TABLE public.bounty_submissions TO authenticated;
GRANT ALL ON TABLE public.bounty_submissions TO service_role;


--
-- Name: TABLE proof_of_work; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.proof_of_work TO anon;
GRANT ALL ON TABLE public.proof_of_work TO authenticated;
GRANT ALL ON TABLE public.proof_of_work TO service_role;


--
-- Name: TABLE proof_of_work_skills; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.proof_of_work_skills TO anon;
GRANT ALL ON TABLE public.proof_of_work_skills TO authenticated;
GRANT ALL ON TABLE public.proof_of_work_skills TO service_role;


--
-- Name: TABLE skills; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.skills TO anon;
GRANT ALL ON TABLE public.skills TO authenticated;
GRANT ALL ON TABLE public.skills TO service_role;


--
-- Name: TABLE sponsors; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.sponsors TO anon;
GRANT ALL ON TABLE public.sponsors TO authenticated;
GRANT ALL ON TABLE public.sponsors TO service_role;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE messages_2025_05_15; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_05_15 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_05_15 TO dashboard_user;


--
-- Name: TABLE messages_2025_05_16; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_05_16 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_05_16 TO dashboard_user;


--
-- Name: TABLE messages_2025_05_17; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_05_17 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_05_17 TO dashboard_user;


--
-- Name: TABLE messages_2025_05_18; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_05_18 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_05_18 TO dashboard_user;


--
-- Name: TABLE messages_2025_05_19; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_05_19 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_05_19 TO dashboard_user;


--
-- Name: TABLE messages_2025_05_20; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_05_20 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_05_20 TO dashboard_user;


--
-- Name: TABLE messages_2025_05_21; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_05_21 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_05_21 TO dashboard_user;


--
-- Name: TABLE messages_2025_05_22; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_05_22 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_05_22 TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;
GRANT ALL ON TABLE storage.s3_multipart_uploads TO postgres;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;
GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO postgres;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON SEQUENCES  TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON TABLES  TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON SEQUENCES  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON FUNCTIONS  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON TABLES  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

