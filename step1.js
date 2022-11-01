"use strict";

const fsP = require("fs/promises");

/** Function accepts a filepath string and prints to console the contents
 *  of the text file or throws and error if unable to encode in utf8.
*/

async function cat(filepath) {
  try {
    let contents = await fsP.readFile(`${filepath}`, "utf8");
    console.log(contents);
  } catch (err) {
    console.log(`Error reading ${filepath}:`);
    console.log(err.message);
    process.exit(1);
  }
}

const filepath = process.argv[2];
cat(filepath);