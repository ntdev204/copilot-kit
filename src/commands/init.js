"use strict";

const fs = require("fs");
const path = require("path");

const { GITHUB_DIR } = require("../constants");
const {
  showBanner,
  section,
  ok,
  info,
  paint,
  bGreen,
  bYellow,
  bBlue,
  bCyan,
  bWhite,
  B,
  dim,
  box,
} = require("../ui");
const { downloadAndExtract } = require("../scaffold");

async function init() {
  showBanner();

  const cwd = process.cwd();
  const targetPath = path.join(cwd, GITHUB_DIR);

  section("Preflight", bYellow);

  const keepExisting = fs.existsSync(targetPath);
  if (keepExisting) {
    info(
      `${paint(bYellow, ".github/")} already exists — new files will be added, existing files kept.`,
    );
  } else {
    ok(`Target directory is ${paint(bGreen, "clean")}`);
  }

  info(`Destination: ${paint(bWhite, cwd)}`);
  info(`Source:      ${paint(bBlue, "ntdev204/copilot-kit@main")}`);

  section("Downloading", bBlue);
  const spinner = await downloadAndExtract(
    cwd,
    "Fetching tarball from GitHub",
    keepExisting,
  );
  spinner.succeed("Download & extraction complete");

  section(keepExisting ? "What was merged" : "What was created", bGreen);

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
        `${paint(bGreen, B + (keepExisting ? "  ✔  Merged successfully!" : "  ✔  Scaffolded successfully!"))}`,
        keepExisting
          ? `  ${dim("Existing files were preserved — only missing files added")}`
          : "",
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
