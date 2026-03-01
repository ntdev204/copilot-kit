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
const { readLocalSha, writeLocalSha, fetchLatestSha } = require("../store");

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

  const localSha = readLocalSha(targetPath);
  const shortSha = (s) => (s ? s.slice(0, 7) : paint(bRed, "unknown"));

  process.stdout.write(
    `  ${paint(bCyan, "ℹ")}  Fetching latest SHA from GitHub${paint(D, " …")}  `,
  );

  let remoteSha = null;
  try {
    remoteSha = await fetchLatestSha();
    process.stdout.write("\r  " + " ".repeat(50) + "\r");
  } catch {
    process.stdout.write("\r  " + " ".repeat(50) + "\r");
    warn("Could not reach GitHub API — cannot check for updates.");
    console.log();
    process.exit(1);
  }

  // Already up-to-date
  if (localSha && remoteSha === localSha) {
    ok(
      `Already up-to-date ${dim("·")} SHA ${paint(bGreen, shortSha(remoteSha))}`,
    );
    console.log();
    console.log(
      box(
        [
          `${paint(bGreen, B + "  ✔  .github/ is already the latest version")}`,
          "",
          `  ${dim("SHA")} ${paint(bCyan, remoteSha.slice(0, 7))}  ${dim("ntdev204/copilot-kit@main")}`,
        ],
        bGreen,
      ),
    );
    console.log();
    process.exit(0);
  }

  // New version available — show diff & ask
  info(`Current : ${paint(bYellow, shortSha(localSha))}`);
  info(
    `Latest  : ${paint(bGreen, shortSha(remoteSha))}  ${paint(bGreen, "← new version available")}`,
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
  writeLocalSha(targetPath, remoteSha);

  console.log();
  console.log(
    box(
      [
        `${paint(bGreen, B + "  ✔  .github/ updated successfully!")}`,
        "",
        `  ${dim("From")} ${paint(bYellow, shortSha(localSha))}  ${dim("→")}  ${paint(bGreen, shortSha(remoteSha))}`,
        `  ${dim("Source: ntdev204/copilot-kit@main")}`,
      ],
      bGreen,
    ),
  );
  console.log();
}

module.exports = { update };
