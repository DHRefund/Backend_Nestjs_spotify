# Sử dụng node 18 với alpine làm base image
FROM node:18-alpine AS builder

# Cài đặt các dependencies cần thiết
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Cài đặt dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy toàn bộ source code
COPY . .

# Build ứng dụng
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Cài đặt thư viện cần thiết cho production
RUN apk add --no-cache openssl

# Copy các file cần thiết từ stage builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 3001
EXPOSE 5555

# Start ứng dụng
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]