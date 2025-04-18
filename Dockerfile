FROM denoland/deno:2.2.11

WORKDIR /app

COPY deno.json .

RUN deno install

COPY . .

CMD ["task", "start"]