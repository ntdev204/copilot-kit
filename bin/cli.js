#!/usr/bin/env node
"use strict";

const { init }      = require("../src/commands/init");
const { update }    = require("../src/commands/update");
const { status }    = require("../src/commands/status");
const { showHelp }  = require("../src/commands/help");
const { fail }      = require("../src/ui");

const [, , cmd] = process.argv;
const commands  = { init, update, status };

if (cmd && commands[cmd]) {
  commands[cmd]().catch((err) => {
    fail(`Unexpected error: ${err.message}`);
    console.log();
    process.exit(1);
  });
} else {
  const isUnknown = Boolean(cmd);
  showHelp(isUnknown ? cmd : null);
  process.exit(isUnknown ? 1 : 0);
}
