"use strict";

const { RELEASES_URL } = require("./constants");
const { fetchJSON } = require("./net");

async function fetchLatestVersion() {
  const data = await fetchJSON(RELEASES_URL);
  // Returns the semver tag, e.g. "v1.2.2" — strip leading "v" for comparison
  return data.tag_name.replace(/^v/, "");
}

module.exports = { fetchLatestVersion };
