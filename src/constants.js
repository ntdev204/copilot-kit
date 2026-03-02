"use strict";

const path = require("path");

const TARBALL_URL =
  "https://api.github.com/repos/ntdev204/copilot-kit/tarball/main";
const RELEASES_URL =
  "https://api.github.com/repos/ntdev204/copilot-kit/releases/latest";
const GITHUB_DIR = ".github";
const PKG_VERSION = require(path.join(__dirname, "..", "package.json")).version;

module.exports = {
  TARBALL_URL,
  RELEASES_URL,
  GITHUB_DIR,
  PKG_VERSION,
};
