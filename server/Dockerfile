FROM node:20-alpine
WORKDIR /server
COPY package*.json .
RUN npm i
EXPOSE 9000
CMD ["npm", "start"]
