# Stage 0, "build-stage", based on Node.js to build the frontend
FROM node:16-alpine
RUN npm install -g npm@latest
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
