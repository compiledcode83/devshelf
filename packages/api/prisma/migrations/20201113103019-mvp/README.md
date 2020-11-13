# Migration `20201113103019-mvp`

This migration has been generated at 11/13/2020, 11:30:19 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201113102639-auth2..20201113103019-mvp
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
-  email     String     
+  email     String     @unique
   name      String
   login     String?
   bio       String?
   createdAt DateTime?  @default(now())
```


