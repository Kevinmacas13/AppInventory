CREATE TABLE "clothe" (
	"id" char(30) PRIMARY KEY NOT NULL,
	"time_created" timestamp DEFAULT now() NOT NULL,
	"time_updated" timestamp DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"time_deleted" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"name" varchar(100) NOT NULL,
	"codeqr" varchar(100) NOT NULL,
	"image" varchar(612),
	"color" varchar(100) NOT NULL,
	"category" varchar(100) NOT NULL,
	"size" varchar(20) NOT NULL,
	"quantity" double precision NOT NULL,
	"status" varchar(100) NOT NULL
);
--> statement-breakpoint
DROP TABLE "animal" CASCADE;--> statement-breakpoint
DROP TABLE "birth" CASCADE;--> statement-breakpoint
DROP TABLE "insemination" CASCADE;--> statement-breakpoint
DROP TABLE "vaccine" CASCADE;