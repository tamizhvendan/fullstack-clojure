let fs = require('fs');
let sass = require('node-sass');
var crypto = require('crypto');

let manifest = JSON.parse(fs.readFileSync('./resources/public/js/compiled/manifest.json', 'utf8'));
let indexHtmlFilePath = './resources/public/index.html';

function updateIndexHtml(old_string, new_string) {
  let newContent =
    fs.readFileSync(indexHtmlFilePath, 'utf8').replace(old_string, new_string);
  fs.writeFileSync(indexHtmlFilePath, newContent, 'utf8');
}

let mainModule = manifest.find(m => m['module-id'] === "main");
if (mainModule) {
  updateIndexHtml(
    new RegExp("js/compiled/main.*.js"),
    `js/compiled/${mainModule["output-name"]}`);
}

sass.render({
  file: './resources/public/sass/style.scss',
  outputStyle: 'compressed'
}, function (err, result) {
  if (err) {
    console.log(err);
    return -1;
  }
  let hash = crypto.createHash('md5').setEncoding('hex');
  hash.write(result.css);
  hash.end();
  let styleCssName = `style.${hash.read().toUpperCase()}.css`;
  let newCssFilePath = `./resources/public/css/compiled/${styleCssName}`;
  fs.writeFileSync(newCssFilePath, result.css);
  updateIndexHtml(
    new RegExp("/css/compiled/style.*.css"),
    `/css/compiled/${styleCssName}`);
});