const { Client } = require("pg");
async function start() {
  const client = new Client();
  await client.connect();
  const res = await client.query("SELECT $1::text as message", [
    "Hello world!",
  ]);
  console.log(res.rows[0].message); // Hello world!
  await client.end();
}

async function runMigrations() {
  const client = new Client();
  await client.connect();
  await client.query(`DROP TABLE IF EXISTS "filmes"`);
  await client.query(`DROP TABLE IF EXISTS "generos"`);
  await client.query(
    `CREATE TABLE IF NOT EXISTS "generos" ("id" SERIAL PRIMARY KEY, "nome" VARCHAR(255) NOT NULL);`
  );

  const res = await client.query(`CREATE TABLE IF NOT EXISTS "filmes" (
    "id" SERIAL PRIMARY KEY,
    "titulo" VARCHAR(255) NOT NULL,
    "ano" INTEGER NOT NULL,
    "id_genero" int,
    CONSTRAINT "fk_filmes_generos" FOREIGN KEY ("id_genero") REFERENCES "generos" ("id")
    );`);

  const createdGenre = await client.query(`
    INSERT INTO "generos" (nome) VALUES ('Ação') RETURNING id;
    `);
  await client.query(`
    INSERT INTO "filmes" (titulo, ano, id_genero) VALUES ('Filme 1', 2020, 1);
    `);
  const res3 = await client.query(`
    SELECT filmes.id, titulo, ano, "nome" AS genero FROM "filmes" INNER JOIN "generos" ON "filmes"."id_genero" = "generos"."id";
  `);

  await client.end();
}

setTimeout(runMigrations, 3000);
