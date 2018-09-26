const fs = require('fs');
const path = require('path');

const resolve = (currentPath, space) => {
  fs.readdirSync(currentPath).forEach((file) => {
    const tempPath = path.join(currentPath, file);
    const stats = fs.statSync(tempPath);

    if (stats.isDirectory()) {
      space[file] = resolve(tempPath, {});
    } else if (stats.isFile() && path.extname(file) === '.js') {
      space[path.basename(file, '.js')] = require(tempPath);
    }
  });
  return space;
};

module.exports = resolve(__dirname, {});
