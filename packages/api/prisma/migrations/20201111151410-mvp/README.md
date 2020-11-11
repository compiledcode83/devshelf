# Migration `20201111151410-mvp`

This migration has been generated at 11/11/2020, 4:14:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_authorId_fkey"

ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_authorId_fkey"

ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_authorId_fkey"

ALTER TABLE "public"."Feedback" DROP COLUMN "authorId",
ADD COLUMN "userId" text   NOT NULL 

ALTER TABLE "public"."Like" DROP COLUMN "authorId",
ADD COLUMN "userId" text   NOT NULL 

ALTER TABLE "public"."Project" DROP COLUMN "authorId",
ADD COLUMN "userId" text   NOT NULL 

ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE text ,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq"

ALTER TABLE "public"."Feedback" ADD FOREIGN KEY("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Like" ADD FOREIGN KEY("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Project" ADD FOREIGN KEY("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201111144457-auth..20201111151410-mvp
--- datamodel.dml
+++ datamodel.dml
@@ -1,52 +1,54 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id      Int      @default(autoincrement()) @id
-  email   String   @unique
-  name    String
-  login   String?
-  bio   String?
-  createdAt DateTime? @default(now())
+  id        String     @id
+  email     String     @unique
+  name      String
+  login     String?
+  bio       String?
+  createdAt DateTime?  @default(now())
   avatarUrl String?
-  projects Project[]
+  projects  Project[]
+  Like      Like[]
+  Feedback  Feedback[]
 }
 model Project {
-  id Int @default(autoincrement()) @id
-  title String
+  id          Int        @id @default(autoincrement())
+  title       String
   description String
-  createdAt DateTime @default(now())
-  author User  @relation(fields: [authorId], references: [id])
-  authorId  Int
-  likes     Like[]
-  category Technology @default(JavaScript)
-  feedback Feedback[]
+  createdAt   DateTime   @default(now())
+  author      User       @relation(fields: [userId], references: [id])
+  likes       Like[]
+  category    Technology @default(JavaScript)
+  feedback    Feedback[]
+  userId      String
 }
-model Like { 
-  id Int @default(autoincrement()) @id
-  author User  @relation(fields: [authorId], references: [id])
-  authorId  Int
-  project    Project  @relation(fields: [projectId], references: [id])
-  projectId  Int
+model Like {
+  id        Int     @id @default(autoincrement())
+  author    User    @relation(fields: [userId], references: [id])
+  project   Project @relation(fields: [projectId], references: [id])
+  projectId Int
+  userId    String
 }
 model Feedback {
-  id Int @default(autoincrement()) @id
-  content String
+  id        Int      @id @default(autoincrement())
+  content   String
   createdAt DateTime @default(now())
-  author User  @relation(fields: [authorId], references: [id])
-  authorId  Int
-  project    Project  @relation(fields: [projectId], references: [id])
-  projectId  Int
+  author    User     @relation(fields: [userId], references: [id])
+  project   Project  @relation(fields: [projectId], references: [id])
+  projectId Int
+  userId    String
 }
 enum Technology {
   JavaScript
@@ -58,5 +60,5 @@
   Vue
   Express
   Nest
   PHP
-}
+}
```


