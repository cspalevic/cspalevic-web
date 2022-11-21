import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { reportVitals } from "~/services/vercel.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json(
      {
        message: "Method not allowed",
      },
      405
    );
  }

  const params = await request.json();
  await reportVitals(params);

  return json({ success: true }, 200);
};
