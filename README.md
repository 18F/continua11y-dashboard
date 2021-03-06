# Continua11y

[![Build Status](https://travis-ci.org/18F/continua11y-dashboard.svg?branch=master)](https://travis-ci.org/18F/continua11y-dashboard) [![Test Coverage](https://codeclimate.com/github/18F/continua11y-dashboard/badges/coverage.svg)](https://codeclimate.com/github/18F/continua11y-dashboard/coverage) [![Code Climate](https://codeclimate.com/github/18F/continua11y-dashboard/badges/gpa.svg)](https://codeclimate.com/github/18F/continua11y-dashboard) [![Continua11y](https://continua11y-staging.apps.cloud.gov/badges/18F/continua11y-dashboard/master)](https://continua11y-staging.apps.cloud.gov)

A dashboard for continuous integration of accessibility. It uses [pa11y](https://github.com/nature/pa11y), a web accessibility tool in an environment like CI to generate accessibility statistics for pages on a site. The dashboard also provides accessibility badges to install on your repo!

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

## Development work
This is an express application written in node.js. Install all
dependencies via:

    npm install

This is a basic express app, so there are a couple of npm scripts to
make reloading the application while working almost seamless.

To reload the general application code while running a server use this
script:

    npm run dev

Unfortunately, rerunning the sass is a different process. To compile the
css takes an addition script:

    npm run dev_sass

Running both those scripts while developing can give a good reloadable
environment.

#### Environmental variables

The application integrates with github and requires environmental
variables. Development and test use the great module `dotenv` to load
environmental variables for the test run.

To get started copy the sample file to `.env`.

    cp .env-sample .env

A script on application creation checks to make sure require
environmental variables are present.

#### Database

Database is postgres and you need to create these databases outside the
application scripts:

    createdb continua11y-dashboard-test # for test env
    createdb continua11y-dashboard-development # for development

The database sql abstraction is provided by the module `knex`, and other database configuration options can be found in the `./knexfile.js`.

Migrations are also handled by this module.

Creating a new migration can be done via:

    node_modules/.bin/knex migrate:make ___migration_name_here___

Migrate the databases via

    NODE_ENV=development node_modules/.bin/knex migrate:latest
    NODE_ENV=test        node_modules/.bin/knex migrate:latest

#### Testing

Acceptance tests use the npm module [zombie](http://zombie.js.org/) and
are located in the `test/acceptance` directory.

Unit and integration tests are in the `test` directory and organized to mirror the `app`
directory.

All types of tests use `mocha` as the test runner.

Run tests via `npm test`. Under the covers that runs mocha recursively
on the test directory.

See mocha documentation for details about running tests in isolation or
running a single file.

#### Starting the app

There is a script for that:

    npm start

## Getting your badge

SVG badges are available from the dashboard via a url:
`/badges/:repository_owner/:repository_name/:branch'.
For example the path for this repository would be
`/badges/18F/continua11y-dashboard/master`.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.

