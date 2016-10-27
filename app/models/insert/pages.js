'use strict';

const InsertRecords = require('../insert-records');
const InsertIssues  = require('./issues');

class Page extends InsertRecords {
  performSavingIssues() {
    return this
      .perform()
      .then((results) => { this.storeAndAssociateData(results); })
      .then(()        => { return this.insertIssues(); });
  }

  storeAndAssociateData(results) {
    this.pageResults      = results;
    this.savedData.pages  = results;
    this.issueData = [];
    this.buildIssueData();
  }

  buildIssueData() {
    this.data.forEach((pageData, i) => {
      this.gatherIssueFromPage(pageData, i);
    });
  }

  gatherIssueFromPage(pageData, i) {
    let id = this.findPageId(pageData);
    ['errors', 'warnings', 'notices'].forEach((type) => {
      this.data[i].results[type].forEach((issueData) => {
        this.issueData.push(Object.assign({}, issueData, {page_id: id}));
      });
    });
  }

  insertIssues() {
    return new InsertIssues(this.issueData)
      .perform()
      .then((results) => {
        this.savedData.issues = results;
        return this.savedData;
      });
  }

  findPageId(data) {
    let foundPage = this.pageResults.find((record) => {
      return record.path === data.path && record.size === data.size;
    });

    return (foundPage || {}).id;
  }

  attributes(data) {
    return {
      report_id: data.report_id,
      path: data.path,
      size: data.size
    };
  }

  tableName() {
    return 'pages';
  }

  requiredKeys() {
    return ['report_id', 'path', 'size'];
  }

  returningColumns() {
    return ['id', 'report_id', 'path', 'size'];
  }
}

module.exports = Page;
