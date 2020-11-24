# Migration `20201124142204-auth`

This migration has been generated at 11/24/2020, 3:22:04 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_userId_fkey"

ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_userId_fkey"

ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_userId_fkey"

ALTER TABLE "public"."Feedback" DROP COLUMN "userId",
ADD COLUMN "authorId" text   NOT NULL 

ALTER TABLE "public"."Like" DROP COLUMN "userId",
ADD COLUMN "authorId" text   NOT NULL 

ALTER TABLE "public"."Project" DROP COLUMN "userId",
ADD COLUMN "authorId" text   NOT NULL 

ALTER TABLE "public"."Feedback" ADD FOREIGN KEY("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Like" ADD FOREIGN KEY("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Project" ADD FOREIGN KEY("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201117162411-auth-mvp..20201124142204-auth
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -25,31 +25,31 @@
   id          Int        @id @default(autoincrement())
   title       String
   description String
   createdAt   DateTime   @default(now())
-  author      User       @relation(fields: [userId], references: [id])
+  author      User       @relation(fields: [authorId], references: [id])
   likes       Like[]
   category    Technology @default(JavaScript)
   feedback    Feedback[]
-  userId      String
+  authorId      String
 }
 model Like {
   id        Int     @id @default(autoincrement())
-  author    User    @relation(fields: [userId], references: [id])
+  author    User    @relation(fields: [authorId], references: [id])
   project   Project @relation(fields: [projectId], references: [id])
   projectId Int
-  userId    String
+  authorId    String
 }
 model Feedback {
   id        Int      @id @default(autoincrement())
   content   String
   createdAt DateTime @default(now())
-  author    User     @relation(fields: [userId], references: [id])
+  author    User     @relation(fields: [authorId], references: [id])
   project   Project  @relation(fields: [projectId], references: [id])
   projectId Int
-  userId    String
+  authorId    String
 }
 enum Technology {
   JavaScript
```


