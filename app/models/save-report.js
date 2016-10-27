'use strict';

const UpsertRepsitory      = require('./upsert-repository');
const InsertReport         = require('./insert/report');
const InsertPages          = require('./insert/pages');

class SaveReport {
  constructor(data) {
    this.data = Object.assign({}, data);
    this.savedData = {pages: []};
  }

  perform() {
    return this
      .upsertRepository()
      .then(() => { return this.insertReport(); })
      .then(() => { return this.insertPages(); });
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

  insertPages() {
    let pageData = this.data.tests.map((item) => {
      item.report_id = this.savedData.report.id;
      return item;
    });

    return new InsertPages(pageData, this.savedData).performSavingIssues();
  }
}

module.exports = SaveReport;
