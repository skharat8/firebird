# Setup node & pnpm
FROM node:22-alpine AS base
ARG PROJECT="@repo/server"
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
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
RUN turbo prune --scope=${PROJECT} --docker

###############
## INSTALLER
###############
FROM base AS installer
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --update --no-cache libc6-compat

# Get the dependencies list from builder stage
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# By caching the content-addressable store we stop downloading the same packages again and again
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch

# Install dependencies
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
 pnpm install --filter=${PROJECT}... -r --workspace-root --frozen-lockfile

# Get the rest of the source files from builder stage
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Setup Prisma
WORKDIR /app/apps/backend
RUN if [[ "$NODE_ENV" == "development" ]] ; then pnpm prisma generate ; \
  else pnpm prisma generate --no-engine ; fi

# Build the project
WORKDIR /app
RUN pnpm turbo run build --filter=${PROJECT}...

###############
## RUNNER
###############
FROM base AS runner
WORKDIR /app

COPY --from=installer /app .

# Delete source directory, but not from the dist folder
RUN find . -type d \( -name 'node_modules' -o -name 'dist' \) -prune -o \
 -type d -name 'src' -print | xargs rm -rf

# Copy built files back to a new source directory
COPY --from=installer /app/apps/backend/dist/src ./apps/backend/src
COPY --from=installer /app/apps/backend/dist/prisma ./apps/backend/prisma

# Delete dist directory
RUN find . -type d -name 'node_modules' -prune -o -type d -name 'dist' -print | xargs rm -rf

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 express
RUN touch /app/apps/backend/server.log
RUN chown -R express: /app/apps/backend/server.log
USER express

EXPOSE 3000

# Start
WORKDIR /app/apps/backend
CMD ["pnpm", "start:migrate"]
