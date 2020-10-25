var fs = require('fs-extra');

fs.copy('src/_redirects','www/_redirects');
console.log('[00:00.0]  Move _redirects to www');