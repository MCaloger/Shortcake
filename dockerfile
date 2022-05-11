FROM node:16-alpine
WORKDIR /app
COPY ./ .
ENV PORT=3000
ENV DB="data.db"
ENV CODELENGTH=5
ENV BASE="http://localhost:8002"
RUN npm install
RUN ls
EXPOSE 3000
CMD ["npm", "start"]
