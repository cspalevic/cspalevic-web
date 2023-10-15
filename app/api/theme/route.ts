import { toggleTheme } from "@/lib/theme";

export async function POST() {
  const theme = toggleTheme();
  return new Response(JSON.stringify({ theme }));
}
