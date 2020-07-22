Steps:
1. `docker pull postgres`
2. `docker run --name mypostgres -e POSTGRES_PASSWORD=123123 -d postgres`
3. `docker exec -it mpypostgres bash`

4. `createdb mydb`  
4.1 createdb: error: could not connect to database template1: FATAL:  role "root" does not exist
default user is `postgres`, run `su postgres` switch to `postgres`
5. `psql` command line client
6. commands:
```
SELECT version();
SELECT current_date;
SELECT 2 + 2;

```
7. psql程序有一些不属于SQL命令的内部命令。它们以反斜线开头，“\”
```
\h help
\q quit
```
8. `docker rm -f mypostgres`