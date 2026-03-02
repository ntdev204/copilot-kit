"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const zlib = require("zlib");
const tar = require("tar");
const { pipeline } = require("stream/promises");

const { TARBALL_URL, GITHUB_DIR } = require("./constants");
const { fetchTarball } = require("./net");
const { createSpinner } = require("./ui");

/**
 * Recursively copy src → dst.
 * In merge mode (keepExisting=true): recurse into directories but skip
 * individual files that already exist on disk.
 */
function copyMerge(src, dst, keepExisting) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyMerge(srcPath, dstPath, keepExisting);
    } else {
      if (keepExisting && fs.existsSync(dstPath)) continue;
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

/**
 * Download the tarball from GitHub, extract it to a temp directory, then
 * copy only the .github/ subtree into `cwd` (with optional merge semantics).
 * Returns the spinner so the caller can call .succeed() / .fail().
 *
 * @param {string}  cwd          - Directory to install into
 * @param {string}  msg          - Spinner message
 * @param {boolean} keepExisting - Merge mode: skip files already on disk
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

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "copilot-kit-"));
  try {
    // Extract the full tarball into tmpDir WITHOUT strip, then detect the
    // root directory name from the first real entry. This avoids the
    // "Invalid count value: -1" crash that occurs when node-tar strip:1
    // encounters pax_global_header or other depth-0 special entries.
    let rootDir = "";
    await pipeline(
      res,
      zlib.createGunzip(),
      tar.x({
        cwd: tmpDir,
        onentry(entry) {
          if (!rootDir) {
            const first = entry.path.split("/").filter(Boolean)[0];
            if (first) rootDir = first;
          }
        },
      }),
    );

    const srcGithub = path.join(tmpDir, rootDir, GITHUB_DIR);
    const dstGithub = path.join(cwd, GITHUB_DIR);
    copyMerge(srcGithub, dstGithub, keepExisting);
  } catch (err) {
    spinner.fail(`Extraction failed: ${err.message}`);
    console.log();
    process.exit(1);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  return spinner;
}

module.exports = { downloadAndExtract };
