import pkg from "../../package.json";

/** Current CLI package version, read from web/package.json at build time. */
export const VERSION: string = pkg.version;
