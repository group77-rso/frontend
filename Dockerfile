FROM node:18.13.0 as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:18.13.0

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/build /app/build

EXPOSE 8090

CMD ["serve", "-s", "-l", "8090", "build"]
