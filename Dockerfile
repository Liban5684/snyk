# Intentionally vulnerable base image for Snyk container demo
FROM node:10.16.0-alpine

WORKDIR /app
COPY package.json ./
# NOTE: dependencies are NOT installed - manifest only for Snyk scanning
COPY app.js ./

EXPOSE 3000
CMD ["node", "app.js"]
