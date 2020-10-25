var fs = require('fs-extra');
fs.copy('src/404.html','www/404.html');
console.log('>>>>>> Move 404.html to www');