# Migration `20201110003946-mvp-2`

This migration has been generated at 11/10/2020, 1:39:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."Project_authorId_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201109233837-mvp..20201110003946-mvp-2
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
@@ -14,9 +14,9 @@
   login   String?
   bio   String?
   createdAt DateTime? @default(now())
   avatarUrl String?
-  projects Project?
+  projects Project[]
 }
 model Project {
   id Int @default(autoincrement()) @id
```


