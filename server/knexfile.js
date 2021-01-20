module.exports = {
  client: "sqlite3",
  connection: { filename: "./data/db.sqlite" },
  useNullAsDefault: true,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
};
