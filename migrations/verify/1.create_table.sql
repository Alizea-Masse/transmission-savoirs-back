-- Verify transmission:1.create_table on pg

BEGIN;

SELECT * FROM role WHERE false;
SELECT * FROM picture WHERE false;
SELECT * FROM "user" WHERE false;
SELECT * FROM type WHERE false;
SELECT * FROM condition WHERE false;
SELECT * FROM ad WHERE false;
SELECT * FROM label WHERE false;
SELECT * FROM category WHERE false;
SELECT * FROM holds WHERE false;
SELECT * FROM belong WHERE false;
SELECT * FROM get WHERE false;








ROLLBACK;
