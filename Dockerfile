FROM tasktrack.telekom.at/docker-hub/node:18.18.2-slim
WORKDIR /opt/app
COPY package.json package-lock.json gucci.json ./
COPY .npmrc ./
COPY ./config ./config
COPY ./dist ./dist
COPY ./doc ./doc
RUN npm ci --production
EXPOSE 9010
CMD ["node", "--optimize-for-size", "--gc-interval=1000", "dist/server/index.js"]
