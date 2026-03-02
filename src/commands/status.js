"use strict";

const {
  showBanner,
  section,
  ok,
  info,
  warn,
  paint,
  bGreen,
  bYellow,
  bMagenta,
  bCyan,
  B,
  D,
  dim,
  box,
} = require("../ui");
const { fetchLatestVersion } = require("../store");
const { PKG_VERSION } = require("../constants");

async function status() {
  showBanner();

  const localVersion = PKG_VERSION.replace(/^v/, "");

  section("Version", bMagenta);
  info(`Installed  : ${paint(bYellow, "v" + localVersion)}`);

  process.stdout.write(
    `  ${paint(bCyan, "ℹ")}  Checking for updates${paint(D, " …")}  `,
  );

  let remoteVersion = null;
  try {
    remoteVersion = await fetchLatestVersion();
    process.stdout.write("\r  " + " ".repeat(44) + "\r");
    info(`Latest     : ${paint(bGreen, "v" + remoteVersion)}`);
  } catch {
    process.stdout.write("\r  " + " ".repeat(44) + "\r");
    warn(`Latest     : ${paint(bYellow, "unreachable")}`);
  }

  console.log();

  if (remoteVersion && localVersion !== remoteVersion) {
    console.log(
      box(
        [
          `${paint(bYellow, B + "  ⚠  Update available!")}`,
          "",
          `  ${dim("A new version")} ${paint(bGreen, "v" + remoteVersion)} ${dim("is available.")}`,
          `  ${dim("Run")} ${paint(bGreen, "npx @ntdev204/copilot-kit update")} ${dim("to upgrade.")}`,
        ],
        bYellow,
      ),
    );
  } else if (remoteVersion) {
    console.log(
      box(
        [
          `${paint(bGreen, B + "  ✔  You are up-to-date")}`,
          "",
          `  ${dim("Version")} ${paint(bGreen, "v" + localVersion)} ${dim("is the latest.")}`,
        ],
        bGreen,
      ),
    );
  }

  console.log();
}

module.exports = { status };
