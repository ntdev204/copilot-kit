"use strict";

const fs = require("fs");
const path = require("path");
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
        filter: (entryPath) => {
          // entryPath = "copilot-kit-HASH/.github/..." (pre-strip, pre-map)
          const parts = entryPath
            .replace(/\\/g, "/")
            .split("/")
            .filter(Boolean);
          // parts[0] = tarball root dir, parts[1] = .github, ...
          if (parts.length < 2 || parts[1] !== GITHUB_DIR) return false;
          if (!keepExisting) return true;
          // Merge mode: skip entries whose destination already exists on disk
          const dest = path.join(cwd, ...parts.slice(1));
          return !fs.existsSync(dest);
        },
        map: (header) => {
          // Strip the leading tarball-root segment from every accepted entry
          const parts = header.path
            .replace(/\\/g, "/")
            .split("/")
            .filter(Boolean);
          header.path = parts.slice(1).join("/");
          return header;
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
