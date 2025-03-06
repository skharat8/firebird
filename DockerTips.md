### Using Docker Compose File

- _Run_<br>
  `docker compose --env-file apps/backend/.env.development up --build`
- _List Files in Running Container_<br>
  `docker exec firebird-backend-app ls /app`
- _Prune to recover space_<br>
  `docker system prune`
  - After pruning, run `docker compose up` with `--force-recreate` option
- ARGS defines build-time variables, while ENV sets run-time variables within the container.

**Databases**

- Open postgres terminal with your database<br>
  `docker exec -it firebird-db[container_name] psql -h localhost -U postgres firebird[database_name]`
- Exec command can be used to run any cmds on your running docker container. _For example, use it to seed your local database._<br>
  `docker exec -it firebird-backend-app pnpm prisma db seed`
  - This works to seed firebird-db because the backend and postgres containers are connected in the docker compose file.

---

### Running Docker Cmds Directly

**Note:** Its easier to create and use a docker-compose.yml file instead.

<u>_Step-by-Step Guide_</u>

1. Build image (from root of monorepo)<br>
   `docker build -f apps/backend/Dockerfile . --tag firebird-backend:latest`

2. Confirm image was created: `docker image ls `

3. Create database server: `sudo docker network create firebird`

4. Run the database server using a default image

   ```
    sudo docker run --rm --name firebird-db[container_name/host_name] --env POSTGRES_DB=firebird --env POSTGRES_PASSWORD=admin --volume pg-data:/var/lib/postgresql/data --publish[port] 5432:5432 --network firebird postgres:alpine
   ```

5. Run the app docker image
   ```
    docker run --rm --name firebird-backend-app[container_name] -p[port] 3000:3000 --env-file apps/backend/.env --network firebird firebird-backend[image_name]
   ```
