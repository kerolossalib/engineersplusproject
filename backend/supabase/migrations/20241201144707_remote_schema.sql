alter table "public"."companies" disable row level security;

alter table "public"."countries" disable row level security;

alter table "public"."positions" add column "employee_id" uuid;

alter table "public"."positions" disable row level security;

alter table "public"."qualifications" disable row level security;

alter table "public"."roadmap_steps" add column "position_id" bigint;

alter table "public"."roadmap_steps" add column "responsable" text;

alter table "public"."roadmap_steps" disable row level security;

alter table "public"."roadmap_steps_documents" add column "file_url" text;

alter table "public"."roadmap_steps_documents" add column "isDone" boolean;

alter table "public"."roadmap_steps_documents" disable row level security;

alter table "public"."users" add column "role" text;

alter table "public"."users" disable row level security;

alter table "public"."positions" add constraint "positions_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES users(id) not valid;

alter table "public"."positions" validate constraint "positions_employee_id_fkey";

alter table "public"."roadmap_steps" add constraint "roadmap_steps_position_id_fkey" FOREIGN KEY (position_id) REFERENCES positions(id) not valid;

alter table "public"."roadmap_steps" validate constraint "roadmap_steps_position_id_fkey";

alter table "public"."users" add constraint "users_nationality_fkey" FOREIGN KEY (nationality) REFERENCES countries(id) not valid;

alter table "public"."users" validate constraint "users_nationality_fkey";


