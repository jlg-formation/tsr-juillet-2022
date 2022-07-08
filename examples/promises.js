const fs = require("fs");

const readdir = (...args) => {
  return new Promise((resolve, reject) => {
    fs.readdir(...args, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

readdir(".")
  .then((files) => {
    console.log("files: ", files);
    return fs.promises.readFile(files[0], { encoding: "utf-8" });
  })
  .then((content) => {
    console.log("content: ", content);
  })
  .catch((err) => {
    console.log("err: ", err);
  });
