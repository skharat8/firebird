###########################################################################
# 1) Build image (from root of monorepo)
# docker build -f apps/backend/Dockerfile . --tag firebird-backend:latest
#
# 2) Confirm image
# docker image ls   [See list of docker images]
#
# 3) Create database server
# sudo docker network create firebird
#
# 4) Run the database server using a default image
# sudo docker run --rm --name firebird-db[container_name/host_name]
# --env POSTGRES_DB=firebird --env POSTGRES_PASSWORD=admin
# --volume pg-data:/var/lib/postgresql/data --publish[port] 5432:5432
# --network firebird postgres:alpine
#
# 5) Run the app docker image
# docker run --rm --name firebird-backend-app[container_name]
# -p[port] 3000:3000 --env-file apps/backend/.env --network firebird
# firebird-backend[image_name]
#
###########################################################################

# Setup node & pnpm
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

###############
## BUILDER
###############
FROM base AS builder
WORKDIR /app

RUN pnpm i -g turbo@^2
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# This creates ./out/json (contains package.json for just the workspaces
# which the app depends on) & ./out/full (contains source files) directories.
RUN turbo prune --scope=@repo/server --docker

###############
## INSTALLER
###############
FROM base AS installer
WORKDIR /app

# Get the package.json from builder stage & install dependencies
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Get the rest of the source files from builder stage
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Setup Prisma
WORKDIR /app/apps/backend
RUN pnpm prisma generate

# Build the project
WORKDIR /app
RUN pnpm turbo run build --filter=@repo/server...

###############
## RUNNER
###############
FROM base AS runner
WORKDIR /app
COPY --from=installer /app .

EXPOSE 3000

# Start
WORKDIR /app/apps/backend
CMD ["pnpm", "start:migrate"]
