import type { Handle } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const handle = (async ({ event, resolve }) => {
  const cookie = event.cookies.get("AuthorizationToken");
  //console.log(cookie)
  if (cookie) {
    const token = cookie.split(" ")[1];

    try {
      const userInfo = jwt.verify(token, config.jwt_secret);

      //console.log(userInfo);
    
    // @ts-ignore
      const sessionUser = { email: userInfo.email, id: userInfo.id }
      event.locals.user = sessionUser;
    } catch (error) {
      console.error(error);
    }

    
  }

  return await resolve(event);
}) satisfies Handle;
