'use strict';

const dotenv        = require('dotenv');
const requirements  = ['GITHUB_TOKEN'];

module.exports.load = function load(env) {
  env = process.env.NODE_ENV || 'development';

  if (env === 'development' || env === 'test') {
    dotenv.config();
  }
};

module.exports.ensureEnvVars = function ensureEnvVars() {
  let allRequirementsPresent = requirements.every((key) => {
    return !!process.env[key];
  });

  if (!allRequirementsPresent) {
    throw new Error('Some environmental variables are missing. Here are the requirements: ', + requirements.join(', '));
  }
};

module.exports.globals = function globals() {
  let copied = {};

  requirements.forEach((key) => {
    copied[key] = process.env[key];
  });

  return copied;
};
