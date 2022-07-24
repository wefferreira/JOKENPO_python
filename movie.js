const { Client } = require("pg");

exports.getAllMoviesByTitulo = async function (title) {
  title = title ? title : "";
  const client = new Client();
  await client.connect();
  const res3 = await client.query(
    `
    SELECT filmes.id, titulo, ano, "nome" AS genero FROM "filmes" INNER JOIN "generos" ON "filmes"."id_genero" = "generos"."id" WHERE titulo LIKE $1;
  `,
    [`%${title}%`]
  );
  await client.end();
  return res3.rows;
};
