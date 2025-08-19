CREATE TABLE "animal" (
	"id" char(30) PRIMARY KEY NOT NULL,
	"time_created" timestamp DEFAULT now() NOT NULL,
	"time_updated" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"time_deleted" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(612),
	"birth_date" date NOT NULL,
	"breed" varchar(100) NOT NULL,
	"weight" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "birth" (
	"id" char(30) PRIMARY KEY NOT NULL,
	"time_created" timestamp DEFAULT now() NOT NULL,
	"time_updated" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"time_deleted" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"birth_date" date NOT NULL,
	"number_of_offspring" integer NOT NULL,
	"animal_id" char(30) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "insemination" (
	"id" char(30) PRIMARY KEY NOT NULL,
	"time_created" timestamp DEFAULT now() NOT NULL,
	"time_updated" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"time_deleted" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"insemination_date" date NOT NULL,
	"animal_id" char(30) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vaccine" (
	"id" char(30) PRIMARY KEY NOT NULL,
	"time_created" timestamp DEFAULT now() NOT NULL,
	"time_updated" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"time_deleted" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"vaccine_date" date NOT NULL,
	"type_of_vaccine" varchar(100) NOT NULL,
	"animal_id" char(30) NOT NULL
);
--> statement-breakpoint
DROP TABLE "deck" CASCADE;--> statement-breakpoint
DROP TABLE "flashcard_anki" CASCADE;--> statement-breakpoint
DROP TABLE "flashcard" CASCADE;--> statement-breakpoint
ALTER TABLE "birth" ADD CONSTRAINT "birth_animal_id_animal_id_fk" FOREIGN KEY ("animal_id") REFERENCES "public"."animal"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insemination" ADD CONSTRAINT "insemination_animal_id_animal_id_fk" FOREIGN KEY ("animal_id") REFERENCES "public"."animal"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccine" ADD CONSTRAINT "vaccine_animal_id_animal_id_fk" FOREIGN KEY ("animal_id") REFERENCES "public"."animal"("id") ON DELETE no action ON UPDATE no action;