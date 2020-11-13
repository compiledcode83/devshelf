# Migration `20201113102639-auth2`

This migration has been generated at 11/13/2020, 11:26:39 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."User.email_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201111151410-mvp..20201113102639-auth2
--- datamodel.dml
+++ datamodel.dml
@@ -1,16 +1,16 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
   id        String     @id
-  email     String     @unique
+  email     String     
   name      String
   login     String?
   bio       String?
   createdAt DateTime?  @default(now())
```


