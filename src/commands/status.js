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
  bMagenta,
  bCyan,
  bWhite,
  bRed,
  B,
  D,
  dim,
  box,
} = require("../ui");
const { fetchLatestVersion } = require("../store");
const { PKG_VERSION } = require("../constants");

async function status() {
  showBanner();

  const cwd = process.cwd();
  const targetPath = path.join(cwd, GITHUB_DIR);

  // ── Installation ───────────────────────────────────────────────────────────
  section("Installation", bCyan);

  if (!fs.existsSync(targetPath)) {
    fail(
      `${paint(bCyan, ".github/")} is ${paint(bRed, "not installed")} in this directory.`,
    );
    info(`Run ${paint(bGreen, "init")} to scaffold it.`);
    console.log();
    process.exit(1);
  }

  ok(`${paint(bCyan, ".github/")} found at ${paint(bWhite, targetPath)}`);

  // ── Components ─────────────────────────────────────────────────────────────
  const expected = [
    ["copilot-instructions.md", "file"],
    ["skills", "dir"],
    ["rules", "dir"],
    ["prompts", "dir"],
    ["agent", "dir"],
    ["scripts", "dir"],
  ];

  section("Components", bBlue);
  let missing = 0;
  for (const [name, kind] of expected) {
    const p = path.join(targetPath, name);
    const exists = fs.existsSync(p);
    const label = paint(bCyan, `.github/${name}`);
    if (exists) {
      let extra = "";
      if (kind === "dir") {
        try {
          extra = dim(` (${fs.readdirSync(p).length} items)`);
        } catch {}
      }
      ok(`${label}${extra}`);
    } else {
      fail(`${label}  ${paint(bRed, "missing")}`);
      missing++;
    }
  }

  // ── Version ────────────────────────────────────────────────────────────────
  section("Version", bMagenta);

  const localVersion = PKG_VERSION.replace(/^v/, "");
  info(`Installed  : ${paint(bYellow, "v" + localVersion)}`);

  process.stdout.write(
    `  ${paint(bCyan, "\u2139")}  Fetching latest version${paint(D, " \u2026")}  `,
  );
  let remoteVersion = null;
  try {
    remoteVersion = await fetchLatestVersion();
    process.stdout.write("\r  " + " ".repeat(40) + "\r");
    info(`Latest     : ${paint(bGreen, "v" + remoteVersion)}`);
  } catch {
    process.stdout.write("\r  " + " ".repeat(40) + "\r");
    warn(`Latest     : ${paint(bYellow, "unreachable")}`);
  }

  // ── Verdict ────────────────────────────────────────────────────────────────
  console.log();
  if (missing > 0) {
    console.log(
      box(
        [
          `${paint(bRed, B + `  ✖  ${missing} component(s) missing`)}`,
          "",
          `  ${dim("Run")} ${paint(bGreen, "update")} ${dim("to restore missing components.")}`,
        ],
        bRed,
      ),
    );
  } else if (remoteVersion && localVersion !== remoteVersion) {
    console.log(
      box(
        [
          `${paint(bYellow, B + "  ⚠  Update available")}`,
          "",
          `  ${dim("Run")} ${paint(bGreen, "update")} ${dim("to get the latest version.")}`,
        ],
        bYellow,
      ),
    );
  } else {
    console.log(
      box(
        [
          `${paint(bGreen, B + "  ✔  Everything looks good")}`,
          "",
          `  ${dim("All components installed · up-to-date")}`,
        ],
        bGreen,
      ),
    );
  }
  console.log();
}

module.exports = { status };
