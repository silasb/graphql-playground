# GraphQL

> Playground based on hasura

## Getting started

```sh
docker-compose up -d hasura
```

Go to http://localhost:8080

Connect your GraphQL client to http://localhost:8080/v1/graphql

## Backup

```sh
docker exec -it hashura_postgres_1 pg_dump -U postgres -d postgres > all.sql
```

## Restore

