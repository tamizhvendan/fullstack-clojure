let fs = require('fs');

let indexHtmlFilePath = './resources/public/index.html';

function updateIndexHtml(old_string, new_string) {
  let newContent =
    fs.readFileSync(indexHtmlFilePath, 'utf8').replace(old_string, new_string);
  fs.writeFileSync(indexHtmlFilePath, newContent, 'utf8');
}

updateIndexHtml(
  new RegExp("/css/compiled/style.*.css"),
  `/css/style.css`);

updateIndexHtml(
  new RegExp("js/compiled/main.*.js"),
  `js/compiled/main.js`);