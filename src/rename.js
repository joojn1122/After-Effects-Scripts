const fs = require('fs');
const path = require('path');

const sourceDir = '../scripts'; // Directory where .js files are generated

fs.readdirSync(sourceDir).forEach(file => {
    if (file.endsWith('.js')) {
        const jsFilePath = path.join(sourceDir, file);
        const jsxFilePath = path.join(sourceDir, file.replace('.js', '.jsx'));

        fs.renameSync(jsFilePath, jsxFilePath);
    }
});
