import { puppeteerLauncher } from "@web/test-runner-puppeteer";

const filteredLogs = ["Running in dev mode", "lit-html is in dev mode"];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: "dist/test/**/*.spec.js",

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ["browser", "development"],
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === "string" && filteredLogs.some((l) => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },

  /** Browsers to run tests on */
  browsers: [puppeteerLauncher()],

  // See documentation for all available options

  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: "coverage",
    include: ["**/src/*.*"],
    exclude: ["**/test/*.*", "node_modules/**/*.*"],
    threshold: {
      statements: 80,
      branches: 60,
      functions: 60,
      lines: 80,
    },
  },
});
