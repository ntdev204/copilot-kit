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
  console.log(
    `  ${paint(bWhite, "copilot-kit")} ${paint(bCyan, "<command>")}  ${dim("(after global install)")}`,
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
    `  ${paint(bMagenta, pad("status"))}  ${dim("│")}  Show current version & check for updates`,
  );

  section("Flags", bCyan);
  const FW = 10;
  const fpad = (s) => s + " ".repeat(Math.max(0, FW - s.length));
  console.log(
    `  ${paint(bCyan, fpad("--version"))}  ${dim("│")}  Print the installed version and exit`,
  );
  console.log(
    `  ${paint(bCyan, fpad("-v"))}  ${dim("│")}  Alias for --version`,
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
  console.log(
    `  ${dim("$")} ${paint(bWhite, "copilot-kit")} ${paint(bCyan, "--version")}`,
  );
  console.log();
}

module.exports = { showHelp };
