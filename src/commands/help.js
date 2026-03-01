"use strict";

const {
  showBanner,
  section,
  ok,
  info,
  fail,
  paint,
  bGreen,
  bYellow,
  bMagenta,
  bCyan,
  bWhite,
  D,
  dim,
  bold,
} = require("../ui");

function showHelp(unknownCmd) {
  showBanner();

  if (unknownCmd) {
    fail(`Unknown command: ${paint(bYellow, unknownCmd)}`);
    console.log();
  }

  section("Usage", bCyan);
  console.log(
    `  ${paint(bWhite, "npx")} ${paint(bMagenta, "@ntdev204/copilot-kit")} ${paint(bCyan, "<command>")}`,
  );

  section("Commands", bCyan);
  const CW = 8;
  const pad = (s) => s + " ".repeat(Math.max(0, CW - s.length));
  console.log(
    `  ${paint(bGreen, pad("init"))}  ${dim("│")}  Download & scaffold ${paint(bCyan, ".github/")} into your project`,
  );
  console.log(
    `  ${paint(bYellow, pad("update"))}  ${dim("│")}  Check for updates & upgrade ${paint(bCyan, ".github/")} if needed`,
  );
  console.log(
    `  ${paint(bMagenta, pad("status"))}  ${dim("│")}  Show installation health & version info`,
  );

  section("Examples", bYellow);
  console.log(
    `  ${dim("$")} ${paint(bWhite, "npx @ntdev204/copilot-kit")} ${paint(bGreen, "init")}`,
  );
  console.log(
    `  ${dim("$")} ${paint(bWhite, "npx @ntdev204/copilot-kit")} ${paint(bYellow, "update")}`,
  );
  console.log(
    `  ${dim("$")} ${paint(bWhite, "npx @ntdev204/copilot-kit")} ${paint(bMagenta, "status")}`,
  );
  console.log();
}

module.exports = { showHelp };
