"use strict";

const { PKG_VERSION } = require("./constants");

// ─── ANSI palette ─────────────────────────────────────────────────────────────

const R = "\x1b[0m"; // reset
const B = "\x1b[1m"; // bold
const D = "\x1b[2m"; // dim

const bRed = "\x1b[91m";
const bGreen = "\x1b[92m";
const bYellow = "\x1b[93m";
const bBlue = "\x1b[94m";
const bMagenta = "\x1b[95m";
const bCyan = "\x1b[96m";
const bWhite = "\x1b[97m";

const bold = (t) => `${B}${t}${R}`;
const dim = (t) => `${D}${t}${R}`;
const paint = (col, t) => `${col}${t}${R}`;

// ─── Box / layout ─────────────────────────────────────────────────────────────

const W = 58;

function line(char = "─") {
  return char.repeat(W);
}

function box(lines, borderColor = bBlue) {
  const top = paint(borderColor, `╭${line()}╮`);
  const bottom = paint(borderColor, `╰${line()}╯`);
  const side = paint(borderColor, "│");
  const rows = lines.map((l) => {
    const visible = l.replace(/\x1b\[[0-9;]*m/g, "");
    const pad = Math.max(0, W - visible.length);
    return `${side} ${l}${" ".repeat(pad - 1)}${side}`;
  });
  return [top, ...rows, bottom].join("\n");
}

function section(title, color = bCyan) {
  console.log(`\n${paint(color, "▸")} ${bold(paint(color, title))}`);
  console.log(paint(D + color, "  " + line("─")));
}

// ─── Log helpers ──────────────────────────────────────────────────────────────

const ok = (msg) => console.log(`  ${paint(bGreen, "✔")}  ${msg}`);
const info = (msg) => console.log(`  ${paint(bCyan, "ℹ")}  ${msg}`);
const warn = (msg) => console.log(`  ${paint(bYellow, "⚠")}  ${msg}`);
const fail = (msg) => console.log(`  ${paint(bRed, "✖")}  ${msg}`);

// ─── Spinner ──────────────────────────────────────────────────────────────────

function createSpinner(msg) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;
  process.stdout.write("\n");
  const id = setInterval(() => {
    const frame = paint(bCyan, frames[i % frames.length]);
    process.stdout.write(
      `\r  ${frame}  ${paint(bCyan, msg)}${paint(D, " …")}  `,
    );
    i++;
  }, 80);
  return {
    succeed(text) {
      clearInterval(id);
      process.stdout.write(
        `\r  ${paint(bGreen, "✔")}  ${paint(bGreen, text)}            \n`,
      );
    },
    fail(text) {
      clearInterval(id);
      process.stdout.write(
        `\r  ${paint(bRed, "✖")}  ${paint(bRed, text)}               \n`,
      );
    },
  };
}

// ─── Banner ───────────────────────────────────────────────────────────────────

function showBanner() {
  console.log();
  console.log(
    box(
      [
        paint(
          bMagenta,
          B + "  ██████╗ ██████╗ ██████╗ ██╗██╗      ██████╗ ████████╗",
        ),
        paint(
          bBlue,
          B + " ██╔════╝██╔═══██╗██╔══██╗██║██║     ██╔═══██╗╚══██╔══╝",
        ),
        paint(
          bCyan,
          B + " ██║     ██║   ██║██████╔╝██║██║     ██║   ██║   ██║   ",
        ),
        paint(
          bBlue,
          B + " ██║     ██║   ██║██╔═══╝ ██║██║     ██║   ██║   ██║   ",
        ),
        paint(
          bMagenta,
          B + " ╚██████╗╚██████╔╝██║     ██║███████╗╚██████╔╝   ██║   ",
        ),
        paint(D, B + "  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝ ╚═════╝    ╚═╝  "),
        "",
        paint(bMagenta, B + "  ██╗  ██╗██╗████████╗") +
          paint(D, "  GitHub Copilot Scaffold"),
        paint(bBlue, B + "  ██║ ██╔╝██║╚══██╔══╝") +
          paint(D, "  Adaptive Governance"),
        paint(bCyan, B + "  █████╔╝ ██║   ██║   ") +
          paint(D, "  Framework  (AGF)"),
        paint(bBlue, B + "  ██╔═██╗ ██║   ██║   ") +
          paint(D, `  v${PKG_VERSION}  ·  ntdev204`),
        paint(bMagenta, B + "  ██║  ██╗██║   ██║   "),
        paint(D, B + "  ╚═╝  ╚═╝╚═╝   ╚═╝   "),
      ],
      bMagenta,
    ),
  );
  console.log();
}

module.exports = {
  // colors
  R,
  B,
  D,
  bRed,
  bGreen,
  bYellow,
  bBlue,
  bMagenta,
  bCyan,
  bWhite,
  // helpers
  bold,
  dim,
  paint,
  // ui
  W,
  line,
  box,
  section,
  ok,
  info,
  warn,
  fail,
  createSpinner,
  showBanner,
};
