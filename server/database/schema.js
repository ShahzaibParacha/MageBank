const knex = require("knex");
const path = require("path");
const db_path = path.resolve(__dirname, "magebank.sqlite3");

const conn = knex({
  client: "sqlite3",
  connection: {
    filename: db_path,
  },
  useNullAsDefault: true,
});

conn.schema
  .hasTable("images")
  .then((exists) => {
    if (!exists) {
      return conn.schema
        .createTable("images", (table) => {
          table.increments("img_id").primary();
          table.string("filename");
          table.integer("keywords");
          table.string("address");
        })
        .then(() => {
          console.log("New Images table was created");
        })
        .catch((error) => {
          console.error(`Error creating new Images table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("Database setup completed!");
  })
  .catch((error) => {
    console.error(`Error setting up the database: ${error}`);
  });

module.exports = conn;
