"use strict";

const zlib = require("zlib");
const tar = require("tar");
const { pipeline } = require("stream/promises");

const { TARBALL_URL, GITHUB_DIR } = require("./constants");
const { fetchTarball } = require("./net");
const { createSpinner } = require("./ui");

/**
 * Download the tarball from GitHub and extract only the .github/ directory
 * into `cwd`. Returns the spinner so the caller can call .succeed() / .fail().
 *
 * @param {string} cwd  - Directory to extract into
 * @param {string} msg  - Spinner message
 */
async function downloadAndExtract(
  cwd,
  msg = "Fetching tarball from GitHub",
  keepExisting = false,
) {
  const spinner = createSpinner(msg);

  let res;
  try {
    res = await fetchTarball(TARBALL_URL);
  } catch (err) {
    spinner.fail(`Download failed: ${err.message}`);
    console.log();
    process.exit(1);
  }

  try {
    await pipeline(
      res,
      zlib.createGunzip(),
      tar.x({
        cwd,
        strip: 1,
        keep: keepExisting,
        filter: (entryPath) => {
          const second = entryPath.replace(/\\/g, "/").split("/")[1];
          return second === GITHUB_DIR;
        },
      }),
    );
  } catch (err) {
    spinner.fail(`Extraction failed: ${err.message}`);
    console.log();
    process.exit(1);
  }

  return spinner;
}

module.exports = { downloadAndExtract };
