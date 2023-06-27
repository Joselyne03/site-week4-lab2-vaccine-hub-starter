\echo 'Delete and recreate the vaccine_hub database?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE vaccine_hub;
CREATE DATABASE vaccine_hub;
\connect vaccine_hub;

-- then you run the database script here: 
\i vaccine_hub-schema.sql
