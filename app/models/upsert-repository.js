'use strict';

const db               = require('../config/db-connection');
const InsertRepository = require('./insert/repository');

class UpsertRepository {
  constructor(data, savedData) {
    this.data = data;
    this.savedData = savedData;
  }

  perform() {
    let insertRepository = new InsertRepository(this.data);

    return insertRepository
      .perform()
      .then((results) => { return this.storeSavedRepository(results); })
      .catch((e) => { return this.handleRepositoryError(e); });
  }

  selectRepository() {
    return db
      .select()
      .from('repositories')
      .where({
        owner: this.data.owner,
        name: this.data.repo
      });
  }

  handleRepositoryError(e) {
    if (!e.message.includes('repositories_owner_name_unique')) {
      return Promise.reject(e);
    }

    return this
      .selectRepository()
      .then((results) => { return this.storeSavedRepository(results); });
  }

  storeSavedRepository(results) {
    this.savedData.repository = results[0];
    return this.savedData;
  }
}

module.exports = UpsertRepository;

