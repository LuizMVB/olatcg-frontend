FROM node:18-alpine3.16
WORKDIR /olatcg-frontend
EXPOSE 3000
COPY . .
RUN npm install
ENTRYPOINT npm start