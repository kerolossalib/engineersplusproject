create table "public"."companies" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "url" text,
    "logo" text
);


alter table "public"."companies" enable row level security;

create table "public"."positions" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "title" text,
    "description" text,
    "image_url" text,
    "company_id" bigint
);


alter table "public"."positions" enable row level security;

CREATE UNIQUE INDEX companies_pkey ON public.companies USING btree (id);

CREATE UNIQUE INDEX positions_pkey ON public.positions USING btree (id);

alter table "public"."companies" add constraint "companies_pkey" PRIMARY KEY using index "companies_pkey";

alter table "public"."positions" add constraint "positions_pkey" PRIMARY KEY using index "positions_pkey";

alter table "public"."positions" add constraint "positions_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) not valid;

alter table "public"."positions" validate constraint "positions_company_id_fkey";

grant delete on table "public"."companies" to "anon";

grant insert on table "public"."companies" to "anon";

grant references on table "public"."companies" to "anon";

grant select on table "public"."companies" to "anon";

grant trigger on table "public"."companies" to "anon";

grant truncate on table "public"."companies" to "anon";

grant update on table "public"."companies" to "anon";

grant delete on table "public"."companies" to "authenticated";

grant insert on table "public"."companies" to "authenticated";

grant references on table "public"."companies" to "authenticated";

grant select on table "public"."companies" to "authenticated";

grant trigger on table "public"."companies" to "authenticated";

grant truncate on table "public"."companies" to "authenticated";

grant update on table "public"."companies" to "authenticated";

grant delete on table "public"."companies" to "service_role";

grant insert on table "public"."companies" to "service_role";

grant references on table "public"."companies" to "service_role";

grant select on table "public"."companies" to "service_role";

grant trigger on table "public"."companies" to "service_role";

grant truncate on table "public"."companies" to "service_role";

grant update on table "public"."companies" to "service_role";

grant delete on table "public"."positions" to "anon";

grant insert on table "public"."positions" to "anon";

grant references on table "public"."positions" to "anon";

grant select on table "public"."positions" to "anon";

grant trigger on table "public"."positions" to "anon";

grant truncate on table "public"."positions" to "anon";

grant update on table "public"."positions" to "anon";

grant delete on table "public"."positions" to "authenticated";

grant insert on table "public"."positions" to "authenticated";

grant references on table "public"."positions" to "authenticated";

grant select on table "public"."positions" to "authenticated";

grant trigger on table "public"."positions" to "authenticated";

grant truncate on table "public"."positions" to "authenticated";

grant update on table "public"."positions" to "authenticated";

grant delete on table "public"."positions" to "service_role";

grant insert on table "public"."positions" to "service_role";

grant references on table "public"."positions" to "service_role";

grant select on table "public"."positions" to "service_role";

grant trigger on table "public"."positions" to "service_role";

grant truncate on table "public"."positions" to "service_role";

grant update on table "public"."positions" to "service_role";


