import { createLogger, format, transports } from "winston";
const { combine, prettyPrint, simple } = format;

const logger = createLogger({
  level: "info",
  format: combine(prettyPrint(), simple()),
  transports: [
    new transports.Console({
      format: simple(),
    }),
  ],
});

export default logger;
