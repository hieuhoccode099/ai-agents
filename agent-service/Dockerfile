FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies with caching
FROM base AS deps
RUN corepack enable
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build TypeScript
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json ./tsconfig.json
COPY . .
RUN yarn build

# Production image with only production deps and built files
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true --ignore-scripts
COPY --from=build /app/dist ./dist
# If you have any runtime assets (views/public), copy them here as needed

EXPOSE 3000
CMD ["node", "dist/app.js"]
