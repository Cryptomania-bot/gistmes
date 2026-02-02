# 1. Use the official Bun image
FROM oven/bun:latest

# 2. Set the working directory
WORKDIR /app

# --- 3. Build Web Frontend ---
WORKDIR /app/web

# Copy package files first for better caching
# We use package-lock.json since you are using npm
COPY web/package.json web/package-lock.json* ./
RUN npm install

# Copy the rest of the frontend source
COPY web/ ./

# Set Build Arguments for Vite
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL

# Build the frontend (creates the /dist folder)
RUN npm run build

# --- 4. Install Backend Dependencies ---
WORKDIR /app/backend

# Copy backend package files
COPY backend/package.json backend/package-lock.json* ./
RUN npm install

# Copy backend source code
COPY backend/ ./

# --- 5. Final Environment Setup ---
# Set non-sensitive defaults
ENV PORT=3000
ENV NODE_ENV=production

# Expose the port so the outside world can connect
EXPOSE 3000

# 6. Start the application
# We use 'bun' here because it runs index.ts natively without a build step
CMD ["bun", "index.ts"]