"use strict";

const fs = require("fs");
const path = require("path");

const { GITHUB_DIR } = require("../constants");
const {
  showBanner,
  section,
  ok,
  info,
  warn,
  fail,
  paint,
  bGreen,
  bYellow,
  bBlue,
  bCyan,
  bWhite,
  bRed,
  B,
  D,
  dim,
  bold,
  box,
} = require("../ui");
const { prompt } = require("../prompt");
const { downloadAndExtract } = require("../scaffold");
const { fetchLatestVersion } = require("../store");
const { PKG_VERSION } = require("../constants");

async function update() {
  showBanner();

  const cwd = process.cwd();
  const targetPath = path.join(cwd, GITHUB_DIR);

  section("Preflight", bYellow);

  if (!fs.existsSync(targetPath)) {
    fail(
      `${paint(bCyan, ".github/")} not found — run ${paint(bGreen, "init")} first.`,
    );
    console.log();
    process.exit(1);
  }

  // ── Version check ──────────────────────────────────────────────────────────
  section("Checking version", bYellow);

  const localVersion = PKG_VERSION.replace(/^v/, "");
  const fmtVer = (v) => v || paint(bRed, "unknown");

  process.stdout.write(
    `  ${paint(bCyan, "ℹ")}  Fetching latest version from GitHub${paint(D, " …")}  `,
  );

  let remoteVersion = null;
  try {
    remoteVersion = await fetchLatestVersion();
    process.stdout.write("\r  " + " ".repeat(50) + "\r");
  } catch {
    process.stdout.write("\r  " + " ".repeat(50) + "\r");
    warn("Could not reach GitHub API — cannot check for updates.");
    console.log();
    process.exit(1);
  }

  // Already up-to-date
  if (localVersion === remoteVersion) {
    ok(`Already up-to-date ${dim("·")} ${paint(bGreen, "v" + remoteVersion)}`);
    console.log();
    console.log(
      box(
        [
          `${paint(bGreen, B + "  ✔  .github/ is already the latest version")}`,
          "",
          `  ${dim("Version")} ${paint(bCyan, "v" + remoteVersion)}  ${dim("ntdev204/copilot-kit")}`,
        ],
        bGreen,
      ),
    );
    console.log();
    process.exit(0);
  }

  // New version available — show diff & ask
  info(`Current : ${paint(bYellow, fmtVer("v" + localVersion))}`);
  info(
    `Latest  : ${paint(bGreen, fmtVer("v" + remoteVersion))}  ${paint(bGreen, "← new version available")}`,
  );

  const answer = await prompt(
    `\n  ${paint(bYellow, "?")}  ${bold("Update .github/ to the latest version?")} ${dim("(y/N)")}  `,
  );
  if (answer.trim().toLowerCase() !== "y") {
    console.log();
    fail("Aborted — no changes were made.");
    console.log();
    process.exit(0);
  }

  // ── Download & extract ─────────────────────────────────────────────────────
  console.log();
  fs.rmSync(targetPath, { recursive: true, force: true });
  ok(`Cleared old ${paint(bCyan, ".github/")}`);
  info(`Destination: ${paint(bWhite, cwd)}`);

  section("Downloading", bBlue);
  const spinner = await downloadAndExtract(
    cwd,
    "Fetching latest tarball from GitHub",
  );
  spinner.succeed("Download & extraction complete");

  console.log();
  console.log(
    box(
      [
        `${paint(bGreen, B + "  \u2714  .github/ updated successfully!")}`,
        "",
        `  ${dim("From")} ${paint(bYellow, "v" + localVersion)}  ${dim("\u2192")}  ${paint(bGreen, "v" + remoteVersion)}`,
        `  ${dim("Source: ntdev204/copilot-kit")}`,
      ],
      bGreen,
    ),
  );
  console.log();
}

module.exports = { update };
