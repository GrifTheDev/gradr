import type { Handle } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const handle = (async ({ event, resolve }) => {
  const cookie = event.cookies.get("AuthorizationToken");
  if (cookie) {
    const token = cookie.split(" ")[1];

    try {
      const userInfo = jwt.verify(token, config.jwt_secret);
    
      // @ts-ignore I tried extending the jwtpaylod type, didn't work 🤷‍♂️
      const sessionUser = { email: userInfo.email, username: userInfo.username, id: userInfo.id }
      event.locals.user = sessionUser;
    } catch (error) {
      console.error(error);
    }
  }
  return await resolve(event);
}) satisfies Handle;
