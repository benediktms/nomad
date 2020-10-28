# Migration `20201022152811-add-clientsand-invoices`

This migration has been generated by Benedikt Schnatterbeck at 10/22/2020, 4:28:11 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Project" ADD COLUMN "clientId" integer   ,
ALTER COLUMN "userId" DROP NOT NULL

CREATE TABLE "public"."Client" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"name" text   NOT NULL ,
"userId" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Invoice" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"clientId" integer   ,
"userId" integer   ,
"name" text   NOT NULL ,
"description" text   ,
"amount" Decimal(65,30)   ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."Client" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Invoice" ADD FOREIGN KEY ("clientId")REFERENCES "public"."Client"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Invoice" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Project" ADD FOREIGN KEY ("clientId")REFERENCES "public"."Client"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201021093312-add-name-to-project..20201022152811-add-clientsand-invoices
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -21,9 +21,11 @@
   email          String    @unique
   hashedPassword String?
   role           String    @default("user")
   sessions       Session[]
-  projects       Project[]
+  clients        Client[]
+  Invoice        Invoice[]
+  Project        Project[]
 }
 model Session {
   id                 Int       @id @default(autoincrement())
@@ -38,12 +40,38 @@
   publicData         String?
   privateData        String?
 }
+model Client {
+  id        Int       @id @default(autoincrement())
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+  name      String
+  User      User?     @relation(fields: [userId], references: [id])
+  userId    Int?
+  projects  Project[]
+  Invoice   Invoice[]
+}
+
+model Invoice {
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  client      Client?  @relation(fields: [clientId], references: [id])
+  clientId    Int?
+  User        User?    @relation(fields: [userId], references: [id])
+  userId      Int?
+  name        String
+  description String?
+  amount      Float?
+}
+
 model Project {
   id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
-  user      User     @relation(fields: [userId], references: [id])
-  userId    Int
+  Client    Client?  @relation(fields: [clientId], references: [id])
+  clientId  Int?
+  User      User?    @relation(fields: [userId], references: [id])
+  userId    Int?
   name      String
 }
```

