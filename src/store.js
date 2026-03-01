"use strict";

const fs = require("fs");
const path = require("path");

const { SHA_FILE, COMMITS_URL } = require("./constants");
const { fetchJSON } = require("./net");

function readLocalSha(githubDir) {
  try {
    return fs.readFileSync(path.join(githubDir, SHA_FILE), "utf8").trim();
  } catch {
    return null;
  }
}

function writeLocalSha(githubDir, sha) {
  try {
    fs.writeFileSync(path.join(githubDir, SHA_FILE), sha + "\n");
  } catch {}
}

async function fetchLatestSha() {
  const data = await fetchJSON(COMMITS_URL);
  return data.sha;
}

module.exports = { readLocalSha, writeLocalSha, fetchLatestSha };
