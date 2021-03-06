module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/co_make.db3"
    },
    useNullAsDefault: true, // needed for sqlite

    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  staging: {
    client: "sqlite3",
    connection: {
      database: "./data/co_make.db3",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "sqlite3",
    connection: {
      database: "./data/co_make.db3",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
