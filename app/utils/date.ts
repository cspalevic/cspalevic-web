import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const parse = (date: string): dayjs.Dayjs => dayjs(date, "MM-DD-YYYY");

export const parseAndFormat = (date: string): string =>
  parse(date).format("MMMM D, YYYY");
