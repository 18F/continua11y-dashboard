'use strict';

let env = process.env.NODE_ENV;
if (!env || env === 'undefined') {
  env = 'development';
}

let database    = process.env.DATABASE_NAME || 'continua11y-dashboard-' + env;
let username    = process.env.DATABASE_USER_NAME;
let password    = process.env.DATABASE_PASSWORD;
let databaseUrl = process.env.DATABASE_URL;

console.log('connecting to database', database);

let localConfig = {
  client: 'postgresql',
  connection: {
    database: database,
    user:     username,
    password: password
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

let servedConfig = {
  client: 'postgresql',
  connection: databaseUrl
};

module.exports = {
  development: localConfig,
  test:        localConfig,
  staging:     servedConfig,
  production:  servedConfig
};
