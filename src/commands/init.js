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
  B,
  D,
  dim,
  bold,
  box,
} = require("../ui");
const { prompt } = require("../prompt");
const { downloadAndExtract } = require("../scaffold");
const { fetchLatestSha, writeLocalSha } = require("../store");

async function init() {
  showBanner();

  const cwd = process.cwd();
  const targetPath = path.join(cwd, GITHUB_DIR);

  section("Preflight", bYellow);

  if (fs.existsSync(targetPath)) {
    warn(`${paint(bYellow, ".github/")} already exists in this directory.`);
    const answer = await prompt(
      `\n  ${paint(bYellow, "?")}  ${bold("Overwrite existing .github/?")} ${dim("(y/N)")}  `,
    );
    if (answer.trim().toLowerCase() !== "y") {
      console.log();
      fail("Aborted — no changes were made.");
      console.log();
      process.exit(0);
    }
    fs.rmSync(targetPath, { recursive: true, force: true });
    ok(`Removed existing ${paint(bCyan, ".github/")}`);
  } else {
    ok(`Target directory is ${paint(bGreen, "clean")}`);
  }

  info(`Destination: ${paint(bWhite, cwd)}`);
  info(`Source:      ${paint(bBlue, "ntdev204/copilot-kit@main")}`);

  section("Downloading", bBlue);
  const spinner = await downloadAndExtract(cwd, "Fetching tarball from GitHub");
  spinner.succeed("Download & extraction complete");

  // Record SHA asynchronously (best-effort)
  fetchLatestSha()
    .then((sha) => writeLocalSha(targetPath, sha))
    .catch(() => {});

  section("What was created", bGreen);

  const entries = [
    ["copilot-instructions.md", "Copilot picks this up automatically"],
    ["skills/", "40+ domain skill files"],
    ["rules/", "11 governance rule files"],
    ["prompts/", "8 reusable prompt templates"],
    ["agent/", "Agent mode definitions"],
    ["scripts/", "Automation & validation scripts"],
  ];

  for (const [file, desc] of entries) {
    const fileStr = paint(bCyan, `.github/${file}`).padEnd(52 + 9);
    console.log(`  ${paint(bGreen, "▸")} ${fileStr} ${dim(desc)}`);
  }

  console.log();
  console.log(
    box(
      [
        `${paint(bGreen, B + "  ✔  Scaffolded successfully!")}`,
        "",
        `  ${dim("Open VS Code — Copilot will load the config")}`,
        `  ${dim("instantly from")} ${paint(bCyan, ".github/copilot-instructions.md")}`,
      ],
      bGreen,
    ),
  );
  console.log();
}

module.exports = { init };
