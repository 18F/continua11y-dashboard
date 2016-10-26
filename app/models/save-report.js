'use strict';

const UpsertRepsitory      = require('./upsert-repository');
const InsertReport         = require('./insert/report');

class SaveReport {
  constructor(data) {
    this.data = Object.assign({}, data);
    this.savedData = {};
  }

  perform() {
    return this.upsertRepository()
      .then(() => { return this.insertReport(); });
  }

  upsertRepository() {
    return new UpsertRepsitory(this.data, this.savedData).perform();
  }

  insertReport() {
    this.data.repository_id = this.savedData.repository.id;

    return new InsertReport(this.data)
      .perform()
      .then((results) => {
        this.savedData.report = results[0];
        return this.savedData;
      });
  }
}

module.exports = SaveReport;
