# Build Stage
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Production Stage
FROM nginx:1.25-alpine

# Security & Optimization
RUN rm -rf /etc/nginx/conf.d/default.conf && \
    apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    apk del tzdata

COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Non-root user
RUN chown -R nginx:nginx /var/cache/nginx && \
    chmod -R 755 /var/log/nginx
USER nginx

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost >/dev/null || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]