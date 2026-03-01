"use strict";

const path = require("path");

const TARBALL_URL =
  "https://api.github.com/repos/ntdev204/copilot-kit/tarball/main";
const COMMITS_URL =
  "https://api.github.com/repos/ntdev204/copilot-kit/commits/main";
const GITHUB_DIR = ".github";
const SHA_FILE = ".copilot-kit-sha";
const PKG_VERSION = require(path.join(__dirname, "..", "package.json")).version;

module.exports = {
  TARBALL_URL,
  COMMITS_URL,
  GITHUB_DIR,
  SHA_FILE,
  PKG_VERSION,
};
