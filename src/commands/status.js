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
const { readLocalSha, fetchLatestSha } = require("../store");

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

  const localSha = readLocalSha(targetPath);
  info(
    `Local SHA  : ${localSha ? paint(bYellow, localSha.slice(0, 7)) : paint(bRed, "unknown")}`,
  );

  process.stdout.write(
    `  ${paint(bCyan, "ℹ")}  Fetching remote SHA${paint(D, " …")}  `,
  );
  let remoteSha = null;
  try {
    remoteSha = await fetchLatestSha();
    process.stdout.write("\r  " + " ".repeat(40) + "\r");
    info(`Remote SHA : ${paint(bGreen, remoteSha.slice(0, 7))}`);
  } catch {
    process.stdout.write("\r  " + " ".repeat(40) + "\r");
    warn(`Remote SHA : ${paint(bYellow, "unreachable")}`);
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
  } else if (remoteSha && localSha && remoteSha !== localSha) {
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
