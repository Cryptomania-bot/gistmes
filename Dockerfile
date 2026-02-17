# --- Backend-Only Runtime ---
FROM oven/bun:1.3.5

# Set the timezone to avoid the default UTC.
# You can override this at build time with: --build-arg TIMEZONE=America/New_York
# See list of timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
ARG TIMEZONE=Etc/UTC
ENV TZ=${TIMEZONE}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Setup Backend
WORKDIR /app/backend
COPY backend/package.json backend/bun.lockb* ./
RUN bun install

COPY backend/ ./

# Environment & Start
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000

# Start with bun
CMD ["bun", "index.ts"]