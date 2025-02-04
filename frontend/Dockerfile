FROM node:alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ARG VITE_BACKEND_URL 
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL 
RUN npm run build 

FROM node:alpine
WORKDIR /app
COPY --from=build /app/dist /app
RUN npm install -g serve
CMD ["serve", "-s", "/app", "-l", "80"]
