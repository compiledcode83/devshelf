# Migration `20201117162411-auth-mvp`

This migration has been generated at 11/17/2020, 5:24:11 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."User.email_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201113135730-mvp..20201117162411-auth-mvp
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


