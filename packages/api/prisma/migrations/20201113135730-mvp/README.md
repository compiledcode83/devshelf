# Migration `20201113135730-mvp`

This migration has been generated at 11/13/2020, 2:57:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "provider" text   
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201113103019-mvp..20201113135730-mvp
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
@@ -14,8 +14,9 @@
   login     String?
   bio       String?
   createdAt DateTime?  @default(now())
   avatarUrl String?
+  provider String?
   projects  Project[]
   Like      Like[]
   Feedback  Feedback[]
 }
```


