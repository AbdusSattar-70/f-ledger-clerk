// lib/utils/logger.ts
import fs from "fs";
import path from "path";

function parseStackLine(stackLine: string) {
  const regex = /at\s+(?:(\S+)\s+\()?(.+):(\d+):(\d+)\)?/;
  const match = stackLine.match(regex);
  if (!match) return null;

  const [, functionName = "<anonymous>", filePath, line, column] = match;
  return { functionName, filePath, line, column };
}

function getCallerInfo() {
  const err = new Error();
  if (!err.stack) return null;

  const stackLines = err.stack.split("\n");
  for (let i = 2; i < 6; i++) {
    const info = parseStackLine(stackLines[i] || "");
    if (info && !info.filePath.includes("logger.ts")) {
      return info;
    }
  }

  return null;
}

const LOG_FILE_PATH = path.resolve(process.cwd(), "logger/dev-errors.log");

function writeToLogFile(message: string) {
  fs.appendFileSync(LOG_FILE_PATH, message + "\n", { encoding: "utf8" });
}

export const loggerServer = {
  error: (error: unknown) => {
    if (process.env.NODE_ENV === "development") {
      const timestamp = new Date().toISOString();
      const caller = getCallerInfo();
      const stack = error instanceof Error ? error.stack : "No stack trace";
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      const logHeader = caller
        ? `[${timestamp}] [ERROR] [${caller.functionName} @ ${caller.filePath}:${caller.line}:${caller.column}]`
        : `[${timestamp}] [ERROR]`;

      const fullLog = `${logHeader}\n${errorMessage}\n${stack}\n`;

      // Log to console
      console.error(fullLog);

      writeToLogFile(fullLog);
    }
  },
};
