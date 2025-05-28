FROM node:22.13.1-alpine AS build

WORKDIR /app

RUN npm install -g pnpm@10.5.2

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:22.13.1-alpine

WORKDIR /app

RUN npm install -g pnpm@10.5.2

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod && \
    pnpm store prune

COPY --from=build /app/dist ./dist

USER node

ARG APP_PORT=3000

ENV PORT=$APP_PORT

EXPOSE $PORT

CMD ["node", "dist/main"]