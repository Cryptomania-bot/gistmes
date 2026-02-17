# --- STAGE 1: Build the Web Frontend ---
FROM node:18-slim AS build-web
WORKDIR /app/web

# Copy package files and install using npm
COPY web/package.json web/package-lock.json* ./
RUN npm install

# Copy source and build
COPY web/ ./
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# --- STAGE 2: Final Runtime ---
FROM oven/bun:1.3.5

# Set the timezone to avoid the default UTC.
# You can override this at build time with: --build-arg TIMEZONE=America/New_York
# See list of timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
ARG TIMEZONE=Etc/UTC
ENV TZ=${TIMEZONE}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
# 1. Bring in the built frontend files from Stage 1
# This keeps your final image small because it doesn't include npm or Node
COPY --from=build-web /app/web/dist ./web/dist

# 2. Setup Backend
WORKDIR /app/backend
COPY backend/package.json backend/bun.lockb* ./
RUN bun install

COPY backend/ ./

# 3. Environment & Start
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE 3000

# Start with bun
CMD ["bun", "index.ts"]