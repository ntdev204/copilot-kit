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
    // Extract everything into tmpDir with no strip/filter/onentry.
    // pax_global_header and other special entries are handled transparently
    // by node-tar when no strip option is set.
    await pipeline(res, zlib.createGunzip(), tar.x({ cwd: tmpDir }));

    // The tarball always extracts to a single root dir, e.g.
    // ntdev204-copilot-kit-<hash>/. Find it by listing tmpDir.
    const rootDir = fs
      .readdirSync(tmpDir, { withFileTypes: true })
      .find((e) => e.isDirectory())?.name;

    if (!rootDir) throw new Error("Tarball contained no root directory.");

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
