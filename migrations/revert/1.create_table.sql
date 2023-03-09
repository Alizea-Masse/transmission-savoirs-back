-- Revert transmission:1.create_table from pg

BEGIN;

DROP INDEX login;
DROP TABLE role, picture, "user", type, condition, ad, label, category, belong, get;
DROP DOMAIN mail, zip;

COMMIT;
