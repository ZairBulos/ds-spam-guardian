const fs = require("fs");
const path = require("path");

const loadFiles = (folder) => {
  const basePath = path.join(__dirname, "..", folder);

  return fs
    .readdirSync(basePath)
    .filter((file) => file.endsWith(".js"))
    .map((file) => ({
      name: file,
      path: path.join(basePath, file),
      module: require(path.join(basePath, file)),
    }));
};

module.exports = loadFiles;
