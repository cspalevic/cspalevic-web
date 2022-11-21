import type { Session } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession } = createCookieSessionStorage({
  cookie: {
    name: "__theme",
    sameSite: "lax",
  },
});

class ThemeController {
  private THEME_KEY: string = "theme";
  private DEFAULT_THEME: Theme = "light";
  private _session: Session;

  constructor(session: Session) {
    this._session = session;
    if (!this._session.has(this.THEME_KEY)) {
      this._session.set(this.THEME_KEY, this.DEFAULT_THEME);
    }
  }

  static async getSession(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const session = await getSession(cookieHeader);
    return new ThemeController(session);
  }

  getTheme(): Theme {
    return this._session.get(this.THEME_KEY);
  }

  toggleTheme() {
    const theme = this.getTheme();
    const oppositeTheme = theme === "light" ? "dark" : "light";
    this._session.set(this.THEME_KEY, oppositeTheme);
  }

  async save(): Promise<ResponseInit> {
    const setCookieHeader = await commitSession(this._session);
    return {
      headers: {
        "Set-Cookie": setCookieHeader,
      },
    };
  }
}

export default ThemeController;
