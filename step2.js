"use strict";

const axios = require("axios");
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

/** Function accepts a URL and prints to console the first 80 characters of
 *  the html or throws and error if unable to access the URL.
*/

async function catWeb(URL) {
  try {
    let resp = await axios.get(`${URL}`);
    console.log(resp.data.slice(0, 80), "...");
  } catch (err) {
    console.log(`Error accessing ${URL}:`);
    console.log(err.message);
    process.exit(1);
  }
}

/** Function decides if the argument is URL and calls catWeb(arg) if so.
 *  Otherwise, calls cat(arg).
*/

function catDecider(arg) {
  if (arg.slice(0, 4) === "http") {
    catWeb(arg);
  } else {
    cat(arg);
  }
}

const arg = process.argv[2];
catDecider(arg);
