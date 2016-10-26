'use strict';

let env = process.env.NODE_ENV;
if (!env || env === 'undefined') {
  env = 'development';
}

let database = 'continua11y-dashboard-' + env;
let username = process.env.DATABASE_USER_NAME;
let password = process.env.DATABASE_PASSWORD;

let config = {
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

module.exports = {
  development: config,
  test:        config,
  staging:     config,
  production:  config
};
