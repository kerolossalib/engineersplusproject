alter table "public"."positions" drop constraint "positions_emplyee_id_fkey";

alter table "public"."roadmap_steps" drop constraint "roadmap_steps_position_id_fkey";

alter table "public"."users" drop constraint "users_nationality_fkey";

create table "public"."roadmap_steps_documents" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "step_id" bigint,
    "name" text,
    "description" text,
    "responsable" text
);


alter table "public"."roadmap_steps_documents" enable row level security;

alter table "public"."countries" enable row level security;

alter table "public"."positions" drop column "emplyee_id";

alter table "public"."positions" enable row level security;

alter table "public"."qualifications" enable row level security;

alter table "public"."roadmap_steps" drop column "position_id";

alter table "public"."roadmap_steps" enable row level security;

alter table "public"."users" drop column "qualification_id";

alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX roadmap_steps_documents_pkey ON public.roadmap_steps_documents USING btree (id);

alter table "public"."roadmap_steps_documents" add constraint "roadmap_steps_documents_pkey" PRIMARY KEY using index "roadmap_steps_documents_pkey";

alter table "public"."roadmap_steps_documents" add constraint "roadmap_steps_documents_step_id_fkey" FOREIGN KEY (step_id) REFERENCES roadmap_steps(id) not valid;

alter table "public"."roadmap_steps_documents" validate constraint "roadmap_steps_documents_step_id_fkey";

grant delete on table "public"."roadmap_steps_documents" to "anon";

grant insert on table "public"."roadmap_steps_documents" to "anon";

grant references on table "public"."roadmap_steps_documents" to "anon";

grant select on table "public"."roadmap_steps_documents" to "anon";

grant trigger on table "public"."roadmap_steps_documents" to "anon";

grant truncate on table "public"."roadmap_steps_documents" to "anon";

grant update on table "public"."roadmap_steps_documents" to "anon";

grant delete on table "public"."roadmap_steps_documents" to "authenticated";

grant insert on table "public"."roadmap_steps_documents" to "authenticated";

grant references on table "public"."roadmap_steps_documents" to "authenticated";

grant select on table "public"."roadmap_steps_documents" to "authenticated";

grant trigger on table "public"."roadmap_steps_documents" to "authenticated";

grant truncate on table "public"."roadmap_steps_documents" to "authenticated";

grant update on table "public"."roadmap_steps_documents" to "authenticated";

grant delete on table "public"."roadmap_steps_documents" to "service_role";

grant insert on table "public"."roadmap_steps_documents" to "service_role";

grant references on table "public"."roadmap_steps_documents" to "service_role";

grant select on table "public"."roadmap_steps_documents" to "service_role";

grant trigger on table "public"."roadmap_steps_documents" to "service_role";

grant truncate on table "public"."roadmap_steps_documents" to "service_role";

grant update on table "public"."roadmap_steps_documents" to "service_role";


