# Continua11y

[![Build Status](https://travis-ci.org/18F/continua11y-due.svg?branch=master)](https://travis-ci.org/18F/continua11y-due) [![Test Coverage](https://codeclimate.com/github/18F/continua11y-due/badges/coverage.svg)](https://codeclimate.com/github/18F/continua11y-due/coverage) [![Code Climate](https://codeclimate.com/github/18F/continua11y-due/badges/gpa.svg)](https://codeclimate.com/github/18F/continua11y-due)

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

    createdb continu_a11y_test # for test env
    createdb continu_a11y-development # for test development

Other database configuration options can be found in
`config/database.json`.

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

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.

