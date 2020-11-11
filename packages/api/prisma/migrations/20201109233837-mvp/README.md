# Migration `20201109233837-mvp`

This migration has been generated at 11/10/2020, 12:38:37 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_categoryId_fkey"

ALTER TABLE "public"."Project" DROP COLUMN "categoryId",
ADD COLUMN "category" "Technology"  NOT NULL DEFAULT E'JavaScript'

ALTER TABLE "public"."User" DROP COLUMN "password"

DROP TABLE "public"."Category"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201002152833-init..20201109233837-mvp
--- datamodel.dml
+++ datamodel.dml
@@ -1,34 +1,62 @@
-// This is your Prisma schema file,
-// learn more about it in the docs: https://pris.ly/d/prisma-schema
-
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
-model Post {
-  id        Int      @default(autoincrement()) @id
+model User {
+  id      Int      @default(autoincrement()) @id
+  email   String   @unique
+  name    String
+  login   String?
+  bio   String?
+  createdAt DateTime? @default(now())
+  avatarUrl String?
+  projects Project?
+}
+
+model Project {
+  id Int @default(autoincrement()) @id
+  title String
+  description String
   createdAt DateTime @default(now())
-  title     String
-  content   String?
-  published Boolean  @default(false)
-  author    User     @relation(fields: [authorId], references: [id])
+  author User  @relation(fields: [authorId], references: [id])
   authorId  Int
+  likes     Like[]
+  category Technology @default(JavaScript)
+  feedback Feedback[]
 }
-model Profile {
-  id     Int     @default(autoincrement()) @id
-  bio    String?
-  user   User    @relation(fields: [userId], references: [id])
-  userId Int     @unique
+
+model Like { 
+  id Int @default(autoincrement()) @id
+  author User  @relation(fields: [authorId], references: [id])
+  authorId  Int
+  project    Project  @relation(fields: [projectId], references: [id])
+  projectId  Int
 }
-model User {
-  id      Int      @default(autoincrement()) @id
-  email   String   @unique
-  name    String?
-  posts   Post[]
-  profile Profile?
+
+model Feedback {
+  id Int @default(autoincrement()) @id
+  content String
+  createdAt DateTime @default(now())
+  author User  @relation(fields: [authorId], references: [id])
+  authorId  Int
+  project    Project  @relation(fields: [projectId], references: [id])
+  projectId  Int
+}
+
+enum Technology {
+  JavaScript
+  TypeScript
+  HTML
+  CSS
+  React
+  Angular
+  Vue
+  Express
+  Nest
+  PHP
 }
```


