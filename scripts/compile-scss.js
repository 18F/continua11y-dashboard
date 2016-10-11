'use strict';

const path  = require('path');
const fs    = require('fs');
const sass  = require('node-sass');


module.exports = function render() {
  sass.render({file: path.resolve(__dirname + '/../app/assets/scss/site.scss')}, (err, result) => {
    err && console.log(err);
    fs.writeFileSync(path.resolve(__dirname + '/../app/public/css/site.css'), result.css);
  });
}

