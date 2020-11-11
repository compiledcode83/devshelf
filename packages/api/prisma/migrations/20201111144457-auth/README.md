# Migration `20201111144457-auth`

This migration has been generated at 11/11/2020, 3:44:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE SEQUENCE "user_id_seq";
ALTER TABLE "public"."User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE "user_id_seq" OWNED BY "public"."User"."id"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201111144457-auth
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,62 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id      Int      @default(autoincrement()) @id
+  email   String   @unique
+  name    String
+  login   String?
+  bio   String?
+  createdAt DateTime? @default(now())
+  avatarUrl String?
+  projects Project[]
+}
+
+model Project {
+  id Int @default(autoincrement()) @id
+  title String
+  description String
+  createdAt DateTime @default(now())
+  author User  @relation(fields: [authorId], references: [id])
+  authorId  Int
+  likes     Like[]
+  category Technology @default(JavaScript)
+  feedback Feedback[]
+}
+
+model Like { 
+  id Int @default(autoincrement()) @id
+  author User  @relation(fields: [authorId], references: [id])
+  authorId  Int
+  project    Project  @relation(fields: [projectId], references: [id])
+  projectId  Int
+}
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
+}
```


