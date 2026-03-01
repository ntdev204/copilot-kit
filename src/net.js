"use strict";

const https = require("https");

/** Follow redirects (up to 5) and resolve with the final IncomingMessage. */
function fetchTarball(url, depth = 0) {
  if (depth > 5) return Promise.reject(new Error("Too many redirects"));
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "copilot-kit/1.0" } }, (res) => {
        const { statusCode, headers } = res;
        if (statusCode >= 300 && statusCode < 400 && headers.location) {
          res.resume();
          fetchTarball(headers.location, depth + 1).then(resolve, reject);
          return;
        }
        if (statusCode !== 200) {
          res.resume();
          reject(new Error(`Server returned HTTP ${statusCode}`));
          return;
        }
        resolve(res);
      })
      .on("error", reject);
  });
}

/** Fetch and parse JSON from a URL (follows redirects). */
function fetchJSON(url, depth = 0) {
  if (depth > 5) return Promise.reject(new Error("Too many redirects"));
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "copilot-kit/1.0" } }, (res) => {
        const { statusCode, headers } = res;
        if (statusCode >= 300 && statusCode < 400 && headers.location) {
          res.resume();
          fetchJSON(headers.location, depth + 1).then(resolve, reject);
          return;
        }
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          if (statusCode !== 200) {
            reject(new Error(`HTTP ${statusCode}: ${body.slice(0, 120)}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

module.exports = { fetchTarball, fetchJSON };
